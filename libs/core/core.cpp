#include "pxtbase.h"
#include <limits.h>
#include <stdlib.h>

using namespace std;


#define p10(v) __builtin_powi(10, v)


namespace pxt {

static HandlerBinding *handlerBindings;

HandlerBinding *findBinding(int source, int value) {
    for (auto p = handlerBindings; p; p = p->next) {
        if (p->source == source && p->value == value) {
            return p;
        }
    }
    return 0;
}

void setBinding(int source, int value, Action act) {
    auto curr = findBinding(source, value);
    incr(act);
    if (curr) {
        decr(curr->action);
        curr->action = act;
        return;
    }
    curr = new HandlerBinding();
    curr->next = handlerBindings;
    curr->source = source;
    curr->value = value;
    curr->action = act;
    handlerBindings = curr;
}

static const uint16_t emptyString[]
    __attribute__((aligned(4))) = {0xffff, PXT_REF_TAG_STRING, 0, 0};

static const uint16_t emptyBuffer[]
    __attribute__((aligned(4))) = {0xffff, PXT_REF_TAG_BUFFER, 0, 0};

String mkString(const char *data, int len) {
    if (len < 0)
        len = strlen(data);
    if (len == 0)
        return (String)emptyString;
    String r = new (::operator new(sizeof(BoxedString) + len + 1)) BoxedString();
    r->length = len;
    if (data)
        memcpy(r->data, data, len);
    r->data[len] = 0;
    MEMDBG("mkString: len=%d => %p", len, r);
    return r;
}

Buffer mkBuffer(const uint8_t *data, int len) {
    if (len <= 0)
        return (Buffer)emptyBuffer;
    Buffer r = new (::operator new(sizeof(BoxedBuffer) + len)) BoxedBuffer();
    r->length = len;
    if (data)
        memcpy(r->data, data, len);
    else
        memset(r->data, 0, len);
    MEMDBG("mkBuffer: len=%d => %p", len, r);
    return r;
}

#ifndef X86_64
TNumber mkNaN() {
    // TODO optimize
    return fromDouble(NAN);
}
#endif

static unsigned random_value = 0xC0DA1;

void seedRandom(unsigned seed) {
    random_value = seed;
}

unsigned getRandom(unsigned max) {
    unsigned m, result;

    do {
        m = (unsigned)max;
        result = 0;

        do {
            // Cycle the LFSR (Linear Feedback Shift Register).
            // We use an optimal sequence with a period of 2^32-1, as defined by Bruce Schneier here
            // (a true legend in the field!),
            // For those interested, it's documented in his paper:
            // "Pseudo-Random Sequence Generator for 32-Bit CPUs: A fast, machine-independent
            // generator for 32-bit Microprocessors"
            // https://www.schneier.com/paper-pseudorandom-sequence.html
            unsigned r = random_value;

            r = ((((r >> 31) ^ (r >> 6) ^ (r >> 4) ^ (r >> 2) ^ (r >> 1) ^ r) & 1) << 31) |
                (r >> 1);

            random_value = r;

            result = ((result << 1) | (r & 0x00000001));
        } while (m >>= 1);
    } while (result > (unsigned)max);

    return result;
}

PXT_DEF_STRING(sTrue, "\x04\x00true")
PXT_DEF_STRING(sFalse, "\x05\x00false")
PXT_DEF_STRING(sUndefined, "\x09\x00undefined")
PXT_DEF_STRING(sNull, "\x04\x00null")
PXT_DEF_STRING(sObject, "\x08\x00[Object]")
PXT_DEF_STRING(sFunction, "\x0A\x00[Function]")
PXT_DEF_STRING(sNaN, "\x03\x00NaN")
PXT_DEF_STRING(sInf, "\x08\x00Infinity")
PXT_DEF_STRING(sMInf, "\x09\x00-Infinity")
} // namespace pxt

#ifndef X86_64

