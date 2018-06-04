#ifndef __PXTCORE_H
#define __PXTCORE_H

#include "MicroBit.h"
#include "MicroBitImage.h"
#include "ManagedString.h"
#include "ManagedType.h"

namespace pxt {
void debuglog(const char *format, ...);
}


#define DMESG NOLOG

#endif
