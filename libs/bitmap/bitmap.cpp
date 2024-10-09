#include "pxt.h"

typedef RefImage *Bitmap_;

#define IMAGE_BITS 4

#if IMAGE_BITS == 1
// OK
#elif IMAGE_BITS == 4
// OK
#else
#error "Invalid IMAGE_BITS"
#endif

#define XX(v) (int)(((int16_t)(v)))
#define YY(v) (int)(((int16_t)(((int32_t)(v)) >> 16)))

namespace pxt {

PXT_VTABLE(RefImage, ValType::Object)

void RefImage::destroy(RefImage *t) {}

void RefImage::print(RefImage *t) {
    DMESG("RefImage %p size=%d x %d", t, t->width(), t->height());
}

int RefImage::wordHeight() {
    if (bpp() == 1)
        oops(20);
    return ((height() * 4 + 31) >> 5);
}

void RefImage::makeWritable() {
    ++revision;
    if (buffer->isReadOnly()) {
        buffer = mkBuffer(data(), length());
    }
}

uint8_t RefImage::fillMask(color c) {
    return this->bpp() == 1 ? (c & 1) * 0xff : 0x11 * (c & 0xf);
}

bool RefImage::inRange(int x, int y) {
    return 0 <= x && x < width() && 0 <= y && y < height();
}

void RefImage::clamp(int *x, int *y) {
    *x = min(max(*x, 0), width() - 1);
    *y = min(max(*y, 0), height() - 1);
}

RefImage::RefImage(BoxedBuffer *buf) : PXT_VTABLE_INIT(RefImage), buffer(buf) {
    revision = 0;
    if (!buf)
        oops(21);
}

static inline int byteSize(int w, int h, int bpp) {
    if (bpp == 1)
        return sizeof(ImageHeader) + ((h + 7) >> 3) * w;
    else
        return sizeof(ImageHeader) + (((h * 4 + 31) / 32) * 4) * w;
}

Bitmap_ allocImage(const uint8_t *data, uint32_t sz) {
    auto buf = mkBuffer(data, sz);
    registerGCObj(buf);
    Bitmap_ r = NEW_GC(RefImage, buf);
    unregisterGCObj(buf);
    return r;
}

Bitmap_ mkImage(int width, int height, int bpp) {
    if (width < 0 || height < 0 || width > 2000 || height > 2000)
        return NULL;
    if (bpp != 1 && bpp != 4)
        return NULL;
    uint32_t sz = byteSize(width, height, bpp);
    Bitmap_ r = allocImage(NULL, sz);
    auto hd = r->header();
    hd->magic = IMAGE_HEADER_MAGIC;
    hd->bpp = bpp;
    hd->width = width;
    hd->height = height;
    hd->padding = 0;
    MEMDBG("mkImage: %d X %d => %p", width, height, r);
    return r;
}

bool isValidImage(Buffer buf) {
    if (!buf || buf->length < 9)
        return false;

    auto hd = (ImageHeader *)(buf->data);
    if (hd->magic != IMAGE_HEADER_MAGIC || (hd->bpp != 1 && hd->bpp != 4))
        return false;

    int sz = byteSize(hd->width, hd->height, hd->bpp);
    if (sz != (int)buf->length)
        return false;

    return true;
}

bool isLegacyImage(Buffer buf) {
    if (!buf || buf->length < 5)
        return false;

    if (buf->data[0] != 0xe1 && buf->data[0] != 0xe4)
        return false;

    int sz = byteSize(buf->data[1], buf->data[2], buf->data[0] & 0xf) - 4;
    if (sz != (int)buf->length)
        return false;

    return true;
}

} // namespace pxt