namespace String_ {

//%
String mkEmpty() {
    return mkString("", 0);
}

//%
String fromCharCode(int code) {
    char buf[] = {(char)code, 0};
    return mkString(buf, 1);
}

//%
String charAt(String s, int pos) {
    if (s && 0 <= pos && pos < s->length) {
        return fromCharCode(s->data[pos]);
    } else {
        return mkEmpty();
    }
}

//%
TNumber charCodeAt(String s, int pos) {
    if (s && 0 <= pos && pos < s->length) {
        return fromInt(s->data[pos]);
    } else {
        return mkNaN();
    }
}

//%
String concat(String s, String other) {
    if (!s)
        s = (String)sNull;
    if (!other)
        other = (String)sNull;
    if (s->length == 0)
        return (String)incrRC(other);
    if (other->length == 0)
        return (String)incrRC(s);
    String r = mkString(NULL, s->length + other->length);
    memcpy(r->data, s->data, s->length);
    memcpy(r->data + s->length, other->data, other->length);
    return r;
}

//%
int compare(String s, String that) {
    if (s == that)
        return 0;
    // TODO this isn't quite right, in JS both `null < "foo"` and `null > "foo"` are false
    if (!s)
        return -1;
    if (!that)
        return 1;
    int compareResult = strcmp(s->data, that->data);
    if (compareResult < 0)
        return -1;
    else if (compareResult > 0)
        return 1;
    return 0;
}

//%
int length(String s) {
    return s->length;
}

#define isspace(c) ((c) == ' ')

double mystrtod(const char *p, char **endp) {
    while (isspace(*p))
        p++;
    double m = 1;
    double v = 0;
    int dot = 0;
    if (*p == '+')
        p++;
    if (*p == '-') {
        m = -1;
        p++;
    }
    if (*p == '0' && (p[1] | 0x20) == 'x') {
        return m * strtol(p, endp, 16);
    }
    while (*p) {
        int c = *p - '0';
        if (0 <= c && c <= 9) {
            v *= 10;
            v += c;
            if (dot)
                m /= 10;
        } else if (!dot && *p == '.') {
            dot = 1;
        } else if (*p == 'e' || *p == 'E') {
            break;
        } else {
            while (isspace(*p))
                p++;
            if (*p)
                return NAN;
            break;
        }
        p++;
    }

    v *= m;

    if (*p) {
        p++;
        int pw = strtol(p, endp, 10);
        v *= p10(pw);
    }

    return v;
}

//%
TNumber toNumber(String s) {
    // JSCHECK
    char *endptr;
    double v = mystrtod(s->data, &endptr);
    if (endptr != s->data + s->length)
        v = NAN;
    else if (v == 0.0 || v == -0.0)
        v = v;
    else if (!isnormal(v))
        v = NAN;
    return fromDouble(v);
}

//%
String substr(String s, int start, int length) {
    if (length <= 0)
        return mkEmpty();
    if (start < 0)
        start = max(s->length + start, 0);
    length = min(length, s->length - start);
    return mkString(s->data + start, length);
}
} // namespace String_

namespace Boolean_ {
//%
bool bang(int v) {
    return v == 0;
}
} // namespace Boolean_

