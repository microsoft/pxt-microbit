#include "pxt.h"
#include <stdarg.h>

PXT_ABI(__aeabi_dadd)
PXT_ABI(__aeabi_dcmplt)
PXT_ABI(__aeabi_dcmpgt)
PXT_ABI(__aeabi_dsub)
PXT_ABI(__aeabi_ddiv)
PXT_ABI(__aeabi_dmul)

extern "C" void target_panic(int error_code) {
    // wait for serial to flush
    wait_us(300000);
    microbit_panic(error_code);
}

extern "C" void target_reset() {
    microbit_reset();
}

uint32_t device_heap_size(uint8_t heap_index); // defined in microbit-dal

namespace pxt {

MicroBit uBit;
MicroBitEvent lastEvent;

void platform_init() {
    microbit_seed_random();    
    seedRandom(microbit_random(0x7fffffff));
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

static void initCodal() {
    // repeat error 4 times and restart as needed
    microbit_panic_timeout(4);
}

void dumpDmesg() {}

// ---------------------------------------------------------------------------
// An adapter for the API expected by the run-time.
// ---------------------------------------------------------------------------

// We have the invariant that if [dispatchEvent] is registered against the DAL
// for a given event, then [handlersMap] contains a valid entry for that
// event.
void dispatchEvent(MicroBitEvent e) {
    lastEvent = e;

    auto curr = findBinding(e.source, e.value);
    auto value = fromInt(e.value);
    if (curr)
        runAction1(curr->action, value);

    curr = findBinding(e.source, DEVICE_EVT_ANY);
    if (curr)
        runAction1(curr->action, value);
}

void registerWithDal(int id, int event, Action a, int flags) {
    // first time?
    if (!findBinding(id, event))
        uBit.messageBus.listen(id, event, dispatchEvent, flags);
    setBinding(id, event, a);
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
    wait_us(us);
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

static void *threadAddressFor(Fiber *fib, void *sp) {
    if (fib == currentFiber)
        return sp;
    return (uint8_t *)sp + ((uint8_t *)fib->stack_top - (uint8_t *)fib->tcb.stack_base);
}

void gcProcessStacks(int flags) {
    // check scheduler is initialized
    if (!currentFiber) {
        // make sure we allocate something to at least initalize the memory allocator
        void * volatile p = xmalloc(1);
        xfree(p);
        return;
    }

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
            if (flags & 2)
                DMESG("RS%d:%p/%d", cnt++, ptr, end - ptr);
            // VLOG("mark: %p - %p", ptr, end);
            while (ptr < end) {
                gcProcess(*ptr++);
            }
        }
    }
    xfree(fibers);
}

} // namespace pxt
