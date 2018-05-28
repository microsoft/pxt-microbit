#ifndef __PXT_H
#define __PXT_H

//#define DEBUG_MEMLEAKS 1

#pragma GCC diagnostic ignored "-Wunused-parameter"

#include "pxtbase.h"

namespace pxt {

class RefMImage : public RefObject {
  public:
    ImageData *img;

    RefMImage(ImageData *d);
    void makeWritable();
    static void destroy(RefMImage *map);
    static void print(RefMImage *map);
};

#define MSTR(s) ManagedString((s)->data, (s)->length)

static inline String PSTR(ManagedString s) {
    return mkString(s.toCharArray(), s.length());
}

typedef uint32_t ImageLiteral_;

static inline ImageData *imageBytes(ImageLiteral_ lit) {
    return (ImageData*)ptrOfLiteral(lit);
}

typedef RefMImage *Image;

extern MicroBit uBit;
extern MicroBitEvent lastEvent;

MicroBitPin *getPin(int id);

static inline int min_(int a, int b) {
    if (a < b) return a;
    else return b;
}

static inline int max_(int a, int b) {
    if (a > b) return a;
    else return b;
}

}

using namespace pxt;

#define DEVICE_EVT_ANY 0

#endif

// vim: ts=2 sw=2 expandtab