namespace BitmapMethods {

/**
 * Get underlying buffer
 */
//% property
Buffer __buffer(Bitmap_ img) {
    // only for simulator
    return NULL;
}

/**
 * Get the width of the bitmap
 */
//% property
int width(Bitmap_ img) {
    return img->width();
}

/**
 * Get the height of the bitmap
 */
//% property
int height(Bitmap_ img) {
    return img->height();
}

/**
 * True if the bitmap is monochromatic (black and white)
 */
//% property
bool isMono(Bitmap_ img) {
    return img->bpp() == 1;
}

//% property
bool isStatic(Bitmap_ img) {
    return img->buffer->isReadOnly();
}

//% property
bool revision(Bitmap_ img) {
    return img->revision;
}

/**
 * Sets all pixels in the current bitmap from the other bitmap, which has to be of the same size and
 * bpp.
 */
//%
void copyFrom(Bitmap_ img, Bitmap_ from) {
    if (img->width() != from->width() || img->height() != from->height() ||
        img->bpp() != from->bpp())
        return;
    img->makeWritable();
    memcpy(img->pix(), from->pix(), from->pixLength());
}

static void setCore(Bitmap_ img, int x, int y, int c) {
    auto ptr = img->pix(x, y);
    if (img->bpp() == 4) {
        if (y & 1)
            *ptr = (*ptr & 0x0f) | (c << 4);
        else
            *ptr = (*ptr & 0xf0) | (c & 0xf);
    } else if (img->bpp() == 1) {
        uint8_t mask = 0x01 << (y & 7);
        if (c)
            *ptr |= mask;
        else
            *ptr &= ~mask;
    }
}

static int getCore(Bitmap_ img, int x, int y) {
    auto ptr = img->pix(x, y);
    if (img->bpp() == 4) {
        if (y & 1)
            return *ptr >> 4;
        else
            return *ptr & 0x0f;
    } else if (img->bpp() == 1) {
        uint8_t mask = 0x01 << (y & 7);
        return (*ptr & mask) ? 1 : 0;
    }
    return 0;
}

/**
 * Set pixel color
 */
//%
void setPixel(Bitmap_ img, int x, int y, int c) {
    if (!img->inRange(x, y))
        return;
    img->makeWritable();
    setCore(img, x, y, c);
}

/**
 * Get a pixel color
 */
//%
int getPixel(Bitmap_ img, int x, int y) {
    if (!img->inRange(x, y))
        return 0;
    return getCore(img, x, y);
}

void fillRect(Bitmap_ img, int x, int y, int w, int h, int c);

/**
 * Fill entire bitmap with a given color
 */
//%
void fill(Bitmap_ img, int c) {
    if (c && img->hasPadding()) {
        fillRect(img, 0, 0, img->width(), img->height(), c);
        return;
    }
    img->makeWritable();
    memset(img->pix(), img->fillMask(c), img->pixLength());
}

/**
 * Copy row(s) of pixel from bitmap to buffer (8 bit per pixel).
 */
//%
void getRows(Bitmap_ img, int x, Buffer dst) {
    if (img->bpp() != 4)
        return;

    int w = img->width();
    int h = img->height();
    if (x >= w || x < 0)
        return;

    uint8_t *sp = img->pix(x, 0);
    uint8_t *dp = dst->data;
    int n = min(dst->length, (w - x) * h) >> 1;

    while (n--) {
        *dp++ = *sp & 0xf;
        *dp++ = *sp >> 4;
        sp++;
    }
}

/**
 * Copy row(s) of pixel from buffer to bitmap.
 */
//%
void setRows(Bitmap_ img, int x, Buffer src) {
    if (img->bpp() != 4)
        return;

    int w = img->width();
    int h = img->height();
    if (x >= w || x < 0)
        return;

    img->makeWritable();

    uint8_t *dp = img->pix(x, 0);
    uint8_t *sp = src->data;
    int n = min(src->length, (w - x) * h) >> 1;

    while (n--) {
        *dp++ = (sp[0] & 0xf) | (sp[1] << 4);
        sp += 2;
    }
}

void fillRect(Bitmap_ img, int x, int y, int w, int h, int c) {
    if (w == 0 || h == 0 || x >= img->width() || y >= img->height())
        return;

    int x2 = x + w - 1;
    int y2 = y + h - 1;

    if (x2 < 0 || y2 < 0)
        return;

    img->clamp(&x2, &y2);
    img->clamp(&x, &y);
    w = x2 - x + 1;
    h = y2 - y + 1;

    if (!img->hasPadding() && x == 0 && y == 0 && w == img->width() && h == img->height()) {
        fill(img, c);
        return;
    }

    img->makeWritable();

    auto bh = img->byteHeight();
    uint8_t f = img->fillMask(c);

    uint8_t *p = img->pix(x, y);
    while (w-- > 0) {
        if (img->bpp() == 1) {
            auto ptr = p;
            unsigned mask = 0x01 << (y & 7);

            for (int i = 0; i < h; ++i) {
                if (mask == 0x100) {
                    if (h - i >= 8) {
                        *++ptr = f;
                        i += 7;
                        continue;
                    } else {
                        mask = 0x01;
                        ++ptr;
                    }
                }
                if (c)
                    *ptr |= mask;
                else
                    *ptr &= ~mask;
                mask <<= 1;
            }

        } else if (img->bpp() == 4) {
            auto ptr = p;
            unsigned mask = 0x0f;
            if (y & 1)
                mask <<= 4;

            for (int i = 0; i < h; ++i) {
                if (mask == 0xf00) {
                    if (h - i >= 2) {
                        *++ptr = f;
                        i++;
                        continue;
                    } else {
                        mask = 0x0f;
                        ptr++;
                    }
                }
                *ptr = (*ptr & ~mask) | (f & mask);
                mask <<= 4;
            }
        }
        p += bh;
    }
}

//%
void _fillRect(Bitmap_ img, int xy, int wh, int c) {
    fillRect(img, XX(xy), YY(xy), XX(wh), YY(wh), c);
}

void mapRect(Bitmap_ img, int x, int y, int w, int h, Buffer map) {
    if (w == 0 || h == 0 || x >= img->width() || y >= img->height())
        return;

    if (img->bpp() != 4 || map->length < 16)
        return;

    int x2 = x + w - 1;
    int y2 = y + h - 1;

    if (x2 < 0 || y2 < 0)
        return;

    img->clamp(&x2, &y2);
    img->clamp(&x, &y);
    w = x2 - x + 1;
    h = y2 - y + 1;

    img->makeWritable();

    auto bh = img->byteHeight();
    auto m = map->data;
    uint8_t *p = img->pix(x, y);
    while (w-- > 0) {
        auto ptr = p;
        unsigned shift = y & 1;
        for (int i = 0; i < h; i++) {
            if (shift) {
                *ptr = (m[*ptr >> 4] << 4) | (*ptr & 0x0f);
                ptr++;
                shift = 0;
            } else {
                *ptr = (m[*ptr & 0xf] & 0xf) | (*ptr & 0xf0);
                shift = 1;
            }
        }
        p += bh;
    }
}

//%
void _mapRect(Bitmap_ img, int xy, int wh, Buffer c) {
    mapRect(img, XX(xy), YY(xy), XX(wh), YY(wh), c);
}

//% argsNullable
bool equals(Bitmap_ img, Bitmap_ other) {
    if (!other) {
        return false;
    }
    auto len = img->length();
    if (len != other->length()) {
        return false;
    }
    return 0 == memcmp(img->data(), other->data(), len);
}

/**
 * Return a copy of the current bitmap
 */
//%
Bitmap_ clone(Bitmap_ img) {
    auto r = allocImage(img->data(), img->length());
    MEMDBG("mkImageClone: %d X %d => %p", img->width(), img->height(), r);
    return r;
}

/**
 * Flips (mirrors) pixels horizontally in the current bitmap
 */
//%
void flipX(Bitmap_ img) {
    img->makeWritable();

    int bh = img->byteHeight();
    auto a = img->pix();
    auto b = img->pix(img->width() - 1, 0);

    uint8_t tmp[bh];

    while (a < b) {
        memcpy(tmp, a, bh);
        memcpy(a, b, bh);
        memcpy(b, tmp, bh);
        a += bh;
        b -= bh;
    }
}

/**
 * Flips (mirrors) pixels vertically in the current bitmap
 */
//%
void flipY(Bitmap_ img) {
    img->makeWritable();

    // this is quite slow - for small 16x16 sprite it will take in the order of 1ms
    // something faster requires quite a bit of bit tweaking, especially for mono bitmaps
    for (int i = 0; i < img->width(); ++i) {
        int a = 0;
        int b = img->height() - 1;
        while (a < b) {
            int tmp = getCore(img, i, a);
            setCore(img, i, a, getCore(img, i, b));
            setCore(img, i, b, tmp);
            a++;
            b--;
        }
    }
}

/**
 * Returns a transposed bitmap (with X/Y swapped)
 */
//%
Bitmap_ transposed(Bitmap_ img) {
    Bitmap_ r = mkImage(img->height(), img->width(), img->bpp());

    // this is quite slow
    for (int i = 0; i < img->width(); ++i) {
        for (int j = 0; j < img->height(); ++i) {
            setCore(r, j, i, getCore(img, i, j));
        }
    }

    return r;
}

void drawBitmap(Bitmap_ img, Bitmap_ from, int x, int y);

/**
 * Every pixel in bitmap is moved by (dx,dy)
 */
//%
void scroll(Bitmap_ img, int dx, int dy) {
    img->makeWritable();
    auto bh = img->byteHeight();
    auto w = img->width();
    if (dy != 0) {
        // TODO one day we may want a more memory-efficient implementation
        auto img2 = clone(img);
        fill(img, 0);
        drawBitmap(img, img2, dx, dy);
    } else if (dx < 0) {
        dx = -dx;
        if (dx < w)
            memmove(img->pix(), img->pix(dx, 0), (w - dx) * bh);
        else
            dx = w;
        memset(img->pix(w - dx, 0), 0, dx * bh);
    } else if (dx > 0) {
        if (dx < w)
            memmove(img->pix(dx, 0), img->pix(), (w - dx) * bh);
        else
            dx = w;
        memset(img->pix(), 0, dx * bh);
    }
}

const uint8_t bitdouble[] = {0x00, 0x03, 0x0c, 0x0f, 0x30, 0x33, 0x3c, 0x3f,
                             0xc0, 0xc3, 0xcc, 0xcf, 0xf0, 0xf3, 0xfc, 0xff};
const uint8_t nibdouble[] = {0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77,
                             0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff};

/**
 * Stretches the bitmap horizontally by 100%
 */
//%
Bitmap_ doubledX(Bitmap_ img) {
    if (img->width() > 126)
        return NULL;

    Bitmap_ r = mkImage(img->width() * 2, img->height(), img->bpp());
    auto src = img->pix();
    auto dst = r->pix();
    auto w = img->width();
    auto bh = img->byteHeight();

    for (int i = 0; i < w; ++i) {
        memcpy(dst, src, bh);
        dst += bh;
        memcpy(dst, src, bh);
        dst += bh;

        src += bh;
    }

    return r;
}

/**
 * Stretches the bitmap vertically by 100%
 */
//%
Bitmap_ doubledY(Bitmap_ img) {
    if (img->height() > 126)
        return NULL;

    Bitmap_ r = mkImage(img->width(), img->height() * 2, img->bpp());
    auto src0 = img->pix();
    auto dst = r->pix();

    auto w = img->width();
    auto sbh = img->byteHeight();
    auto bh = r->byteHeight();
    auto dbl = img->bpp() == 1 ? bitdouble : nibdouble;

    for (int i = 0; i < w; ++i) {
        auto src = src0 + i * sbh;
        for (int j = 0; j < bh; j += 2) {
            *dst++ = dbl[*src & 0xf];
            if (j != bh - 1)
                *dst++ = dbl[*src >> 4];
            src++;
        }
    }

    return r;
}

/**
 * Replaces one color in an bitmap with another
 */
//%
void replace(Bitmap_ img, int from, int to) {
    if (img->bpp() != 4)
        return;
    to &= 0xf;
    if (from == to)
        return;

    img->makeWritable();

    // avoid bleeding 'to' color into the overflow areas of the picture
    if (from == 0 && img->hasPadding()) {
        for (int i = 0; i < img->height(); ++i)
            for (int j = 0; j < img->width(); ++j)
                if (getCore(img, j, i) == from)
                    setCore(img, j, i, to);
        return;
    }

    auto ptr = img->pix();
    auto len = img->pixLength();
    while (len--) {
        auto b = *ptr;
        if ((b & 0xf) == from)
            b = (b & 0xf0) | to;
        if ((b >> 4) == from)
            b = (to << 4) | (b & 0xf);
        *ptr++ = b;
    }
}

/**
 * Stretches the bitmap in both directions by 100%
 */
//%
Bitmap_ doubled(Bitmap_ img) {
    Bitmap_ tmp = doubledX(img);
    registerGCObj(tmp);
    Bitmap_ r = doubledY(tmp);
    unregisterGCObj(tmp);
    return r;
}

bool drawBitmapCore(Bitmap_ img, Bitmap_ from, int x, int y, int color) {
    auto w = from->width();
    auto h = from->height();
    auto sh = img->height();
    auto sw = img->width();

    if (x + w <= 0)
        return false;
    if (x >= sw)
        return false;
    if (y + h <= 0)
        return false;
    if (y >= sh)
        return false;

    auto len = y < 0 ? min(sh, h + y) : min(sh - y, h);
    auto tbp = img->bpp();
    auto fbp = from->bpp();
    auto y0 = y;

    if (color == -2 && x == 0 && y == 0 && tbp == fbp && w == sw && h == sh) {
        copyFrom(img, from);
        return false;
    }

    // DMESG("drawIMG(%d,%d) at (%d,%d) w=%d bh=%d len=%d",
    //    w,h,x, y, img->width(), img->byteHeight(), len );

    auto fromH = from->byteHeight();
    auto imgH = img->byteHeight();
    auto fromBase = from->pix();
    auto imgBase = img->pix(0, y);

#define LOOPHD                                                                                     \
    for (int xx = 0; xx < w; ++xx, ++x)                                                            \
        if (0 <= x && x < sw)

    if (tbp == 4 && fbp == 4) {
        auto wordH = fromH >> 2;
        LOOPHD {
            y = y0;

            auto fdata = (uint32_t *)fromBase + wordH * xx;
            auto tdata = imgBase + imgH * x;

            // DMESG("%d,%d xx=%d/%d - %p (%p) -- %d",x,y,xx,w,tdata,img->pix(),
            //    (uint8_t*)fdata - from->pix());

            auto cnt = wordH;
            auto bot = min(sh, y + h);

#define COLS(s) ((v >> (s)) & 0xf)
#define COL(s) COLS(s)

#define STEPA(s)                                                                                   \
    if (COL(s) && 0 <= y && y < bot)                                                               \
        SETLOW(s);                                                                                 \
    y++;
#define STEPB(s)                                                                                   \
    if (COL(s) && 0 <= y && y < bot)                                                               \
        SETHIGH(s);                                                                                \
    y++;                                                                                           \
    tdata++;
#define STEPAQ(s)                                                                                  \
    if (COL(s))                                                                                    \
        SETLOW(s);
#define STEPBQ(s)                                                                                  \
    if (COL(s))                                                                                    \
        SETHIGH(s);                                                                                \
    tdata++;

// perf: expanded version 5% faster
#define ORDER(A, B)                                                                                \
    A(0);                                                                                          \
    B(4);                                                                                          \
    A(8);                                                                                          \
    B(12);                                                                                         \
    A(16);                                                                                         \
    B(20);                                                                                         \
    A(24);                                                                                         \
    B(28)
//#define ORDER(A,B) for (int k = 0; k < 32; k += 8) { A(k); B(4+k); }
#define LOOP(A, B, xbot)                                                                           \
    while (cnt--) {                                                                                \
        auto v = *fdata++;                                                                         \
        if (0 <= y && y <= xbot - 8) {                                                             \
            ORDER(A##Q, B##Q);                                                                     \
            y += 8;                                                                                \
        } else {                                                                                   \
            ORDER(A, B);                                                                           \
        }                                                                                          \
    }
#define LOOPS(xbot)                                                                                \
    if (y & 1)                                                                                     \
        LOOP(STEPB, STEPA, xbot)                                                                   \
    else                                                                                           \
        LOOP(STEPA, STEPB, xbot)

            if (color >= 0) {
#define SETHIGH(s) *tdata = (*tdata & 0x0f) | ((COLS(s)) << 4)
#define SETLOW(s) *tdata = (*tdata & 0xf0) | COLS(s)
                LOOPS(sh)
            } else if (color == -2) {
#undef COL
#define COL(s) 1
                LOOPS(bot)
            } else {
#undef COL
#define COL(s) COLS(s)
#undef SETHIGH
#define SETHIGH(s)                                                                                 \
    if (*tdata & 0xf0)                                                                             \
    return true
#undef SETLOW
#define SETLOW(s)                                                                                  \
    if (*tdata & 0x0f)                                                                             \
    return true
                LOOPS(sh)
            }
        }
    } else if (tbp == 1 && fbp == 1) {
        auto left = img->pix() - imgBase;
        auto right = img->pix(0, img->height() - 1) - imgBase;
        LOOPHD {
            y = y0;

            auto data = fromBase + fromH * xx;
            auto off = imgBase + imgH * x;
            auto off0 = off + left;
            auto off1 = off + right;

            int shift = (y & 7);

            int y1 = y + h + (y & 7);
            int prev = 0;

            while (y < y1 - 8) {
                int curr = *data++ << shift;
                if (off0 <= off && off <= off1) {
                    uint8_t v = (curr >> 0) | (prev >> 8);

                    if (color == -1) {
                        if (*off & v)
                            return true;
                    } else {
                        *off |= v;
                    }
                }
                off++;
                prev = curr;
                y += 8;
            }

            int left = y1 - y;
            if (left > 0) {
                int curr = *data << shift;
                if (off0 <= off && off <= off1) {
                    uint8_t v = ((curr >> 0) | (prev >> 8)) & (0xff >> (8 - left));
                    if (color == -1) {
                        if (*off & v)
                            return true;
                    } else {
                        *off |= v;
                    }
                }
            }
        }
    } else if (tbp == 4 && fbp == 1) {
        if (y < 0) {
            fromBase = from->pix(0, -y);
            imgBase = img->pix();
        }
        // icon mode
        LOOPHD {
            auto fdata = fromBase + fromH * xx;
            auto tdata = imgBase + imgH * x;

            unsigned mask = 0x01;
            auto v = *fdata++;
            int off = (y & 1) ? 1 : 0;
            if (y < 0) {
                mask <<= -y & 7;
                off = 0;
            }
            for (int i = off; i < len + off; ++i) {
                if (mask == 0x100) {
                    mask = 0x01;
                    v = *fdata++;
                }
                if (v & mask) {
                    if (i & 1)
                        *tdata = (*tdata & 0x0f) | (color << 4);
                    else
                        *tdata = (*tdata & 0xf0) | color;
                }
                mask <<= 1;
                if (i & 1)
                    tdata++;
            }
        }
    }

    return false;
}

/**
 * Draw given bitmap on the current bitmap
 */
//%
void drawBitmap(Bitmap_ img, Bitmap_ from, int x, int y) {
    img->makeWritable();
    if (img->bpp() == 4 && from->bpp() == 4) {
        drawBitmapCore(img, from, x, y, -2);
    } else {
        fillRect(img, x, y, from->width(), from->height(), 0);
        drawBitmapCore(img, from, x, y, 0);
    }
}

/**
 * Draw given bitmap with transparent background on the current bitmap
 */
//%
void drawTransparentBitmap(Bitmap_ img, Bitmap_ from, int x, int y) {
    img->makeWritable();
    drawBitmapCore(img, from, x, y, 0);
}

/**
 * Check if the current bitmap "collides" with another
 */
//%
bool overlapsWith(Bitmap_ img, Bitmap_ other, int x, int y) {
    return drawBitmapCore(img, other, x, y, -1);
}

// Bitmap_ format (legacy)
//  byte 0: magic 0xe4 - 4 bit color; 0xe1 is monochromatic
//  byte 1: width in pixels
//  byte 2: height in pixels
//  byte 3: padding (should be zero)
//  byte 4...N: data 4 bits per pixels, high order nibble printed first, lines aligned to 32 bit
//  words byte 4...N: data 1 bit per pixels, high order bit printed first, lines aligned to byte

Bitmap_ convertAndWrap(Buffer buf) {
    if (isValidImage(buf))
        return NEW_GC(RefImage, buf);

    // What follows in this function is mostly dead code, except if people construct bitmap buffers
    // by hand. Probably safe to remove in a year (middle of 2020) or so. When removing, also remove
    // from sim.
    if (!isLegacyImage(buf))
        return NULL;

    auto tmp = mkBuffer(NULL, buf->length + 4);
    auto hd = (ImageHeader *)tmp->data;
    auto src = buf->data;
    hd->magic = IMAGE_HEADER_MAGIC;
    hd->bpp = src[0] & 0xf;
    hd->width = src[1];
    hd->height = src[2];
    hd->padding = 0;
    memcpy(hd->pixels, src + 4, buf->length - 4);

    registerGCObj(tmp);
    auto r = NEW_GC(RefImage, tmp);
    unregisterGCObj(tmp);
    return r;
}

//%
void _drawIcon(Bitmap_ img, Buffer icon, int xy, int c) {
    img->makeWritable();

    auto iconImg = convertAndWrap(icon);
    if (!iconImg || iconImg->bpp() != 1)
        return;

    drawBitmapCore(img, iconImg, XX(xy), YY(xy), c);
}

static void drawLineLow(Bitmap_ img, int x0, int y0, int x1, int y1, int c) {
    int dx = x1 - x0;
    int dy = y1 - y0;
    int yi = 1;
    if (dy < 0) {
        yi = -1;
        dy = -dy;
    }
    int D = 2 * dy - dx;
    dx <<= 1;
    dy <<= 1;
    int y = y0;
    for (int x = x0; x <= x1; ++x) {
        setCore(img, x, y, c);
        if (D > 0) {
            y += yi;
            D -= dx;
        }
        D += dy;
    }
}

static void drawLineHigh(Bitmap_ img, int x0, int y0, int x1, int y1, int c) {
    int dx = x1 - x0;
    int dy = y1 - y0;
    int xi = 1;
    if (dx < 0) {
        xi = -1;
        dx = -dx;
    }
    int D = 2 * dx - dy;
    dx <<= 1;
    dy <<= 1;
    int x = x0;
    for (int y = y0; y <= y1; ++y) {
        setCore(img, x, y, c);
        if (D > 0) {
            x += xi;
            D -= dy;
        }
        D += dx;
    }
}

void drawLine(Bitmap_ img, int x0, int y0, int x1, int y1, int c) {
    if (x1 < x0) {
        drawLine(img, x1, y1, x0, y0, c);
        return;
    }
    int w = x1 - x0;
    int h = y1 - y0;

    if (h == 0) {
        if (w == 0)
            setPixel(img, x0, y0, c);
        else
            fillRect(img, x0, y0, w + 1, 1, c);
        return;
    }

    if (w == 0) {
        if (h > 0)
            fillRect(img, x0, y0, 1, h + 1, c);
        else
            fillRect(img, x0, y1, 1, -h + 1, c);
        return;
    }

    if (x1 < 0 || x0 >= img->width())
        return;
    if (x0 < 0) {
        y0 -= (h * x0 / w);
        x0 = 0;
    }
    if (x1 >= img->width()) {
        int d = (img->width() - 1) - x1;
        y1 += (h * d / w);
        x1 = img->width() - 1;
    }

    if (y0 < y1) {
        if (y0 >= img->height() || y1 < 0)
            return;
        if (y0 < 0) {
            x0 -= (w * y0 / h);
            y0 = 0;
        }
        if (y1 >= img->height()) {
            int d = (img->height() - 1) - y1;
            x1 += (w * d / h);
            y1 = img->height() - 1;
        }
    } else {
        if (y1 >= img->height() || y0 < 0)
            return;
        if (y1 < 0) {
            x1 -= (w * y1 / h);
            y1 = 0;
        }
        if (y0 >= img->height()) {
            int d = (img->height() - 1) - y0;
            x0 += (w * d / h);
            y0 = img->height() - 1;
        }
    }

    img->makeWritable();

    if (h < 0) {
        h = -h;
        if (h < w)
            drawLineLow(img, x0, y0, x1, y1, c);
        else
            drawLineHigh(img, x1, y1, x0, y0, c);
    } else {
        if (h < w)
            drawLineLow(img, x0, y0, x1, y1, c);
        else
            drawLineHigh(img, x0, y0, x1, y1, c);
    }
}

//%
void _drawLine(Bitmap_ img, int xy, int wh, int c) {
    drawLine(img, XX(xy), YY(xy), XX(wh), YY(wh), c);
}

void blitRow(Bitmap_ img, int x, int y, Bitmap_ from, int fromX, int fromH) {
    if (!img->inRange(x, 0) || !img->inRange(fromX, 0) || fromH <= 0)
        return;

    if (img->bpp() != 4 || from->bpp() != 4)
        return;

    int fy = 0;
    int stepFY = (from->width() << 16) / fromH;
    int endY = y + fromH;
    if (endY > img->height())
        endY = img->height();
    if (y < 0) {
        fy += -y * stepFY;
        y = 0;
    }

    auto dp = img->pix(x, y);
    auto sp = from->pix(fromX, 0);

    while (y < endY) {
        int p = fy >> 16, c;
        if (p & 1)
            c = sp[p >> 1] >> 4;
        else
            c = sp[p >> 1] & 0xf;
        if (y & 1) {
            *dp = (*dp & 0x0f) | (c << 4);
            dp++;
        } else {
            *dp = (*dp & 0xf0) | (c & 0xf);
        }
        y++;
        fy += stepFY;
    }
}

//%
void _blitRow(Bitmap_ img, int xy, Bitmap_ from, int xh) {
    blitRow(img, XX(xy), YY(xy), from, XX(xh), YY(xh));
}

bool blit(Bitmap_ dst, Bitmap_ src, pxt::RefCollection *args) {
    int xDst = pxt::toInt(args->getAt(0));
    int yDst = pxt::toInt(args->getAt(1));
    int wDst = pxt::toInt(args->getAt(2));
    int hDst = pxt::toInt(args->getAt(3));
    int xSrc = pxt::toInt(args->getAt(4));
    int ySrc = pxt::toInt(args->getAt(5));
    int wSrc = pxt::toInt(args->getAt(6));
    int hSrc = pxt::toInt(args->getAt(7));
    bool transparent = pxt::toBoolQuick(args->getAt(8));
    bool check = pxt::toBoolQuick(args->getAt(9));

    int xSrcStep = (wSrc << 16) / wDst;
    int ySrcStep = (hSrc << 16) / hDst;

    int xDstClip = abs(min(0, xDst));
    int yDstClip = abs(min(0, yDst));
    int xDstStart = xDst + xDstClip;
    int yDstStart = yDst + yDstClip;
    int xDstEnd = min(dst->width(), xDst + wDst);
    int yDstEnd = min(dst->height(), yDst + hDst);

    int xSrcStart = max(0, (xSrc << 16) + xDstClip * xSrcStep);
    int ySrcStart = max(0, (ySrc << 16) + yDstClip * ySrcStep);
    int xSrcEnd = min(src->width(), xSrc + wSrc) << 16;
    int ySrcEnd = min(src->height(), ySrc + hSrc) << 16;

    if (!check)
        dst->makeWritable();

    for (int yDstCur = yDstStart, ySrcCur = ySrcStart; yDstCur < yDstEnd && ySrcCur < ySrcEnd; ++yDstCur, ySrcCur += ySrcStep) {
        int ySrcCurI = ySrcCur >> 16;
        for (int xDstCur = xDstStart, xSrcCur = xSrcStart; xDstCur < xDstEnd && xSrcCur < xSrcEnd; ++xDstCur, xSrcCur += xSrcStep) {
            int xSrcCurI = xSrcCur >> 16;
            int cSrc = getCore(src, xSrcCurI, ySrcCurI);
            if (check && cSrc) {
                int cDst = getCore(dst, xDstCur, yDstCur);
                if (cDst) {
                    return true;
                }
                continue;
            }
            if (!transparent || cSrc) {
                setCore(dst, xDstCur, yDstCur, cSrc);
            }
        }
    }
    return false;
}

//%
bool _blit(Bitmap_ img, Bitmap_ src, pxt::RefCollection *args) {
    return blit(img, src, args);
}

void fillCircle(Bitmap_ img, int cx, int cy, int r, int c) {
    int x = r - 1;
    int y = 0;
    int dx = 1;
    int dy = 1;
    int err = dx - (r << 1);

    while (x >= y) {
        fillRect(img, cx + x, cy - y, 1, 1 + (y << 1), c);
        fillRect(img, cx + y, cy - x, 1, 1 + (x << 1), c);
        fillRect(img, cx - x, cy - y, 1, 1 + (y << 1), c);
        fillRect(img, cx - y, cy - x, 1, 1 + (x << 1), c);
        if (err <= 0) {
            ++y;
            err += dy;
            dy += 2;
        } else {
            --x;
            dx += 2;
            err += dx - (r << 1);
        }
    }
}

//%
void _fillCircle(Bitmap_ img, int cxy, int r, int c) {
    fillCircle(img, XX(cxy), YY(cxy), r, c);
}

typedef struct
{
    int x, y;
    int x0, y0;
    int x1, y1;
    int W,H;
    int dx, dy;
    int yi, xi;
    int D;
    int nextFuncIndex;
} LineGenState; // For keeping track of the state when generating Y values for a line, even when moving to the next X.

typedef struct
{
    int min;
    int max;
} ValueRange;

void nextYRange_Low(int x, LineGenState *line, ValueRange *yRange) {
    while (line->x == x && line->x <= line->x1 && line->x < line->W) {
        if (0 <= line->x) {
            if (line->y < yRange->min) yRange->min = line->y;
            if (line->y > yRange->max) yRange->max = line->y;
        }
        if (line->D > 0) {
            line->y += line->yi;
            line->D -= line->dx;
        }
        line->D += line->dy;
        ++line->x;
    }
}

void nextYRange_HighUp(int x, LineGenState *line, ValueRange *yRange) {
    while (line->x == x && line->y >= line->y1 && line->x < line->W) {
        if (0 <= line->x) {
            if (line->y < yRange->min) yRange->min = line->y;
            if (line->y > yRange->max) yRange->max = line->y;
        }
        if (line->D > 0) {
            line->x += line->xi;
            line->D += line->dy;
        }
        line->D += line->dx;
        --line->y;
    }
}
// This function is similar to the sub-function drawLineHigh for drawLine. However, it yields back after calculating all Y values of a given X. When the function is called again, it continues from the state where it yielded back previously.
void nextYRange_HighDown(int x, LineGenState *line, ValueRange *yRange) {
    while (line->x == x && line->y <= line->y1 && line->x < line->W) {
        if (0 <= line->x) {
            if (line->y < yRange->min) yRange->min = line->y;
            if (line->y > yRange->max) yRange->max = line->y;
        }
        if (line->D > 0) {
            line->x += line->xi;
            line->D -= line->dy;
        }
        line->D += line->dx;
        ++line->y;
    }
}

LineGenState initYRangeGenerator(int16_t X0, int16_t Y0, int16_t X1, int16_t Y1) {
    LineGenState line;

    line.x0 = X0, line.y0 = Y0, line.x1 = X1, line.y1 = Y1;

    line.dx = line.x1 - line.x0;
    line.dy = line.y1 - line.y0;
    line.y = line.y0;
    line.x = line.x0;

    if ((line.dy < 0 ? -line.dy : line.dy) < line.dx) {
        line.yi = 1;
        if (line.dy < 0) {
            line.yi = -1;
            line.dy = -line.dy;
        }
        line.D = 2 * line.dy - line.dx;
        line.dx <<= 1;
        line.dy <<= 1;

        line.nextFuncIndex = 0;
        return line;
    } else {
        line.xi = 1;
        // if (dx < 0) {//should not hit
        //     PANIC();
        // }
        if (line.dy < 0) {
            line.D = 2 * line.dx + line.dy;
            line.dx <<= 1;
            line.dy <<= 1;

            line.nextFuncIndex = 1;
            return line;
        } else {
            line.D = 2 * line.dx - line.dy;
            line.dx <<= 1;
            line.dy <<= 1;

            line.nextFuncIndex = 2;
            return line;
        }
    }
}

// core of draw vertical line for repeatly calling, eg.: fillTriangle() or fillPolygon4()
// value range/safety check not included
// prepare "img->makeWritable();" and "uint8_t f = img->fillMask(c);" outside required.
// bpp=4 support only right now
void drawVLineCore(Bitmap_ img, int x, int y, int h, uint8_t f) {
    uint8_t *p = img->pix(x, y);
    auto ptr = p;
    unsigned mask = 0x0f;
    if (y & 1)
        mask <<= 4;
    for (int i = 0; i < h; ++i) {
        if (mask == 0xf00) {
            if (h - i >= 2) {
                *++ptr = f;
                i++;
                continue;
            } else {
                mask = 0x0f;
                ptr++;
            }
        }
        *ptr = (*ptr & ~mask) | (f & mask);
        mask <<= 4;
    }
}

void drawVLine(Bitmap_ img, int x, int y, int h, int c) {
    int H = height(img);
    uint8_t f = img->fillMask(c);
    if (x < 0 || x >= width(img) || y >= H || y + h - 1 < 0)
        return;
    if (y < 0){
        h += y;
        y = 0;
    }
    if (y + h > H)
        h = H - y;
    drawVLineCore(img, x, y, h, f);
}

void fillTriangle(Bitmap_ img, int x0, int y0, int x1, int y1, int x2, int y2, int c) {
    if (x1 < x0) {
        pxt::swap(x0, x1);
        pxt::swap(y0, y1);
    }
    if (x2 < x1) {
        pxt::swap(x1, x2);
        pxt::swap(y1, y2);
    }
    if (x1 < x0) {
        pxt::swap(x0, x1);
        pxt::swap(y0, y1);
    }

    LineGenState lines[] = {
        initYRangeGenerator(x0, y0, x2, y2),
        initYRangeGenerator(x0, y0, x1, y1),
        initYRangeGenerator(x1, y1, x2, y2)
    };

    int W = width(img), H = height(img);
    lines[0].W = lines[1].W = lines[2].W = W;
    lines[0].H = lines[1].H = lines[2].H = H;

    // We have 3 different sub-functions to generate Ys of edges, each particular edge maps to one of them.
    // Use function pointers to avoid judging which function to call at every X.
    typedef void (*FP_NEXT)(int x, LineGenState *line, ValueRange *yRange);
    FP_NEXT nextFuncList[] = { nextYRange_Low, nextYRange_HighUp, nextYRange_HighDown };
    FP_NEXT fpNext0 = nextFuncList[lines[0].nextFuncIndex];
    FP_NEXT fpNext1 = nextFuncList[lines[1].nextFuncIndex];
    FP_NEXT fpNext2 = nextFuncList[lines[2].nextFuncIndex];

    ValueRange yRange = {H, -1};
    img->makeWritable();
    uint8_t f = img->fillMask(c);

    for (int x = lines[1].x0; x <= min(x1, W - 1); x++) {
        yRange.min = H;
        yRange.max = -1;
        fpNext0(x, &lines[0], &yRange);
        fpNext1(x, &lines[1], &yRange);

        if (x < 0 || yRange.min >= H || yRange.max < 0)
            continue;
        if (yRange.min < 0)
            yRange.min = 0;
        if (yRange.max >= H)
            yRange.max = H - 1;
        drawVLineCore(img, x, yRange.min, yRange.max - yRange.min + 1, f);
    }

    fpNext2(lines[2].x0, &lines[2], &yRange);

    for (int x = lines[2].x0 + 1; x <= min(x2, W - 1); x++) {
        yRange.min = H;
        yRange.max = -1;
        fpNext0(x, &lines[0], &yRange);
        fpNext2(x, &lines[2], &yRange);

        if (x < 0 || yRange.min >= H || yRange.max < 0)
            continue;
        if (yRange.min < 0)
            yRange.min = 0;
        if (yRange.max >= H)
            yRange.max = H - 1;
        drawVLineCore(img, x, yRange.min, yRange.max - yRange.min + 1, f);
    }
}

void fillPolygon4(Bitmap_ img, int x0, int y0, int x1, int y1, int x2, int y2, int x3, int y3, int c) {
    LineGenState lines[] = {
        (x0 < x1) ? initYRangeGenerator(x0, y0, x1, y1) : initYRangeGenerator(x1, y1, x0, y0),
        (x1 < x2) ? initYRangeGenerator(x1, y1, x2, y2) : initYRangeGenerator(x2, y2, x1, y1),
        (x2 < x3) ? initYRangeGenerator(x2, y2, x3, y3) : initYRangeGenerator(x3, y3, x2, y2),
        (x0 < x3) ? initYRangeGenerator(x0, y0, x3, y3) : initYRangeGenerator(x3, y3, x0, y0)};

    int W = width(img), H = height(img);
    lines[0].W = lines[1].W = lines[2].W = lines[3].W = W;
    lines[0].H = lines[1].H = lines[2].H = lines[3].H = H;

    int minX = min(min(x0, x1), min(x2, x3));
    int maxX = min(max(max(x0, x1), max(x2, x3)), W - 1);

    typedef void (*FP_NEXT)(int x, LineGenState *line, ValueRange *yRange);
    FP_NEXT nextFuncList[] = { nextYRange_Low, nextYRange_HighUp, nextYRange_HighDown };
    FP_NEXT fpNext0 = nextFuncList[lines[0].nextFuncIndex];
    FP_NEXT fpNext1 = nextFuncList[lines[1].nextFuncIndex];
    FP_NEXT fpNext2 = nextFuncList[lines[2].nextFuncIndex];
    FP_NEXT fpNext3 = nextFuncList[lines[3].nextFuncIndex];

    ValueRange yRange = { H, -1 };
    img->makeWritable();
    uint8_t f = img->fillMask(c);

    for (int x = minX; x <= maxX; x++) {
        yRange.min = H;
        yRange.max = -1;
        fpNext0(x, &lines[0], &yRange);
        fpNext1(x, &lines[1], &yRange);
        fpNext2(x, &lines[2], &yRange);
        fpNext3(x, &lines[3], &yRange);

        if (x < 0 || yRange.min >= H || yRange.max < 0)
            continue;
        if (yRange.min < 0)
            yRange.min = 0;
        if (yRange.max >= H)
            yRange.max = H - 1;
        drawVLineCore(img, x, yRange.min, yRange.max - yRange.min + 1, f);
    }
}

//%
void _fillTriangle(Bitmap_ img, pxt::RefCollection *args) {
    fillTriangle(
        img,
        pxt::toInt(args->getAt(0)),
        pxt::toInt(args->getAt(1)),
        pxt::toInt(args->getAt(2)),
        pxt::toInt(args->getAt(3)),
        pxt::toInt(args->getAt(4)),
        pxt::toInt(args->getAt(5)),
        pxt::toInt(args->getAt(6))
    );
}

// This polygon fill is similar to fillTriangle(): Scan minY and maxY of all edges at each X, and draw a vertical line between (x,minY)~(x,maxY).
// The main difference is that it sorts the endpoints of each edge, x0 < x1, to draw from left to right, but doesn't sort the edges as it's too time consuming.
// Instead, just call next(), which returns immediately if the x is not in range of the edge in horizon.
// NOTE: Unlike triangles, edges of a polygon can cross a vertical line at a given X multi time. This algorithm can fill correctly only if edges meet this condition: Any vertical line(x) cross edges at most 2 times.
// Fortunately, no matter what perspective transform is applied, a rectangle/trapezoid will still meet this condition.
// Ref: https://forum.makecode.com/t/new-3d-engine-help-filling-4-sided-polygons/18641/9
//%
void _fillPolygon4(Bitmap_ img, pxt::RefCollection *args) {
    fillPolygon4(
        img,
        pxt::toInt(args->getAt(0)),
        pxt::toInt(args->getAt(1)),
        pxt::toInt(args->getAt(2)),
        pxt::toInt(args->getAt(3)),
        pxt::toInt(args->getAt(4)),
        pxt::toInt(args->getAt(5)),
        pxt::toInt(args->getAt(6)),
        pxt::toInt(args->getAt(7)),
        pxt::toInt(args->getAt(8))
    );
}

} // namespace BitmapMethods

namespace bitmaps {
/**
 * Create new bitmap with given content
 */
//%
Bitmap_ ofBuffer(Buffer buf) {
    return BitmapMethods::convertAndWrap(buf);
}
}

namespace bitmaps {
/**
 * Create new empty (transparent) bitmap
 */
//%
Bitmap_ create(int width, int height) {
    Bitmap_ r = mkImage(width, height, IMAGE_BITS);
    if (r)
        memset(r->pix(), 0, r->pixLength());
    else
        target_panic(PANIC_INVALID_IMAGE);
    return r;
}

/**
 * Double the size of an icon
 */
//%
Buffer doubledIcon(Buffer icon) {
    if (!isValidImage(icon))
        return NULL;

    auto r = NEW_GC(RefImage, icon);
    registerGCObj(r);
    auto t = BitmapMethods::doubled(r);
    unregisterGCObj(r);
    return t->buffer;
}

} // namespace bitmaps

// This is  6.5x faster than standard on word-aligned copy
// probably should move to codal

#ifndef __linux__
extern "C" void *memcpy(void *dst, const void *src, size_t sz) {
    void *dst0 = dst;
    if (sz >= 4 && !((uintptr_t)dst & 3) && !((uintptr_t)src & 3)) {
        size_t cnt = sz >> 2;
        uint32_t *d = (uint32_t *)dst;
        const uint32_t *s = (const uint32_t *)src;
        while (cnt--) {
            *d++ = *s++;
        }
        sz &= 3;
        dst = d;
        src = s;
    }

    // see comment in memset() below (have not seen optimization here, but better safe than sorry)
    volatile uint8_t *dd = (uint8_t *)dst;
    volatile uint8_t *ss = (uint8_t *)src;

    while (sz--) {
        *dd++ = *ss++;
    }

    return dst0;
}

extern "C" void *memset(void *dst, int v, size_t sz) {
    void *dst0 = dst;
    if (sz >= 4 && !((uintptr_t)dst & 3)) {
        size_t cnt = sz >> 2;
        uint32_t vv = 0x01010101 * v;
        uint32_t *d = (uint32_t *)dst;
        while (cnt--) {
            *d++ = vv;
        }
        sz &= 3;
        dst = d;
    }

    // without volatile here, GCC may optimize the loop to memset() call which is obviously not great
    volatile uint8_t *dd = (uint8_t *)dst;

    while (sz--) {
        *dd++ = v;
    }

    return dst0;
}
#endif
