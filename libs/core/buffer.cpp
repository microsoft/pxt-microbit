#include "pxtbase.h"
#include <limits.h>

using namespace std;

//% indexerGet=BufferMethods::getByte indexerSet=BufferMethods::setByte
namespace BufferMethods {
//%
uint8_t *getBytes(Buffer buf) {
    return buf->data;
}

//%
int getByte(Buffer buf, int off) {
    if (buf && 0 <= off && off < buf->length)
        return buf->data[off];
    return 0;
}

//%
void setByte(Buffer buf, int off, int v) {
    if (buf && 0 <= off && off < buf->length)
        buf->data[off] = v;
}

int writeBuffer(Buffer buf, int dstOffset, Buffer src, int srcOffset = 0, int length = -1) {
    if (length < 0)
        length = src->length;

    if (srcOffset < 0 || dstOffset < 0 || dstOffset > buf->length)
        return -1;

    length = min(src->length - srcOffset, buf->length - dstOffset);

    if (length < 0)
        return -1;

    if (buf == src) {
        memmove(buf->data + dstOffset, src->data + srcOffset, length);
    } else {
        memcpy(buf->data + dstOffset, src->data + srcOffset, length);
    }

    return 0;
}

/**
 * Write a number in specified format in the buffer.
 */
//%
void setNumber(Buffer buf, NumberFormat format, int offset, TNumber value) {
    if (offset < 0)
        return;
    setNumberCore(buf->data + offset, buf->length - offset, format, value);
}

/**
 * Read a number in specified format from the buffer.
 */
//%
TNumber getNumber(Buffer buf, NumberFormat format, int offset) {
    if (offset < 0)
        return fromInt(0);
    return getNumberCore(buf->data + offset, buf->length - offset, format);
}

/** Returns the length of a Buffer object. */
//% property
int length(Buffer s) {
    return s->length;
}

/**
 * Fill (a fragment) of the buffer with given value.
 */
//%
void fill(Buffer buf, int value, int offset = 0, int length = -1) {
    if (offset < 0 || offset > buf->length)
        return; // DEVICE_INVALID_PARAMETER;
    if (length < 0)
        length = buf->length;
    length = min(length, buf->length - offset);
    memset(buf->data + offset, value, length);
}

/**
 * Return a copy of a fragment of a buffer.
 */
//%
Buffer slice(Buffer buf, int offset = 0, int length = -1) {
    offset = min((int)buf->length, offset);
    if (length < 0)
        length = buf->length;
    length = min(length, buf->length - offset);
    return mkBuffer(buf->data + offset, length);
}

/**
 * Shift buffer left in place, with zero padding.
 * @param offset number of bytes to shift; use negative value to shift right
 * @param start start offset in buffer. Default is 0.
 * @param length number of elements in buffer. If negative, length is set as the buffer length minus
 * start. eg: -1
 */
//%
void shift(Buffer buf, int offset, int start = 0, int length = -1) {
    if (length < 0)
        length = buf->length - start;
    if (start < 0 || start + length > buf->length || start + length < start || length == 0 ||
        offset == 0 || offset == INT_MIN)
        return;
    if (offset <= -length || offset >= length) {
        fill(buf, 0);
        return;
    }

    uint8_t *data = buf->data + start;
    if (offset < 0) {
        offset = -offset;
        memmove(data + offset, data, length - offset);
        memset(data, 0, offset);
    } else {
        length = length - offset;
        memmove(data, data + offset, length);
        memset(data + length, 0, offset);
    }
}

/**
 * Convert a buffer to its hexadecimal representation.
 */
//%
String toHex(Buffer buf) {
    const char *hex = "0123456789abcdef";
    auto res = mkString(NULL, buf->length * 2);
    for (int i = 0; i < buf->length; ++i) {
        res->data[i << 1] = hex[buf->data[i] >> 4];
        res->data[(i << 1) + 1] = hex[buf->data[i] & 0xf];
    }
    return res;
}

/**
 * Rotate buffer left in place.
 * @param offset number of bytes to shift; use negative value to shift right
 * @param start start offset in buffer. Default is 0.
 * @param length number of elements in buffer. If negative, length is set as the buffer length minus
 * start. eg: -1
 */
//%
void rotate(Buffer buf, int offset, int start = 0, int length = -1) {
    if (length < 0)
        length = buf->length - start;
    if (start < 0 || start + length > buf->length || start + length < start || length == 0 ||
        offset == 0 || offset == INT_MIN)
        return;

    if (offset < 0)
        offset += length << 8; // try to make it positive
    offset %= length;
    if (offset < 0)
        offset += length;

    uint8_t *data = buf->data + start;

    uint8_t *n_first = data + offset;
    uint8_t *first = data;
    uint8_t *next = n_first;
    uint8_t *last = data + length;

    while (first != next) {
        uint8_t tmp = *first;
        *first++ = *next;
        *next++ = tmp;
        if (next == last) {
            next = n_first;
        } else if (first == n_first) {
            n_first = next;
        }
    }
}

/**
 * Write contents of `src` at `dstOffset` in current buffer.
 */
//%
void write(Buffer buf, int dstOffset, Buffer src) {
    // srcOff and length not supported, we only do up to 4 args :/
    writeBuffer(buf, dstOffset, src, 0, -1);
}
}

namespace control {
/**
 * Create a new zero-initialized buffer.
 * @param size number of bytes in the buffer
 */
//%
Buffer createBuffer(int size) {
    return mkBuffer(NULL, size);
}
}

