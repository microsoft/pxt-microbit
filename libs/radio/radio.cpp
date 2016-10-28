#include "pxt.h"

using namespace pxt;

#define MAX_FIELD_NAME_LENGTH 12
#define MAX_PAYLOAD_LENGTH 20
#define PACKET_PREFIX_LENGTH 9
#define VALUE_PACKET_NAME_LEN_OFFSET 13


// Packet Spec:
// | 0              | 1 ... 4       | 5 ... 8           | 9 ... 28
// ----------------------------------------------------------------
// | packet type    | system time   | serial number     | payload
//
// Serial number defaults to 0 unless enabled by user

// payload: number (9 ... 12)
#define PACKET_TYPE_NUMBER 0

// payload: number (9 ... 12), name length (13), name (14 ... 26)
#define PACKET_TYPE_VALUE 1

// payload: string length (9), string (10 ... 28)
#define PACKET_TYPE_STRING 2

//% color=270 weight=34
namespace radio {

    // -------------------------------------------------------------------------
    // Radio
    // -------------------------------------------------------------------------
    bool radioEnabled = false;
    bool transmitSerialNumber = false;

    PacketBuffer packet;

    uint8_t type;
    uint32_t time;
    uint32_t serial;
    int value;
    StringData* msg;

    int radioEnable() {
        int r = uBit.radio.enable();
        if (r != MICROBIT_OK) {
            uBit.panic(43);
            return r;
        }
        if (!radioEnabled) {
            uBit.radio.setGroup(pxt::programHash());
            radioEnabled = true;
        }
        return r;
    }

    void broadcastMessage(int message) {
        if (radioEnable() != MICROBIT_OK) return;
        uBit.radio.event.eventReceived(MicroBitEvent(MES_BROADCAST_GENERAL_ID, message, CREATE_ONLY));
    }

    void onBroadcastMessageReceived(int message, Action f) {
        if (radioEnable() != MICROBIT_OK) return;
        registerWithDal(MES_BROADCAST_GENERAL_ID, message, f);
    }

    void setPacketPrefix(uint8_t* buf, int type) {
        // prefix: type (0), time (1..4), serial (5..8)
        uint32_t t = system_timer_current_time();
        uint32_t sn = transmitSerialNumber ? microbit_serial_number() : 0;

        buf[0] = (uint8_t) type;
        memcpy(buf + 1, &t, 4);
        memcpy(buf + 5, &sn, 4);
    }

    uint8_t copyStringValue(uint8_t* buf, StringData* data, uint8_t maxLength) {
        ManagedString s(data);
        uint8_t len = min(maxLength, s.length());

        // One byte for length of the string
        buf[0] = len;

        if (len > 0) {
            memcpy(buf + 1, s.toCharArray(), len);
        }
        return len + 1;
    }

    StringData* getStringValue(uint8_t* buf, uint8_t maxLength) {
        // First byte is the string length
        uint8_t len = min(maxLength, buf[0]);

        if (len) {
            char name[maxLength + 1];
            memcpy(name, buf + 1, len);
            name[len] = 0;
            return ManagedString(name).leakData();
        }
        return ManagedString().leakData();
    }

    void writePacketAsJSON(uint8_t tp, int v, int s, int t, StringData* m) {
        // Convert the packet to JSON and send over serial
        uBit.serial.send("{");
        uBit.serial.send("\"t\":");
        uBit.serial.send(t);
        uBit.serial.send(",\"s\":");
        uBit.serial.send(s);
        if (tp == PACKET_TYPE_STRING || tp == PACKET_TYPE_VALUE) {
            uBit.serial.send(",\"n\":\"");
            uBit.serial.send(m);
            uBit.serial.send("\"");
        }
        if (tp == PACKET_TYPE_NUMBER || tp == PACKET_TYPE_VALUE) {
            uBit.serial.send(",\"v\":");
            uBit.serial.send(v);
        }
        uBit.serial.send("}\r\n");
    }