namespace pxt {

// ES5 9.5, 9.6
unsigned toUInt(TNumber v) {
    if (isNumber(v))
        return numValue(v);
    if (isSpecial(v)) {
        if ((intptr_t)v >> 6)
            return 1;
        else
            return 0;
    }
    if (!v)
        return 0;

    double num = toDouble(v);
    if (!isnormal(num))
        return 0;
    double rem = fmod(trunc(num), 4294967296.0);
    if (rem < 0.0)
        rem += 4294967296.0;
    return (unsigned)rem;
}
int toInt(TNumber v) {
    return (int)toUInt(v);
}

// only support double in tagged mode
double toDouble(TNumber v) {
    if (isTagged(v))
        return toInt(v);

    // JSCHECK
    ValType t = valType(v);
    if (t == ValType::Number) {
        BoxedNumber *p = (BoxedNumber *)v;
        return p->num;
    } else if (t == ValType::String) {
        return toDouble(String_::toNumber((String)v));
    } else {
        return NAN;
    }
}

float toFloat(TNumber v) {
    // TODO optimize?
    return (float)toDouble(v);
}

TNumber fromDouble(double r) {
#ifndef PXT_BOX_DEBUG
    int ri = ((int)r) << 1;
    if ((ri >> 1) == r)
        return (TNumber)(ri | 1);
#endif
    BoxedNumber *p = new BoxedNumber();
    p->num = r;
    MEMDBG("mkNum: %p", p);
    return (TNumber)p;
}

TNumber fromFloat(float r) {
    // TODO optimize
    return fromDouble(r);
}

TNumber fromInt(int v) {
    if (canBeTagged(v))
        return TAG_NUMBER(v);
    return fromDouble(v);
}

TNumber fromUInt(unsigned v) {
#ifndef PXT_BOX_DEBUG
    if (v <= 0x3fffffff)
        return TAG_NUMBER(v);
#endif
    return fromDouble(v);
}

TValue fromBool(bool v) {
    if (v)
        return TAG_TRUE;
    else
        return TAG_FALSE;
}

TNumber eqFixup(TNumber v) {
    if (v == TAG_NULL)
        return TAG_UNDEFINED;
    if (v == TAG_TRUE)
        return TAG_NUMBER(1);
    if (v == TAG_FALSE)
        return TAG_NUMBER(0);
    return v;
}

bool eqq_bool(TValue a, TValue b) {
    // TODO improve this

    if (a == b)
        return true;

    ValType ta = valType(a);
    ValType tb = valType(b);

    if (ta != tb)
        return false;

    if (ta == ValType::String)
        return String_::compare((String)a, (String)b) == 0;

    int aa = (int)a;
    int bb = (int)b;

    // if at least one of the values is tagged, they are not equal
    if ((aa | bb) & 3)
        return false;

    if (ta == ValType::Number)
        return toDouble(a) == toDouble(b);
    else
        return a == b;
}

bool eq_bool(TValue a, TValue b) {
    return eqq_bool(eqFixup(a), eqFixup(b));
}

//%
bool switch_eq(TValue a, TValue b) {
    if (eqq_bool(eqFixup(a), eqFixup(b))) {
        decr(b);
        return true;
    }
    return false;
}

} // namespace pxt

namespace langsupp {
//%
TValue ptreq(TValue a, TValue b) {
    return eq_bool(a, b) ? TAG_TRUE : TAG_FALSE;
}

//%
TValue ptreqq(TValue a, TValue b) {
    return eqq_bool(a, b) ? TAG_TRUE : TAG_FALSE;
}

//%
TValue ptrneq(TValue a, TValue b) {
    return !eq_bool(a, b) ? TAG_TRUE : TAG_FALSE;
}

//%
TValue ptrneqq(TValue a, TValue b) {
    return !eqq_bool(a, b) ? TAG_TRUE : TAG_FALSE;
}
} // namespace langsupp

