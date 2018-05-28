#ifndef __PXT_H
#define __PXT_H

//#define DEBUG_MEMLEAKS 1

#pragma GCC diagnostic ignored "-Wunused-parameter"

#include "MicroBit.h"
#include "MicroBitImage.h"
#include "ManagedString.h"
#include "ManagedType.h"

#define printf(...) uBit.serial.printf(__VA_ARGS__)
// #define printf(...)

#include "pxtbase.h"

class RefMImage : public RefObject {
  public:
    ImageData *img;

    RefMImage();
    void makeWritable();
    static void destroy(RefMImage *map);
    static void print(RefMImage *map);
};

#define MSTR(s) ManagedString((s)->data, (s)->length)

static inline String PSTR(ManagedString s) {
    return mkString(s.toCharArray(), s.length());
}

typedef RefMImage *Image;

extern MicroBit uBit;

MicroBitPin *getPin(int id);

#endif

// vim: ts=2 sw=2 expandtab
