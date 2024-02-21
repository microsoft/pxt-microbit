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

#define NON_GC_HEAP_RESERVATION 1024

#ifdef CODAL_CONFIG_H
#define MICROBIT_CODAL 1
#define GC_MAX_ALLOC_SIZE 11000
#else
#define MICROBIT_CODAL 0
#define GC_MAX_ALLOC_SIZE 9000
#define GC_BLOCK_SIZE 256
#endif

#if !MICROBIT_CODAL
#undef DMESG
#define DMESG NOLOG
#endif

#undef BYTES_TO_WORDS

#endif
