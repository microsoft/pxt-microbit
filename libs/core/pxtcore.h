#ifndef __PXTCORE_H
#define __PXTCORE_H

#include "MicroBit.h"
#include "MicroBitImage.h"
#include "ManagedString.h"
#include "ManagedType.h"

namespace pxt {
void debuglog(const char *format, ...);
}

// #define GC_GET_HEAP_SIZE() device_heap_size(0)
#define xmalloc malloc
#define xfree free

#define GC_MAX_ALLOC_SIZE 9000

#if CONFIG_ENABLED(MICROBIT_BLE_ENABLED)
#define GC_BLOCK_SIZE 256
#else
#define GC_BLOCK_SIZE 1000
#endif

#define DMESG NOLOG

#endif
