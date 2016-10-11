#include "ksbit.h"

enum class Button {
    A = MICROBIT_ID_BUTTON_A,
    B = MICROBIT_ID_BUTTON_B,
    //% block="A+B"
    AB = MICROBIT_ID_BUTTON_AB,
};

enum class Dimension {
    //% block=x
    X = 0,
    //% block=y
    Y = 1,
    //% block=z
    Z = 2,
    //% block=strength
    Strength = 3,
};

enum class Rotation {
    //% block=pitch
    Pitch = 0,
    //% block=roll
    Roll = 1,
};

enum class TouchPin {
    P0 = MICROBIT_ID_IO_P0,
    P1 = MICROBIT_ID_IO_P1,
    P2 = MICROBIT_ID_IO_P2,
};

enum class AcceleratorRange {
    /**
     * The accelerator measures forces up to 1 gravity
     */
    //%  block="1g"
    OneG = 1,
    /**
     * The accelerator measures forces up to 2 gravity
     */
    //%  block="2g"
    TwoG = 2,
    /**
     * The accelerator measures forces up to 4 gravity
     */
    //% block="4g"
    FourG = 4,
    /**
     * The accelerator measures forces up to 8 gravity
     */
    //% block="8g"
    EightG = 8
};

enum class Gesture {
    /**
     * Raised when shaken
     */
    //% block=shake
    Shake = MICROBIT_ACCELEROMETER_EVT_SHAKE,
    /**
     * Raised when the logo is upward and the screen is vertical
     */
    //% block="logo up"
    LogoUp = MICROBIT_ACCELEROMETER_EVT_TILT_UP,
    /**
     * Raised when the logo is downward and the screen is vertical
     */
    //% block="logo down"
    LogoDown = MICROBIT_ACCELEROMETER_EVT_TILT_DOWN,
    /**
     * Raised when the screen is pointing down and the board is horizontal
     */
    //% block="screen up"
    ScreenUp = MICROBIT_ACCELEROMETER_EVT_FACE_UP,
    /**
     * Raised when the screen is pointing up and the board is horizontal
     */
    //% block="screen down"
    ScreenDown = MICROBIT_ACCELEROMETER_EVT_FACE_DOWN,
    /**
     * Raised when the screen is pointing left
     */
    //% block="tilt left"
    TiltLeft = MICROBIT_ACCELEROMETER_EVT_TILT_LEFT,
    /**
     * Raised when the screen is pointing right
     */
    //% block="tilt right"
    TiltRight = MICROBIT_ACCELEROMETER_EVT_TILT_RIGHT,
    /**
     * Raised when the board is falling!
     */
    //% block="free fall"
    FreeFall = MICROBIT_ACCELEROMETER_EVT_FREEFALL,
    /**
    * Raised when a 3G shock is detected
    */
    //% block="3g"
    ThreeG = MICROBIT_ACCELEROMETER_EVT_3G,
    /**
    * Raised when a 6G shock is detected
    */
    //% block="6g"
    SixG = MICROBIT_ACCELEROMETER_EVT_6G
};

//% color=300 weight=99
namespace input {
    /**
     * Do something when a button (``A``, ``B`` or both ``A+B``) is pressed
     * @param button TODO
     * @param body TODO
     */
    //% help=input/on-button-pressed weight=85 blockGap=8
    //% blockId=device_button_event block="on button|%NAME|pressed" icon="\uf192"
    //% parts="buttonpair"
    void onButtonPressed(Button button, Action body) {
        registerWithDal((int)button, MICROBIT_BUTTON_EVT_CLICK, body);
    }

    /**
     * Do something when when a gesture is done (like shaking the micro:bit).
     * @param body TODO
     */
    //% help=input/on-gesture weight=84 blockGap=8
    //% blockId=device_gesture_event block="on |%NAME" icon="\uf135"
    //% parts="accelerometer"
    void onGesture(Gesture gesture, Action body) {
        if ((int)gesture == MICROBIT_ACCELEROMETER_EVT_3G && uBit.accelerometer.getRange() < 3)
            uBit.accelerometer.setRange(4);
        else if ((int)gesture == MICROBIT_ACCELEROMETER_EVT_6G && uBit.accelerometer.getRange() < 6)
            uBit.accelerometer.setRange(8);
        registerWithDal(MICROBIT_ID_GESTURE, (int)gesture, body);
    }

     /**
     * Do something when a pin is pressed.
     * @param name the pin that needs to be pressed
     * @param body the code to run when the pin is pressed
     */
    //% help=input/on-pin-pressed weight=83
    //% blockId=device_pin_event block="on pin %NAME|pressed" icon="\uf094"
    void onPinPressed(TouchPin name, Action body) {
        auto pin = getPin((int)name);
        if (!pin) return;

        // Forces the PIN to switch to makey-makey style detection.
        pin->isTouched();
        registerWithDal((int)name, MICROBIT_BUTTON_EVT_CLICK, body);
    }

    /**
     * Do something when a pin is released.
     * @param name the pin that needs to be released
     * @param body the code to run when the pin is released
     */
    //% help=input/on-pin-released weight=6 blockGap=8
    //% blockId=device_pin_released block="on pin %NAME|released" icon="\uf094"
    //% advanced=true
    void onPinReleased(TouchPin name, Action body) {
        auto pin = getPin((int)name);
        if (!pin) return;

        // Forces the PIN to switch to makey-makey style detection.
        pin->isTouched();
        registerWithDal((int)name, MICROBIT_BUTTON_EVT_UP, body);
    }

