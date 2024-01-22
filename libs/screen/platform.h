#ifndef __PXT_PLATFORM_H
#define __PXT_PLATFORM_H

#include "Image.h"
#include "NRF52SPI.h"
#include "NRF52I2C.h"
#include "NRF52Pin.h"
#include "NRF52PWM.h"
#include "NRF52Serial.h"
#include "NRF52PDM.h"
#include "Timer.h"
#include "MultiButton.h"

#define PAGE_SIZE 4096
#define MIC_DEVICE NRF52PDM

#if defined(NRF52840) || defined(NRF52833)
#define DEV_NUM_PINS 48
#else
#define DEV_NUM_PINS 32
#endif

#define DEV_PWM_PINS 0x0000ffffffffULL // all pins are PWM pins it seems
#define DEV_AIN_PINS 0x0000f000001fULL

// Codal doesn't yet distinguish between PWM and AIN
#define DEV_ANALOG_PINS (DEV_PWM_PINS | DEV_AIN_PINS)

#define CODAL_PIN NRF52Pin
#define CODAL_SPI NRF52SPI
#define CODAL_I2C NRF52I2C
#define CODAL_TIMER Timer
#define CODAL_SERIAL NRF52Serial

#define IMAGE_BITS 4

typedef uint8_t PinName;

#define DEFAULT_NEOPIXEL_PIN P0_0

#define PERF_NOW() (DWT->CYCCNT)
#define PERF_NOW_SCALE 64

// The parameters below needs tuning!

/*
 * @param nominalValue The value (in SI units) of a nominal position.
 * @param nominalReading The raw reading from the sensor at the nominal position.
 * @param beta The Steinhart-Hart Beta constant for the device
 * @param seriesResistor The value (in ohms) of the resistor in series with the sensor.
 * @param zeroOffset Optional zero offset applied to all SI units (e.g. 273.15 for temperature
 * sensing in C vs Kelvin).
 */

#define TEMPERATURE_NOMINAL_VALUE 25
#define TEMPERATURE_NOMINAL_READING 10000
#define TEMPERATURE_BETA 3380
#define TEMPERATURE_SERIES_RESISTOR 10000
#define TEMPERATURE_ZERO_OFFSET 273.5

#define LIGHTSENSOR_SENSITIVITY 868 // codal has 912 now
#define LIGHTSENSOR_LOW_THRESHOLD 128
#define LIGHTSENSOR_HIGH_THRESHOLD 896


#define P0_0 0
#define P0_1 1
#define P0_2 2
#define P0_3 3
#define P0_4 4
#define P0_5 5
#define P0_6 6
#define P0_7 7
#define P0_8 8
#define P0_9 9
#define P0_10 10
#define P0_11 11
#define P0_12 12
#define P0_13 13
#define P0_14 14
#define P0_15 15
#define P0_16 16
#define P0_17 17
#define P0_18 18
#define P0_19 19
#define P0_20 20
#define P0_21 21
#define P0_22 22
#define P0_23 23
#define P0_24 24
#define P0_25 25
#define P0_26 26
#define P0_27 27
#define P0_28 28
#define P0_29 29
#define P0_30 30
#define P0_31 31
#define P1_0 32
#define P1_1 33
#define P1_2 34
#define P1_3 35
#define P1_4 36
#define P1_5 37
#define P1_6 38
#define P1_7 39
#define P1_8 40
#define P1_9 41
#define P1_10 42
#define P1_11 43
#define P1_12 44
#define P1_13 45
#define P1_14 46
#define P1_15 47
#define P1_16 48
#define P1_17 49
#define P1_18 50
#define P1_19 51
#define P1_20 52
#define P1_21 53
#define P1_22 54
#define P1_23 55
#define P1_24 56
#define P1_25 57
#define P1_26 58
#define P1_27 59
#define P1_28 60
#define P1_29 61
#define P1_30 62
#define P1_31 63

#endif
