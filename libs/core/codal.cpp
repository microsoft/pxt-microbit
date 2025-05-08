#include "pxt.h"
#include <stdarg.h>

PXT_ABI(__aeabi_dadd)
PXT_ABI(__aeabi_dcmplt)
PXT_ABI(__aeabi_dcmpgt)
PXT_ABI(__aeabi_dsub)
PXT_ABI(__aeabi_ddiv)
PXT_ABI(__aeabi_dmul)

#if MICROBIT_CODAL
namespace codal {
int list_fibers(Fiber **dest) {
    int i = 0;
    for (Fiber *fib = codal::get_fiber_list(); fib; fib = fib->next) {
        if (dest)
            dest[i] = fib;
        i++;
    }
    return i;
}

} // namespace codal
#endif

extern "C" void target_panic(int error_code) {
#if MICROBIT_CODAL
    target_disable_irq();
    DMESG("PANIC %d", error_code);
    pxt::dumpDmesg();
#else
    // wait for serial to flush
    sleep_us(300000);
#endif
    microbit_panic(error_code);
}

#if !MICROBIT_CODAL
extern "C" void target_reset() {
    microbit_reset();
}
#endif

uint32_t device_heap_size(uint8_t heap_index); // defined in microbit-dal

namespace pxt {

MicroBit uBit;
MicroBitEvent lastEvent;
bool serialLoggingDisabled;

void platform_init() {
    int seed = microbit_random(0x7fffffff);
    DMESG("random seed: %d", seed);
    seedRandom(seed);
}

void initMicrobitGC() {
    uBit.init();
    if (device_heap_size(1) > NON_GC_HEAP_RESERVATION + 4)
        gcPreAllocateBlock(device_heap_size(1) - NON_GC_HEAP_RESERVATION);
}

void platform_init();
void usb_init();

struct FreeList {
    FreeList *next;
};

void dispatchForeground(MicroBitEvent e, void *action) {
    lastEvent = e;
    auto value = fromInt(e.value);
    runAction1((Action)action, value);
}

void deleteListener(MicroBitListener *l) {
    if (l->cb_param == (void (*)(MicroBitEvent, void *))dispatchForeground) {
        decr((Action)(l->cb_arg));
        unregisterGCPtr((Action)(l->cb_arg));
    }
}

static void initCodal() {
    // TODO!!!
#ifndef MICROBIT_CODAL
    uBit.messageBus.setListenerDeletionCallback(deleteListener);
#endif

    // repeat error 4 times and restart as needed
    microbit_panic_timeout(4);
}

// ---------------------------------------------------------------------------
// An adapter for the API expected by the run-time.
// ---------------------------------------------------------------------------

void registerWithDal(int id, int event, Action a, int flags) {
    uBit.messageBus.ignore(id, event, dispatchForeground);
    uBit.messageBus.listen(id, event, dispatchForeground, a, (uint16_t) flags);
    incr(a);
    registerGCPtr(a);
}

void fiberDone(void *a) {
    decr((Action)a);
    unregisterGCPtr((Action)a);
    release_fiber();
}

void releaseFiber() {
    release_fiber();
}

void sleep_ms(unsigned ms) {
    fiber_sleep(ms);
}

void sleep_us(uint64_t us) {
#if MICROBIT_CODAL
    target_wait_us(us);
#else
    wait_us(us);
#endif
}

void forever_stub(void *a) {
    while (true) {
        runAction0((Action)a);
        fiber_sleep(20);
    }
}

void runForever(Action a) {
    if (a != 0) {
        incr(a);
        registerGCPtr(a);
        create_fiber(forever_stub, (void *)a);
    }
}

void runInParallel(Action a) {
    if (a != 0) {
        incr(a);
        registerGCPtr(a);
        create_fiber((void (*)(void *))runAction0, (void *)a, fiberDone);
    }
}

void waitForEvent(int id, int event) {
    fiber_wait_for_event(id, event);
}

void initRuntime() {
    initCodal();
    platform_init();
}

//%
unsigned afterProgramPage() {
    unsigned ptr = (unsigned)&bytecode[0];
    ptr += programSize();
    ptr = (ptr + (PAGE_SIZE - 1)) & ~(PAGE_SIZE - 1);
    return ptr;
}

int current_time_ms() {
    return system_timer_current_time();
}

static void logwriten(const char *msg, int l) {
    if (!serialLoggingDisabled)
        uBit.serial.send((uint8_t *)msg, l);
}

static void logwrite(const char *msg) {
    logwriten(msg, strlen(msg));
}

static void writeNum(char *buf, uint32_t n, bool full) {
    int i = 0;
    int sh = 28;
    while (sh >= 0) {
        int d = (n >> sh) & 0xf;
        if (full || d || sh == 0 || i) {
            buf[i++] = d > 9 ? 'A' + d - 10 : '0' + d;
        }
        sh -= 4;
    }
    buf[i] = 0;
}

static void logwritenum(uint32_t n, bool full, bool hex) {
    char buff[20];

    if (hex) {
        writeNum(buff, n, full);
        logwrite("0x");
    } else {
        itoa(n, buff);
    }

    logwrite(buff);
}

void vdebuglog(const char *format, va_list ap) {
    const char *end = format;

    while (*end) {
        if (*end++ == '%') {
            logwriten(format, end - format - 1);
            uint32_t val = va_arg(ap, uint32_t);
            switch (*end++) {
            case 'c':
                logwriten((const char *)&val, 1);
                break;
            case 'd':
                logwritenum(val, false, false);
                break;
            case 'x':
                logwritenum(val, false, true);
                break;
            case 'p':
            case 'X':
                logwritenum(val, true, true);
                break;
            case 's':
                logwrite((char *)(void *)val);
                break;
            case '%':
                logwrite("%");
                break;
            default:
                logwrite("???");
                break;
            }
            format = end;
        }
    }
    logwriten(format, end - format);
    logwrite("\n");
}

void debuglog(const char *format, ...) {
    va_list arg;
    va_start(arg, format);
    vdebuglog(format, arg);
    va_end(arg);
}

void sendSerial(const char *data, int len) {
    logwriten(data, len);
}

ThreadContext *getThreadContext() {
    if (!currentFiber)
        return NULL;
    return (ThreadContext *)currentFiber->user_data;
}

void setThreadContext(ThreadContext *ctx) {
    currentFiber->user_data = ctx;
}

#if !MICROBIT_CODAL
#define tcb_get_stack_base(tcb) (tcb).stack_base
#endif

static void *threadAddressFor(Fiber *fib, void *sp) {
    if (fib == currentFiber)
        return sp;

    return (uint8_t *)sp + ((uint8_t *)fib->stack_top - (uint8_t *)tcb_get_stack_base(fib->tcb));
}

void gcProcessStacks(int flags) {
    // check scheduler is initialized
    if (!currentFiber) {
        // make sure we allocate something to at least initalize the memory allocator
        void *volatile p = xmalloc(1);
        xfree(p);
        return;
    }

#ifdef MICROBIT_GET_FIBER_LIST_SUPPORTED
    for (Fiber *fib = get_fiber_list(); fib; fib = fib->next) {
        auto ctx = (ThreadContext *)fib->user_data;
        if (!ctx)
            continue;
        for (auto seg = &ctx->stack; seg; seg = seg->next) {
            auto ptr = (TValue *)threadAddressFor(fib, seg->top);
            auto end = (TValue *)threadAddressFor(fib, seg->bottom);
            if (flags & 2)
                DMESG("RS%d:%p/%d", cnt++, ptr, end - ptr);
            // VLOG("mark: %p - %p", ptr, end);
            while (ptr < end) {
                gcProcess(*ptr++);
            }
        }
    }
#else
    int numFibers = list_fibers(NULL);
    Fiber **fibers = (Fiber **)xmalloc(sizeof(Fiber *) * numFibers);
    int num2 = list_fibers(fibers);
    if (numFibers != num2)
        oops(12);
    int cnt = 0;

    for (int i = 0; i < numFibers; ++i) {
        auto fib = fibers[i];
        auto ctx = (ThreadContext *)fib->user_data;
        if (!ctx)
            continue;
        for (auto seg = &ctx->stack; seg; seg = seg->next) {
            auto ptr = (TValue *)threadAddressFor(fib, seg->top);
            auto end = (TValue *)threadAddressFor(fib, seg->bottom);
            if (flags & 2) {
                DMESG("RS%d:%p/%d", cnt, ptr, end - ptr);
                cnt++;
            }
            // VLOG("mark: %p - %p", ptr, end);
            while (ptr < end) {
                gcProcess(*ptr++);
            }
        }
    }
    xfree(fibers);
#endif
}

} // namespace pxt