#define NUMOP(op) return fromDouble(toDouble(a) op toDouble(b));
#define BITOP(op) return fromInt(toInt(a) op toInt(b));
namespace numops {

//%
int toBool(TValue v) {
    if (isTagged(v)) {
        if (v == TAG_UNDEFINED || v == TAG_NULL || v == TAG_FALSE || v == TAG_NUMBER(0))
            return 0;
        else
            return 1;
    }

    ValType t = valType(v);
    if (t == ValType::String) {
        String s = (String)v;
        if (s->length == 0)
            return 0;
    } else if (t == ValType::Number) {
        double x = toDouble(v);
        if (isnan(x) || x == 0.0 || x == -0.0)
            return 0;
        else
            return 1;
    }

    return 1;
}

//%
int toBoolDecr(TValue v) {
    if (v == TAG_TRUE)
        return 1;
    if (v == TAG_FALSE)
        return 0;
    int r = toBool(v);
    decr(v);
    return r;
}

// TODO
// The integer, non-overflow case for add/sub/bit opts is handled in assembly

//%
TNumber adds(TNumber a, TNumber b){NUMOP(+)}

//%
TNumber subs(TNumber a, TNumber b){NUMOP(-)}

//%
TNumber muls(TNumber a, TNumber b) {
    if (bothNumbers(a, b)) {
        int aa = (int)a;
        int bb = (int)b;
        // if both operands fit 15 bits, the result will not overflow int
        if ((aa >> 15 == 0 || aa >> 15 == -1) && (bb >> 15 == 0 || bb >> 15 == -1)) {
            // it may overflow 31 bit int though - use fromInt to convert properly
            return fromInt((aa >> 1) * (bb >> 1));
        }
    }
    NUMOP(*)
}

//%
TNumber div(TNumber a, TNumber b){NUMOP(/)}

//%
TNumber mod(TNumber a, TNumber b) {
    if (isNumber(a) && isNumber(b) && numValue(b))
        BITOP(%)
    return fromDouble(fmod(toDouble(a), toDouble(b)));
}

//%
TNumber lsls(TNumber a, TNumber b){BITOP(<<)}

//%
TNumber lsrs(TNumber a, TNumber b) {
    return fromUInt(toUInt(a) >> toUInt(b));
}

//%
TNumber asrs(TNumber a, TNumber b){BITOP(>>)}

//%
TNumber eors(TNumber a, TNumber b){BITOP (^)}

//%
TNumber orrs(TNumber a, TNumber b){BITOP(|)}

//%
TNumber bnot(TNumber a) {
    return fromInt(~toInt(a));
}

//%
TNumber ands(TNumber a, TNumber b) {
    BITOP(&)
}

#define CMPOP_RAW(op)                                                                              \
    if (bothNumbers(a, b))                                                                         \
        return (int)a op((int)b);                                                                  \
    return toDouble(a) op toDouble(b);

#define CMPOP(op)                                                                                  \
    if (bothNumbers(a, b))                                                                         \
        return ((int)a op((int)b)) ? TAG_TRUE : TAG_FALSE;                                         \
    return toDouble(a) op toDouble(b) ? TAG_TRUE : TAG_FALSE;

//%
bool lt_bool(TNumber a, TNumber b){CMPOP_RAW(<)}

//%
TNumber le(TNumber a, TNumber b){CMPOP(<=)}

//%
TNumber lt(TNumber a, TNumber b){CMPOP(<)}

//%
TNumber ge(TNumber a, TNumber b){CMPOP(>=)}

//%
TNumber gt(TNumber a, TNumber b){CMPOP(>)}

//%
TNumber eq(TNumber a, TNumber b) {
    return pxt::eq_bool(a, b) ? TAG_TRUE : TAG_FALSE;
}

//%
TNumber neq(TNumber a, TNumber b) {
    return !pxt::eq_bool(a, b) ? TAG_TRUE : TAG_FALSE;
}

//%
TNumber eqq(TNumber a, TNumber b) {
    return pxt::eqq_bool(a, b) ? TAG_TRUE : TAG_FALSE;
}

//%
TNumber neqq(TNumber a, TNumber b) {
    return !pxt::eqq_bool(a, b) ? TAG_TRUE : TAG_FALSE;
}

void mycvt(double d, char *buf) {
    if (d < 0) {
        *buf++ = '-';
        d = -d;
    }

    if (!d) {
        *buf++ = '0';
        *buf++ = 0;
        return;
    }

    int pw = (int)log10(d);
    int e = 1;
    int beforeDot = 1;

    if (0.000001 <= d && d < 1e21) {
        if (pw > 0) {
            d /= p10(pw);
            beforeDot = 1 + pw;
        }
    } else {
        d /= p10(pw);
        e = pw;
    }

    int sig = 0;
    while (sig < 17 || beforeDot > 0) {
        //printf("%f sig=%d bd=%d\n", d, sig, beforeDot);
        int c = (int)d;
        *buf++ = '0' + c;
        d = (d - c) * 10;
        if (--beforeDot == 0)
            *buf++ = '.';
        if (sig || c)
            sig++;
    }

    buf--;
    while (*buf == '0')
        buf--;
    if (*buf == '.')
        buf--;
    buf++;
    
    if (e != 1) {
        *buf++ = 'e';
        itoa(e, buf);
    } else {
        *buf = 0;
    }
}


//%
String toString(TValue v) {

    if (v == TAG_UNDEFINED)
        return (String)(void *)sUndefined;
    else if (v == TAG_FALSE)
        return (String)(void *)sFalse;
    else if (v == TAG_TRUE)
        return (String)(void *)sTrue;
    else if (v == TAG_NULL)
        return (String)(void *)sNull;
    ValType t = valType(v);

    if (t == ValType::String) {
        return (String)(void *)incr(v);
    } else if (t == ValType::Number) {
        char buf[64];

        double x = toDouble(v);

        if (isnan(x))
            return (String)(void *)sNaN;
        if (isinf(x)) {
            if (x < 0)
                return (String)(void *)sMInf;
            else
                return (String)(void *)sInf;
        }
        mycvt(x, buf);

        return mkString(buf);
    } else if (t == ValType::Function) {
        return (String)(void *)sFunction;
    } else {
        return (String)(void *)sObject;
    }
}
} // namespace numops