namespace pxt {
static int writeBytes(uint8_t *dst, uint8_t *src, int length, bool swapBytes, int szLeft) {
    if (szLeft < length) {
        return -1;
    }

    if (swapBytes) {
        uint8_t *p = dst + length;
        for (int i = 0; i < length; ++i)
            *--p = src[i];
    } else {
        if (length == 4 && ((uint32_t)dst & 3) == 0)
            *(uint32_t *)dst = *(uint32_t *)src;
        else if (length == 2 && ((uint32_t)dst & 1) == 0)
            *(uint16_t *)dst = *(uint16_t *)src;
        else
            memcpy(dst, src, length);
    }

    return 0;
}

static int readBytes(uint8_t *src, uint8_t *dst, int length, bool swapBytes, int szLeft) {
    if (szLeft < length) {
        memset(dst, 0, length);
        return -1;
    }

    if (swapBytes) {
        uint8_t *p = src + length;
        for (int i = 0; i < length; ++i)
            dst[i] = *--p;
    } else {
        if (length == 4 && ((uint32_t)src & 3) == 0)
            *(uint32_t *)dst = *(uint32_t *)src;
        else if (length == 2 && ((uint32_t)src & 1) == 0)
            *(uint16_t *)dst = *(uint16_t *)src;
        else
            memcpy(dst, src, length);
    }

    return 0;
}

void setNumberCore(uint8_t *buf, int szLeft, NumberFormat format, TNumber value) {
    int8_t i8;
    uint8_t u8;
    int16_t i16;
    uint16_t u16;
    int32_t i32;
    uint32_t u32;
    float f32;
    double f64;

// Assume little endian
#define WRITEBYTES(isz, swap, toInt)                                                               \
    isz = toInt(value);                                                                            \
    writeBytes(buf, (uint8_t *)&isz, sizeof(isz), swap, szLeft);                                   \
    break

    switch (format) {
    case NumberFormat::Int8LE:
        WRITEBYTES(i8, false, toInt);
    case NumberFormat::UInt8LE:
        WRITEBYTES(u8, false, toInt);
    case NumberFormat::Int16LE:
        WRITEBYTES(i16, false, toInt);
    case NumberFormat::UInt16LE:
        WRITEBYTES(u16, false, toInt);
    case NumberFormat::Int32LE:
        WRITEBYTES(i32, false, toInt);
    case NumberFormat::UInt32LE:
        WRITEBYTES(u32, false, toUInt);

    case NumberFormat::Int8BE:
        WRITEBYTES(i8, true, toInt);
    case NumberFormat::UInt8BE:
        WRITEBYTES(u8, true, toInt);
    case NumberFormat::Int16BE:
        WRITEBYTES(i16, true, toInt);
    case NumberFormat::UInt16BE:
        WRITEBYTES(u16, true, toInt);
    case NumberFormat::Int32BE:
        WRITEBYTES(i32, true, toInt);
    case NumberFormat::UInt32BE:
        WRITEBYTES(u32, true, toUInt);

    case NumberFormat::Float32LE:
        WRITEBYTES(f32, false, toFloat);
    case NumberFormat::Float32BE:
        WRITEBYTES(f32, true, toFloat);
    case NumberFormat::Float64LE:
        WRITEBYTES(f64, false, toDouble);
    case NumberFormat::Float64BE:
        WRITEBYTES(f64, true, toDouble);
    }
}

TNumber getNumberCore(uint8_t *buf, int szLeft, NumberFormat format) {
    int8_t i8;
    uint8_t u8;
    int16_t i16;
    uint16_t u16;
    int32_t i32;
    uint32_t u32;
    float f32;
    double f64;

// Assume little endian
#define READBYTES(isz, swap, conv)                                                                 \
    readBytes(buf, (uint8_t *)&isz, sizeof(isz), swap, szLeft);                                    \
    return conv(isz)

    switch (format) {
    case NumberFormat::Int8LE:
        READBYTES(i8, false, fromInt);
    case NumberFormat::UInt8LE:
        READBYTES(u8, false, fromInt);
    case NumberFormat::Int16LE:
        READBYTES(i16, false, fromInt);
    case NumberFormat::UInt16LE:
        READBYTES(u16, false, fromInt);
    case NumberFormat::Int32LE:
        READBYTES(i32, false, fromInt);
    case NumberFormat::UInt32LE:
        READBYTES(u32, false, fromUInt);

    case NumberFormat::Int8BE:
        READBYTES(i8, true, fromInt);
    case NumberFormat::UInt8BE:
        READBYTES(u8, true, fromInt);
    case NumberFormat::Int16BE:
        READBYTES(i16, true, fromInt);
    case NumberFormat::UInt16BE:
        READBYTES(u16, true, fromInt);
    case NumberFormat::Int32BE:
        READBYTES(i32, true, fromInt);
    case NumberFormat::UInt32BE:
        READBYTES(u32, true, fromUInt);

    case NumberFormat::Float32LE:
        READBYTES(f32, false, fromFloat);
    case NumberFormat::Float32BE:
        READBYTES(f32, true, fromFloat);
    case NumberFormat::Float64LE:
        READBYTES(f64, false, fromDouble);
    case NumberFormat::Float64BE:
        READBYTES(f64, true, fromDouble);
    }

    return 0;
}
}