    /**
     * Get the button state (pressed or not) for ``A`` and ``B``.
     */
    //% help=input/button-is-pressed weight=60
    //% block="button|%NAME|is pressed"
    //% blockId=device_get_button2
    //% icon="\uf192" blockGap=8
    //% parts="buttonpair"
    bool buttonIsPressed(Button button) {
      if (button == Button::A)
        return uBit.buttonA.isPressed();
      else if (button == Button::B)
        return uBit.buttonB.isPressed();
      else if (button == Button::AB)
        return uBit.buttonAB.isPressed();
      return false;
    }

    /**
     * Get the pin state (pressed or not). Requires to hold the ground to close the circuit.
     * @param name pin used to detect the touch
     */
    //% help=input/pin-is-pressed weight=58
    //% blockId="device_pin_is_pressed" block="pin %NAME|is pressed" icon="\uf094"
    //% blockGap=8
    bool pinIsPressed(TouchPin name) {
        auto pin = getPin((int)name);
        return pin && pin->isTouched();
    }

    int getAccelerationStrength() {
        double x = uBit.accelerometer.getX();
        double y = uBit.accelerometer.getY();
        double z = uBit.accelerometer.getZ();
        return (int)sqrt(x*x+y*y+z*z);
    }    

    /**
     * Get the acceleration value in milli-gravitys (when the board is laying flat with the screen up, x=0, y=0 and z=-1024)
     * @param dimension TODO
     */
    //% help=input/acceleration weight=58 icon="\uf135"
    //% blockId=device_acceleration block="acceleration (mg)|%NAME" blockGap=8
    //% parts="accelerometer"
    int acceleration(Dimension dimension) {
      switch (dimension) {
      case Dimension::X: return uBit.accelerometer.getX();
      case Dimension::Y: return uBit.accelerometer.getY();
      case Dimension::Z: return uBit.accelerometer.getZ();
      case Dimension::Strength: return getAccelerationStrength();
      }
      return 0;
    }

    /**
     * Reads the light level applied to the LED screen in a range from ``0`` (dark) to ``255`` bright.
     */
    //% help=input/light-level weight=57
    //% blockId=device_get_light_level block="light level" blockGap=8 icon="\uf185"
    //% parts="ledmatrix"
    int lightLevel() {
        return uBit.display.readLightLevel();
    }

    /**
     * Get the current compass heading in degrees.
     */
    //% help=input/compass-heading
    //% weight=56 icon="\uf14e"
    //% blockId=device_heading block="compass heading (°)" blockGap=8
    //% parts="compass"
    int compassHeading() {
        return uBit.compass.heading();
    }


    /**
     * Gets the temperature in Celsius degrees (°C).
     */
    //% weight=55 icon="\uf06d"
    //% help=input/temperature
    //% blockId=device_temperature block="temperature (°C)" blockGap=8
    //% parts="thermometer"
    int temperature() {
        return uBit.thermometer.getTemperature();
    }

    /**
     * The pitch or roll of the device, rotation along the ``x-axis`` or ``y-axis``, in degrees.
     * @param kind TODO
     */
    //% help=input/rotation weight=52
    //% blockId=device_get_rotation block="rotation (°)|%NAME" blockGap=8 icon="\uf197"
    //% parts="accelerometer" advanced=true
    int rotation(Rotation kind) {
      switch (kind) {
      case Rotation::Pitch: return uBit.accelerometer.getPitch();
      case Rotation::Roll: return uBit.accelerometer.getRoll();
      }
      return 0;
    }

    /**
     * Get the magnetic force value in ``micro-Teslas`` (``µT``). This function is not supported in the simulator.
     * @param dimension TODO
     */
    //% help=input/magnetic-force weight=51
    //% blockId=device_get_magnetic_force block="magnetic force (µT)|%NAME" blockGap=8 icon="\uf076"
    //% parts="compass"
    //% advanced=true
    int magneticForce(Dimension dimension) {
      if (!uBit.compass.isCalibrated())
        uBit.compass.calibrate();

      switch (dimension) {
      case Dimension::X: return uBit.compass.getX() / 1000;
      case Dimension::Y: return uBit.compass.getY() / 1000;
      case Dimension::Z: return uBit.compass.getZ() / 1000;
      case Dimension::Strength: return uBit.compass.getFieldStrength() / 1000;
      }
      return 0;
    }

    /**
     * Gets the number of milliseconds elapsed since power on.
     */
    //% help=input/running-time weight=50
    //% blockId=device_get_running_time block="running time (ms)" icon="\uf017"
    //% advanced=true
    int runningTime() {
        return system_timer_current_time();
    }

    /**
     * Obsolete, compass calibration is automatic.
     */
    //% help=input/calibrate weight=0
    void calibrate() { }

    /**
     * Sets the accelerometer sample range in gravities.
     * @param range a value describe the maximum strengh of acceleration measured
     */
    //% help=input/set-accelerometer-range
    //% blockId=device_set_accelerometer_range block="set accelerometer|range %range" icon="\uf135"
    //% weight=5
    //% parts="accelerometer"
    //% advanced=true
    void setAccelerometerRange(AcceleratorRange range) {
        uBit.accelerometer.setRange((int)range);
    }
}