    /**
     * Takes a packet from the micro:bit radio queue.
     * @param writeToSerial if true, write the received packet to serial without updating the global packet;
                            if false, update the global packet instead
     */
    void receivePacket(bool writeToSerial) {
        PacketBuffer p = uBit.radio.datagram.recv();

        uint8_t* buf = p.getBytes();
        uint8_t tp;
        int t;
        int s;
        int v;
        StringData* m;


        memcpy(&tp, buf, 1);
        memcpy(&t, buf + 1, 4);
        memcpy(&s, buf + 5, 4);

        if (tp == PACKET_TYPE_STRING) {
            v = 0;
            m = getStringValue(buf + PACKET_PREFIX_LENGTH, MAX_PAYLOAD_LENGTH - 1);
        }
        else {
            memcpy(&v, buf + 9, 4);
            if (tp == PACKET_TYPE_VALUE) {
                m = getStringValue(buf + VALUE_PACKET_NAME_LEN_OFFSET, MAX_FIELD_NAME_LENGTH);
            }
            else {
                m = ManagedString().leakData();
            }
        }

        if (!writeToSerial) {
            // Refresh global packet
            packet = p;
            type = tp;
            time = t;
            serial = s;
            value = v;
            msg = m;
        }
        else {
            writePacketAsJSON(tp, v, s, t, m);
        }
    }

    /**
     * Broadcasts a number over radio to any connected micro:bit in the group.
     */
    //% help=radio/send-number
    //% weight=60
    //% blockId=radio_datagram_send block="radio send number %value" blockGap=8
    void sendNumber(int value) {
        if (radioEnable() != MICROBIT_OK) return;
        uint8_t length = PACKET_PREFIX_LENGTH + sizeof(uint32_t);
        uint8_t buf[length];
        memset(buf, 0, length);

        setPacketPrefix(buf, PACKET_TYPE_NUMBER);
        memcpy(buf + PACKET_PREFIX_LENGTH, &value, 4);

        uBit.radio.datagram.send(buf, length);
    }

    /**
    * Broadcasts a name / value pair along with the device serial number
    * and running time to any connected micro:bit in the group.
    * @param name the field name (max 12 characters), eg: "name"
    * @param value the numberic value
    */
    //% help=radio/send-value
    //% weight=59
    //% blockId=radio_datagram_send_value block="radio send|value %name|= %value" blockGap=8
    void sendValue(StringData* name, int value) {
        if (radioEnable() != MICROBIT_OK) return;

        ManagedString n(name);
        uint8_t buf[32];
        memset(buf, 0, 32);

        setPacketPrefix(buf, PACKET_TYPE_VALUE);
        memcpy(buf + PACKET_PREFIX_LENGTH, &value, 4);

        int stringLen = copyStringValue(buf + VALUE_PACKET_NAME_LEN_OFFSET, name, MAX_FIELD_NAME_LENGTH);

        uBit.radio.datagram.send(buf, VALUE_PACKET_NAME_LEN_OFFSET + stringLen);
    }

    /**
     * Broadcasts a string along with the device serial number
     * and running time to any connected micro:bit in the group.
     */
    //% help=radio/send-string
    //% weight=58
    //% blockId=radio_datagram_send_string block="radio send string %msg"
    void sendString(StringData* msg) {
        if (radioEnable() != MICROBIT_OK) return;

        uint8_t buf[32];
        memset(buf, 0, 32);

        setPacketPrefix(buf, PACKET_TYPE_STRING);
        int stringLen = copyStringValue(buf + PACKET_PREFIX_LENGTH, msg, MAX_PAYLOAD_LENGTH - 1);

        uBit.radio.datagram.send(buf, PACKET_PREFIX_LENGTH + stringLen);
    }

    /**
    * Reads the next packet from the radio queue and and writes it to serial
    * as JSON.
    */
    //% help=radio/write-value-to-serial
    //% weight=3
    //% blockId=radio_write_value_serial block="radio write value to serial"
    //% deprecated=true
    void writeValueToSerial() {
        if (radioEnable() != MICROBIT_OK) return;
        receivePacket(true);
    }

    /**
    * Writes the last received packet to serial as JSON. This should be called
    * within an ``onDataPacketReceived`` callback.
    */
    //% help=radio/write-received-packet-to-serial
    //% weight=3
    //% blockId=radio_write_packet_serial block="radio write received packet to serial"
    //% advanced=true
    void writeReceivedPacketToSerial() {
        if (radioEnable() != MICROBIT_OK) return;
        writePacketAsJSON(type, value, (int) serial, (int) time, msg);
    }

    /**
     * Reads the next packet from the radio queue and returns the packet's number
     * payload or 0 if the packet did not contain a number.
     */
    //% help=radio/receive-number
    //% weight=46
    //% blockId=radio_datagram_receive block="radio receive number" blockGap=8
    //% deprecated=true
    int receiveNumber()
    {
        if (radioEnable() != MICROBIT_OK) return 0;
        receivePacket(false);
        return value;
    }