namespace Math_ {
//%
TNumber pow(TNumber x, TNumber y) {
    // regular pow() from math.h is 4k of code
    return fromDouble(__builtin_powi(toDouble(x), toInt(y)));
}

//%
TNumber atan2(TNumber y, TNumber x) {
    return fromDouble(::atan2(toDouble(y), toDouble(y)));
}

double randomDouble() {
    return getRandom(UINT_MAX) / ((double)UINT_MAX + 1) +
           getRandom(0xffffff) / ((double)UINT_MAX * 0xffffff);
}

//%
TNumber random() {
    return fromDouble(randomDouble());
}

//%
TNumber randomRange(TNumber min, TNumber max) {
    if (isNumber(min) && isNumber(max)) {
        int mini = numValue(min);
        int maxi = numValue(max);
        if (mini > maxi) {
            int temp = mini;
            mini = maxi;
            maxi = temp;
        }
        if (maxi == mini)
            return fromInt(mini);
        else
            return fromInt(mini + getRandom(maxi - mini));
    } else {
        double mind = toDouble(min);
        double maxd = toDouble(max);
        if (mind > maxd) {
            double temp = mind;
            mind = maxd;
            maxd = temp;
        }
        if (maxd == mind)
            return fromDouble(mind);
        else {
            return fromDouble(mind + randomDouble() * (maxd - mind));
        }
    }
}

#define SINGLE(op) return fromDouble(::op(toDouble(x)));

//%
TNumber log(TNumber x){SINGLE(log)}

//%
TNumber log10(TNumber x){SINGLE(log10)}

//%
TNumber sqrt(TNumber x){SINGLE(sqrt)}

//%
TNumber floor(TNumber x){SINGLE(floor)}

//%
TNumber ceil(TNumber x){SINGLE(ceil)}

//%
TNumber trunc(TNumber x){SINGLE(trunc)}

//%
TNumber round(TNumber x) {
    SINGLE(round)
}

//%
int imul(int x, int y) {
    return x * y | 0;
}

//%
int idiv(int x, int y) {
    return x / y | 0;
}
} // namespace Math_

