#include "pxt.h"

using namespace pxt;

#define MAX_FIELD_NAME_LENGTH 12

//% color=270 weight=34
namespace radio {

    // -------------------------------------------------------------------------
    // Radio
    // -------------------------------------------------------------------------
    bool radioEnabled = false;
    bool transmitSerialNumber = false;

    PacketBuffer packet;

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

    /**
     * Broadcasts a number over radio to any connected micro:bit in the group.
     */
    //% help=radio/send-number
    //% weight=60
    //% blockId=radio_datagram_send block="radio send number %value" blockGap=8
    void sendNumber(int value) {
        if (radioEnable() != MICROBIT_OK) return;
        uint32_t t = system_timer_current_time();
        uint32_t sn = transmitSerialNumber ? microbit_serial_number() : 0;
        uint32_t buf[] = { (uint32_t)value, t, sn };
        uBit.radio.datagram.send((uint8_t*)buf, 3*sizeof(uint32_t));
    }

    /**
    * Broadcasts a name / value pair along with the device serial number
    * and running time to any connected micro:bit in the group.
    * @param name the field name (max 12 characters), eg: "data"
    * @param value the numberic value
    */
    //% help=radio/send-value
    //% weight=59
    //% blockId=radio_datagram_send_value block="radio send|value %name|= %value" blockGap=8
    void sendValue(StringData* name, int value) {
        if (radioEnable() != MICROBIT_OK) return;

        ManagedString n(name);
        uint32_t t = system_timer_current_time();
        uint32_t sn = transmitSerialNumber ? microbit_serial_number() : 0;
        uint8_t buf[32];
        uint32_t* buf32 = (uint32_t*)buf;
        memset(buf, 0, 32);
        buf32[0] = value;                      // 4 bytes: value
        buf32[1] = t; // 4 bytes: running time
        buf32[2] = sn; // 4 bytes: serial number
        uint8_t len = min(MAX_FIELD_NAME_LENGTH, n.length());          // 1 byte: string length
        if (len > 0) {
            buf[12] = len;                          //
            memcpy(buf + 13, n.toCharArray(), len); // 13-25: field name
        }
        uBit.radio.datagram.send(buf, 13 + len);
    }

    /**
     * Broadcasts a number over radio to any connected micro:bit in the group.
     */
    //% help=radio/send-string
    //% weight=58
    //% blockId=radio_datagram_send_string block="radio send string %msg"
    void sendString(StringData* msg) {
        if (radioEnable() != MICROBIT_OK) return;

        ManagedString s(msg);
        if (s.length() > MICROBIT_RADIO_MAX_PACKET_SIZE)
            s = s.substring(0, MICROBIT_RADIO_MAX_PACKET_SIZE);

        uBit.radio.datagram.send(s);
    }

    /**
    * Reads a value sent with `stream value` and writes it
    * to the serial stream as JSON
    */
    //% help=radio/write-value-to-serial
    //% weight=3
    //% blockId=radio_write_value_serial block="radio write value to serial"
    //% advanced=true
    void writeValueToSerial() {
        if (radioEnable() != MICROBIT_OK) return;
        PacketBuffer p = uBit.radio.datagram.recv();
        int length = p.length();
        uint8_t* bytes = p.getBytes();
        int value;

        uBit.serial.send("{");
        if (length >= 4) {
            memcpy(&value, bytes, 4);
            uBit.serial.send("\"v\":"); uBit.serial.send(value);
            if(length >= 8) {
                memcpy(&value, bytes + 4, 4);
                uBit.serial.send(",\"t\":"); uBit.serial.send(value);
                if (length >= 12) {
                    memcpy(&value, bytes + 8, 4);
                    uBit.serial.send(",\"s\":"); uBit.serial.send(value);
                    if (length >= 13) {
                        char name[MAX_FIELD_NAME_LENGTH+1];
                        uint8_t len = min(MAX_FIELD_NAME_LENGTH, bytes[12]);
                        memcpy(name, bytes + 13, len);
                        name[len] = 0;
                        uBit.serial.send(",\"n\":\""); uBit.serial.send(name); uBit.serial.send("\"");
                    }
                }
            }
        }
        uBit.serial.send("}\r\n");
    }


    /**
     * Reads a number at a given index, between ``0`` and ``3``, from the packet received by ``receive number``. Not supported in simulator.
     * @param index index of the number to read from 0 to 3. 1 eg
     */
    //% help=radio/received-number-at
    //% weight=45 debug=true
    int receivedNumberAt(int index) {
        if (radioEnable() != MICROBIT_OK) return 0;
        if (0 <= index && index < packet.length() / 4) {
            // packet.getBytes() is not aligned
            int r;
            memcpy(&r, packet.getBytes() + index * 4, 4);
            return r;
        }
        return 0;
    }

    /**
     * Reads a string received in a packet received by ``receive number``. Not supported in simulator.
     */
    //% help=radio/received-value-name
    //% weight=45 debug=true
    StringData* receivedValueName() {
        if (packet.length() > 12) {
            uint8_t* bytes = packet.getBytes();
            uint8_t len = min(MAX_FIELD_NAME_LENGTH, bytes[12]);
            if (len) {
                char name[MAX_FIELD_NAME_LENGTH+1];
                memcpy(name, bytes + 13, len);
                name[len] = 0;
                return ManagedString(name).leakData();
            }
        }
        return ManagedString().leakData();
    }

    /**
     * Reads the next packet as a number from the radio queue.
     */
    //% help=radio/receive-number
    //% weight=46
    //% blockId=radio_datagram_receive block="radio receive number" blockGap=8
    //% advanced=true
    int receiveNumber()
    {
        if (radioEnable() != MICROBIT_OK) return 0;
        packet = uBit.radio.datagram.recv();
        return receivedNumberAt(0);
    }

    /**
     * Registers code to run when a packet is received over radio.
     */
    //% help=radio/on-data-received
    //% weight=50
    //% blockId=radio_datagram_received_event block="radio on data received" blockGap=8
    void onDataReceived(Action body) {
        if (radioEnable() != MICROBIT_OK) return;
        registerWithDal(MICROBIT_ID_RADIO, MICROBIT_RADIO_EVT_DATAGRAM, body);
        // make the the receive buffer has a free spot
        receiveNumber();
    }


    /**
    * Reads the next packet as a string and returns it.
    */
    //% blockId=radio_datagram_receive_string block="radio receive string" blockGap=8
    //% weight=44
    //% help=radio/receive-string
    StringData* receiveString() {
        if (radioEnable() != MICROBIT_OK) return ManagedString().leakData();
        packet = uBit.radio.datagram.recv();
        return ManagedString(packet).leakData();
    }

    /**
     * Gets the received signal strength indicator (RSSI) from the packet received by ``receive number``. Not supported in simulator.
     * namespace=radio
     */
    //% help=radio/received-signal-strength
    //% weight=40
    //% blockId=radio_datagram_rssi block="radio received signal strength"
    //% advanced=true
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
}