    /**
     * Registers code to run when a packet is received over radio.
     */
    //% help=radio/on-data-received
    //% weight=50
    //% blockId=radio_datagram_received_event block="radio on data received" blockGap=8
    //% deprecated=true
    void onDataReceived(Action body) {
        if (radioEnable() != MICROBIT_OK) return;
        registerWithDal(MICROBIT_ID_RADIO, MICROBIT_RADIO_EVT_DATAGRAM, body);
        // make sure the receive buffer has a free spot
        receiveNumber();
    }


    /**
     * Reads the next packet from the radio queue and returns the packet's string
     * payload or the empty string if the packet did not contain a string.
     */
    //% blockId=radio_datagram_receive_string block="radio receive string" blockGap=8
    //% weight=44
    //% help=radio/receive-string
    //% deprecated=true
    StringData* receiveString() {
        if (radioEnable() != MICROBIT_OK) return ManagedString().leakData();
        receivePacket(false);
        return msg;
    }

    /**
     * Gets the received signal strength indicator (RSSI) from the last packet taken
     * from the radio queue (via ``receiveNumber``, ``receiveString``, etc). Not supported in simulator.
     * namespace=radio
     */
    //% help=radio/received-signal-strength
    //% weight=40
    //% blockId=radio_datagram_rssi block="radio received signal strength"
    //% deprecated=true
    int receivedSignalStrength() {
        if (radioEnable() != MICROBIT_OK) return 0;
        return packet.getRSSI();
    }

    /**
     * Sets the group id for radio communications. A micro:bit can only listen to one group ID at any time.
     * @ param id the group id between ``0`` and ``255``, 1 eg
     */
    //% help=radio/set-group
    //% weight=10 blockGap=8 advanced=true
    //% blockId=radio_set_group block="radio set group %ID"
    void setGroup(int id) {
        if (radioEnable() != MICROBIT_OK) return;
        uBit.radio.setGroup(id);
    }

    /**
     * Change the output power level of the transmitter to the given value.
    * @param power a value in the range 0..7, where 0 is the lowest power and 7 is the highest. eg: 7
    */
    //% help=radio/set-transmit-power
    //% weight=9 blockGap=8
    //% blockId=radio_set_transmit_power block="radio set transmit power %power"
    //% advanced=true
    void setTransmitPower(int power) {
        if (radioEnable() != MICROBIT_OK) return;
        uBit.radio.setTransmitPower(power);
    }

    /**
    * Set the radio to transmit the serial number in each message.
    * @param transmit value indicating if the serial number is transmitted, eg: true
    */
    //% help=radio/set-transmit-serial-number
    //% weight=8 blockGap=8
    //% blockId=radio_set_transmit_serial_number block="radio set transmit serial number %transmit"
    //% advanced=true
    void setTransmitSerialNumber(bool transmit) {
        if (radioEnable() != MICROBIT_OK) return;
        transmitSerialNumber = transmit;
    }

    /**
     * Returns the number payload from the last packet taken from the radio queue
     * (via ``receiveNumber``, ``receiveString``, etc) or 0 if that packet did not
     * contain a number.
     */
    //% help=radio/received-number
    int receivedNumber() {
        if (radioEnable() != MICROBIT_OK) return 0;
        return value;
    }

    /**
     * Returns the serial number of the sender micro:bit from the last packet taken
     * from the radio queue (via ``receiveNumber``, ``receiveString``, etc) or 0 if
     * that packet did not send a serial number.
     */
    //% help=radio/received-serial
    uint32_t receivedSerial() {
        if (radioEnable() != MICROBIT_OK) return 0;
        return serial;
    }

    /**
     * Returns the string payload from the last packet taken from the radio queue
     * (via ``receiveNumber``, ``receiveString``, etc) or the empty string if that
     * packet did not contain a string.
     */
    //% help=radio/received-string
    StringData* receivedString() {
        if (radioEnable() != MICROBIT_OK) return ManagedString().leakData();
        return msg;
    }

    /**
     * Returns the system time of the sender micro:bit at the moment when it sent the
     * last packet taken from the radio queue (via ``receiveNumber``,
     * ``receiveString``, etc).
     */
    //% help=radio/received-time
    uint32_t receivedTime() {
        if (radioEnable() != MICROBIT_OK) return 0;
        return time;
    }
}