namespace Array_ {
//%
RefCollection *mk(unsigned flags) {
    auto r = new RefCollection();
    MEMDBG("mkColl: %p", r);
    return r;
}
//%
int length(RefCollection *c) {
    return c->length();
}
//%
void setLength(RefCollection *c, int newLength) {
    c->setLength(newLength);
}
//%
void push(RefCollection *c, TValue x) {
    c->push(x);
}
//%
TValue pop(RefCollection *c) {
    return c->pop();
}
//%
TValue getAt(RefCollection *c, int x) {
    return c->getAt(x);
}
//%
void setAt(RefCollection *c, int x, TValue y) {
    c->setAt(x, y);
}
//%
TValue removeAt(RefCollection *c, int x) {
    return c->removeAt(x);
}
//%
void insertAt(RefCollection *c, int x, TValue value) {
    c->insertAt(x, value);
}
//%
int indexOf(RefCollection *c, TValue x, int start) {
    return c->indexOf(x, start);
}
//%
bool removeElement(RefCollection *c, TValue x) {
    return c->removeElement(x);
}
} // namespace Array_

namespace pxt {
//%
void *ptrOfLiteral(int offset);

//%
unsigned programSize() {
    return bytecode[17] * 2;
}

//%
int getConfig(int key, int defl) {
    int *cfgData = *(int **)&bytecode[18];
    for (int i = 0;; i += 2) {
        if (cfgData[i] == key)
            return cfgData[i + 1];
        if (cfgData[i] == 0)
            return defl;
    }
}

} // namespace pxt

namespace pxtrt {
//%
TValue ldloc(RefLocal *r) {
    return r->v;
}

//%
TValue ldlocRef(RefRefLocal *r) {
    TValue tmp = r->v;
    incr(tmp);
    return tmp;
}

//%
void stloc(RefLocal *r, TValue v) {
    r->v = v;
}

//%
void stlocRef(RefRefLocal *r, TValue v) {
    decr(r->v);
    r->v = v;
}

//%
RefLocal *mkloc() {
    auto r = new RefLocal();
    MEMDBG("mkloc: %p", r);
    return r;
}

//%
RefRefLocal *mklocRef() {
    auto r = new RefRefLocal();
    MEMDBG("mklocRef: %p", r);
    return r;
}

// All of the functions below unref() self. This is for performance reasons -
// the code emitter will not emit the unrefs for them.

//%
TValue ldfld(RefRecord *r, int idx) {
    TValue tmp = r->ld(idx);
    r->unref();
    return tmp;
}

//%
TValue ldfldRef(RefRecord *r, int idx) {
    TValue tmp = r->ldref(idx);
    r->unref();
    return tmp;
}

//%
void stfld(RefRecord *r, int idx, TValue val) {
    r->st(idx, val);
    r->unref();
}

//%
void stfldRef(RefRecord *r, int idx, TValue val) {
    r->stref(idx, val);
    r->unref();
}

// Store a captured local in a closure. It returns the action, so it can be chained.
//%
RefAction *stclo(RefAction *a, int idx, TValue v) {
    // DBG("STCLO "); a->print(); DBG("@%d = %p\n", idx, (void*)v);
    a->stCore(idx, v);
    return a;
}

//%
void panic(int code) {
    target_panic(code);
}

//%
String emptyToNull(String s) {
    if (!s || s->length == 0)
        return NULL;
    return s;
}

//%
int ptrToBool(TValue p) {
    if (p) {
        decr(p);
        return 1;
    } else {
        return 0;
    }
}

//%
RefMap *mkMap() {
    auto r = new RefMap();
    MEMDBG("mkMap: %p", r);
    return r;
}

//%
TValue mapGet(RefMap *map, unsigned key) {
    int i = map->findIdx(key);
    if (i < 0) {
        map->unref();
        return 0;
    }
    TValue r = incr(map->values.get(i));
    map->unref();
    return r;
}

//%
TValue mapGetRef(RefMap *map, unsigned key) {
    return mapGet(map, key);
}

//%
void mapSet(RefMap *map, unsigned key, TValue val) {
    int i = map->findIdx(key);
    if (i < 0) {
        map->keys.push((TValue)key);
        map->values.push(val);
    } else {
        map->values.setRef(i, val);
    }
    map->unref();
}

//%
void mapSetRef(RefMap *map, unsigned key, TValue val) {
    mapSet(map, key, val);
}

//
// Debugger
//

// This is only to be called once at the beginning of lambda function
//%
void *getGlobalsPtr() {
#ifdef DEVICE_GROUP_ID_USER
    fiber_set_group(DEVICE_GROUP_ID_USER);
#endif

    return globals;
}

//%
void runtimeWarning(String s) {
    // noop for now
}
} // namespace pxtrt
#endif

