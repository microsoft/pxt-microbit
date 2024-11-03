#include "pxt.h"

#undef Button

#include "Pin.h"
#define PinCompat codal::Pin

#include "config_nrf.h"

namespace pxt {


class PressureButton : public codal::Button {
  public:
    PressureButton(Pin &pin, uint16_t id,
                   ButtonEventConfiguration eventConfiguration = DEVICE_BUTTON_ALL_EVENTS,
                   ButtonPolarity polarity = ACTIVE_LOW, PullMode mode = PullMode::None)
        : Button(pin, id, eventConfiguration, polarity, mode) {}

    virtual int pressureLevel() { return isPressed() ? 512 : 0; }
};

struct AnalogCache {
    AnalogCache *next;
    Pin *pin;
    uint32_t lastMeasureMS;
    uint16_t lastMeasure;
    AnalogCache(Pin *pin) : pin(pin) {
        next = NULL;
        lastMeasureMS = 0;
        lastMeasure = pin->getAnalogValue();
    }
    uint16_t read();
};

uint16_t AnalogCache::read() {
    uint32_t now = current_time_ms();
    if (now - lastMeasureMS < 50)
        return lastMeasure;
    lastMeasureMS = now;
    lastMeasure = pin->getAnalogValue();
    return lastMeasure;
}

static AnalogCache *analogCache;

class AnalogButton : public PressureButton {
  public:
    AnalogCache *cache;
    int16_t threshold;
    bool state;

    AnalogButton(AnalogCache *cache, uint16_t id, int threshold)
        : PressureButton(*cache->pin, id), cache(cache), threshold(threshold), state(false) {}

  protected:
    virtual int pressureLevel() override {
        int v = cache->read() - 512;
        if (threshold < 0)
            v = -v;
        int vmin = getConfig(CFG_ANALOG_JOYSTICK_MIN, 50);
        int vmax = getConfig(CFG_ANALOG_JOYSTICK_MAX, 500);
        v = (v - vmin) * 512 / (vmax - vmin);
        if (v < 0)
            v = 0;
        if (v > 512)
            v = 512;
        return v;
    }

    virtual int buttonActive() override {
        int v = cache->read() - 512;
        int thr = threshold;

        if (thr < 0) {
            v = -v;
            thr = -thr;
        }

        if (v > thr)
            state = true;
        else if (state && v > thr * 3 / 4)
            state = true;
        else
            state = false;

        return state;
    }
};

AnalogCache *lookupAnalogCache(Pin *pin) {
    for (auto c = analogCache; c; c = c->next)
        if (c->pin == pin)
            return c;
    auto c = new AnalogCache(pin);
    c->next = analogCache;
    analogCache = c;
    return c;
}

int multiplexedButtonIsPressed(int btnId);
int registerMultiplexedButton(int pin, int buttonId);

//% expose
int pressureLevelByButtonId(int btnId, int codalId) {
    if (codalId <= 0)
        codalId = DEVICE_ID_FIRST_BUTTON + btnId;
    auto btn = (PressureButton *)lookupComponent(codalId);
    if (!btn) {
        return multiplexedButtonIsPressed(btnId) ? 512 : 0;
    }
    return btn->pressureLevel();
}

static void sendBtnDown(Event ev) {
    Event(PXT_INTERNAL_KEY_DOWN, ev.source - DEVICE_ID_FIRST_BUTTON);
}

static void sendBtnUp(Event ev) {
    Event(PXT_INTERNAL_KEY_UP, ev.source - DEVICE_ID_FIRST_BUTTON);
}

//% expose
void setupButton(int buttonId, int key) {
    int pin = getConfig(key);
    if (pin == -1)
        return;

    unsigned highflags = (unsigned)pin >> 16;
    int flags = BUTTON_ACTIVE_LOW_PULL_UP;
    if (highflags & 0xff)
        flags = highflags & 0xff;

    pin &= 0xffff;

    auto cpid = DEVICE_ID_FIRST_BUTTON + buttonId;
    auto btn = (PressureButton *)lookupComponent(cpid);
    if (btn == NULL) {
        if (registerMultiplexedButton(pin, buttonId))
            return;

        if (1100 <= pin && pin < 1300) {
            pin -= 1100;
            int thr = getConfig(CFG_ANALOG_BUTTON_THRESHOLD, 300);
            if (pin >= 100) {
                thr = -thr;
                pin -= 100;
            }
            btn = new AnalogButton(lookupAnalogCache(myLookupPin(pin)), cpid, thr);
        } else {
            auto pull = PullMode::None;
            if ((flags & 0xf0) == 0x10)
                pull = PullMode::Down;
            else if ((flags & 0xf0) == 0x20)
                pull = PullMode::Up;
            else if ((flags & 0xf0) == 0x30)
                pull = PullMode::None;
            else
                oops(3);
            btn = new PressureButton(*myLookupPin(pin), cpid, DEVICE_BUTTON_ALL_EVENTS,
                                     (ButtonPolarity)(flags & 0xf), pull);
        }
        EventModel::defaultEventBus->listen(btn->id, DEVICE_BUTTON_EVT_DOWN, sendBtnDown);
        EventModel::defaultEventBus->listen(btn->id, DEVICE_BUTTON_EVT_UP, sendBtnUp);
    }
}

} // namespace pxt
