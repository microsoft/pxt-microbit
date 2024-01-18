#ifndef __JDPROTOCOL_H
#define __JDPROTOCOL_H

#include <stdint.h>
#include <stdbool.h>

#ifdef __cplusplus
extern "C" {
#endif

// 255 minus size of the serial header, rounded down to 4
#define JD_SERIAL_PAYLOAD_SIZE 236
#define JD_SERIAL_FULL_HEADER_SIZE 16

#define JD_SERVICE_CLASS_CTRL 0x00000000

#define JD_SERVICE_NUMBER_CTRL 0x00
#define JD_SERVICE_NUMBER_MASK 0x3f
#define JD_SERVICE_NUMBER_CRC_ACK 0x3f

// the COMMAND flag signifies that the device_identifier is the recipent
// (i.e., it's a command for the peripheral); the bit clear means device_identifier is the source
// (i.e., it's a report from peripheral or a broadcast message)
#define JD_FRAME_FLAG_COMMAND 0x01
// an ACK should be issued with CRC of this package upon reception
#define JD_FRAME_FLAG_ACK_REQUESTED 0x02
// the device_identifier contains target service class number
#define JD_FRAME_FLAG_IDENTIFIER_IS_SERVICE_CLASS 0x04

#define JD_FRAME_SIZE(pkt) ((pkt)->size + 12)

// Registers 0x001-0x07f - r/w common to all services
// Registers 0x080-0x0ff - r/w defined per-service
// Registers 0x100-0x17f - r/o common to all services
// Registers 0x180-0x1ff - r/o defined per-service
// Registers 0x200-0xeff - custom, defined per-service
// Registers 0xf00-0xfff - reserved for implementation, should not be on the wire

// this is either binary (0 or non-zero), or can be gradual (eg. brightness of neopixel)
#define JD_REG_INTENSITY 0x01
// the primary value of actuator (eg. servo angle)
#define JD_REG_VALUE 0x02
// enable/disable streaming
#define JD_REG_IS_STREAMING 0x03
// streaming interval in miliseconds
#define JD_REG_STREAMING_INTERVAL 0x04
// for analog sensors
#define JD_REG_LOW_THRESHOLD 0x05
#define JD_REG_HIGH_THRESHOLD 0x06
// limit power drawn; in mA
#define JD_REG_MAX_POWER 0x07

// eg. one number for light sensor, all 3 coordinates for accelerometer
#define JD_REG_READING 0x101

#define JD_CMD_GET_REG 0x1000
#define JD_CMD_SET_REG 0x2000

#define JD_GET(reg) (JD_CMD_GET_REG | (reg))
#define JD_SET(reg) (JD_CMD_SET_REG | (reg))

// Commands 0x000-0x07f - common to all services
// Commands 0x080-0xeff - defined per-service
// Commands 0xf00-0xfff - reserved for implementation
// enumeration data for CTRL, ad-data for other services
#define JD_CMD_ADVERTISEMENT_DATA 0x00
// event from sensor or on broadcast service
#define JD_CMD_EVENT 0x01
// request to calibrate sensor
#define JD_CMD_CALIBRATE 0x02
// request human-readable description of service
#define JD_CMD_GET_DESCRIPTION 0x03

// Commands specific to control service
// do nothing
#define JD_CMD_CTRL_NOOP 0x80
// blink led or otherwise draw user's attention
#define JD_CMD_CTRL_IDENTIFY 0x81
// reset device
#define JD_CMD_CTRL_RESET 0x82
// identifies the type of hardware (eg., ACME Corp. Servo X-42 Rev C)
#define JD_REG_CTRL_DEVICE_DESCRIPTION 0x180
// a numeric code for the string above; used to mark firmware images
#define JD_REG_CTRL_DEVICE_CLASS 0x181
// MCU temperature in Celsius
#define JD_REG_CTRL_TEMPERATURE 0x182
// this is very approximate; ADC reading from backward-biasing the identification LED
#define JD_REG_CTRL_LIGHT_LEVEL 0x183
// typically the same as JD_REG_CTRL_DEVICE_CLASS; the bootloader will respond to that code
#define JD_REG_CTRL_BL_DEVICE_CLASS 0x184

struct _jd_packet_t {
    uint16_t crc;
    uint8_t _size; // of frame data[]
    uint8_t flags;

    uint64_t device_identifier;

    uint8_t service_size;
    uint8_t service_number;
    uint16_t service_command;

    uint8_t data[0];
} __attribute__((__packed__, aligned(4)));
typedef struct _jd_packet_t jd_packet_t;

struct _jd_frame_t {
    uint16_t crc;
    uint8_t size;
    uint8_t flags;

    uint64_t device_identifier;

    uint8_t data[JD_SERIAL_PAYLOAD_SIZE + 4];
} __attribute__((__packed__, aligned(4)));
typedef struct _jd_frame_t jd_frame_t;

#define JDSPI_MAGIC 0x7ACD
#define JDSPI_MAGIC_NOOP 0xB3CD

#ifdef __cplusplus
}
#endif

#endif