namespace pxt {

//%
ValType valType(TValue v) {
    if (isTagged(v)) {
        if (!v)
            return ValType::Undefined;

        if (isNumber(v))
            return ValType::Number;
        if (v == TAG_TRUE || v == TAG_FALSE)
            return ValType::Boolean;
        else if (v == TAG_NULL)
            return ValType::Object;
        else {
            oops();
            return ValType::Object;
        }
    } else {
        int tag = ((RefObject *)v)->vtable;

        if (tag == PXT_REF_TAG_STRING)
            return ValType::String;
        else if (tag == PXT_REF_TAG_NUMBER)
            return ValType::Number;
        else if (tag == PXT_REF_TAG_ACTION || getVTable((RefObject *)v) == &RefAction_vtable)
            return ValType::Function;

        return ValType::Object;
    }
}

PXT_DEF_STRING(sObjectTp, "\x06\x00object")
PXT_DEF_STRING(sBooleanTp, "\x07\x00boolean")
PXT_DEF_STRING(sStringTp, "\x06\x00string")
PXT_DEF_STRING(sNumberTp, "\x06\x00number")
PXT_DEF_STRING(sFunctionTp, "\x08\x00function")
PXT_DEF_STRING(sUndefinedTp, "\x09\x00undefined")

//%
String typeOf(TValue v) {
    switch (valType(v)) {
    case ValType::Undefined:
        return (String)sUndefinedTp;
    case ValType::Boolean:
        return (String)sBooleanTp;
    case ValType::Number:
        return (String)sNumberTp;
    case ValType::String:
        return (String)sStringTp;
    case ValType::Object:
        return (String)sObjectTp;
    case ValType::Function:
        return (String)sFunctionTp;
    default:
        oops();
        return 0;
    }
}

// Maybe in future we will want separate print methods; for now ignore
void anyPrint(TValue v) {
    if (valType(v) == ValType::Object) {
        if (isRefCounted(v)) {
            auto o = (RefObject *)v;
            auto meth = ((RefObjectMethod)getVTable(o)->methods[1]);
            if ((void *)meth == (void *)&anyPrint)
                DMESG("[RefObject refs=%d vt=%p]", o->refcnt, o->vtable);
            else
                meth(o);
        } else {
            DMESG("[Native %p]", v);
        }
    } else {
#ifndef X86_64
        String s = numops::toString(v);
        DMESG("[%s %p = %s]", pxt::typeOf(v)->data, v, s->data);
        decr((TValue)s);
#endif
    }
}

void dtorDoNothing() {}

#define PRIM_VTABLE(name, sz)                                                                      \
    const VTable name = {sz,                                                                       \
                         0,                                                                        \
                         0,                                                                        \
                         {                                                                         \
                             (void *)&dtorDoNothing,                                               \
                             (void *)&anyPrint,                                                    \
                         }};
PRIM_VTABLE(string_vt, 0)
PRIM_VTABLE(image_vt, 0)
PRIM_VTABLE(buffer_vt, 0)
PRIM_VTABLE(number_vt, 12)
PRIM_VTABLE(action_vt, 0)

static const VTable *primVtables[] = {0,          // 0
                                      &string_vt, // 1
                                      &buffer_vt, // 2
                                      &image_vt,  // 3
                                      // filler:
                                      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                                      0, 0, 0, 0, 0, 0, 0,
                                      &number_vt, // 32
                                      &action_vt, // 33
                                      0};

VTable *getVTable(RefObject *r) {
    if (r->vtable >= 34)
        return (VTable *)((uintptr_t)r->vtable << vtableShift);
    if (r->vtable == 0)
        target_panic(100);
    return (VTable *)primVtables[r->vtable];
}
} // namespace pxt
