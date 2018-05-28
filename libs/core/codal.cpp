#include "pxt.h"

PXT_ABI(__aeabi_dadd)
PXT_ABI(__aeabi_dcmplt)
PXT_ABI(__aeabi_dcmpgt)
PXT_ABI(__aeabi_dsub)
PXT_ABI(__aeabi_ddiv)
PXT_ABI(__aeabi_dmul)

extern "C" void target_panic(int error_code)
{
    // wait for serial to flush
    wait_us(300000);
    microbit_panic(error_code);
}

extern "C" void target_reset()
{
    microbit_reset();
}

namespace pxt {

MicroBit uBit;
MicroBitEvent lastEvent;

void platform_init() {}

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
        create_fiber(forever_stub, (void *)a);
    }
}

void runInParallel(Action a) {
    if (a != 0) {
        incr(a);
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
} // namespace pxt
