#include "pxt.h"

using namespace pxt;

//% color=#E3008C weight=96 icon="\uf012"
namespace radio {

    bool radioEnabled = false;

    int radioEnable() {
        int r = uBit.radio.enable();
        if (r != MICROBIT_OK) {
            uBit.panic(43);
            return r;
        }
        if (!radioEnabled) {
            uBit.radio.setGroup(pxt::programHash());
            uBit.radio.setTransmitPower(6); // start with high power by default
            radioEnabled = true;
        }
        return r;
    }

    /**
    * Sends an event over radio to neigboring devices
    */
    //% blockId=radioRaiseEvent block="radio raise event|from source %src=control_event_source_id|with value %value=control_event_value_id"
    //% blockExternalInputs=1
    //% advanced=true
    //% weight=1
    //% help=radio/raise-event
    void raiseEvent(int src, int value) {
        if (radioEnable() != MICROBIT_OK) return;

        uBit.radio.event.eventReceived(MicroBitEvent(src, value, CREATE_ONLY));
    }

    /**
     * Internal use only. Takes the next packet from the radio queue and returns its contents + RSSI in a Buffer
     */
    //%
    Buffer readRawPacket() {
        if (radioEnable() != MICROBIT_OK) return mkBuffer(NULL, 0);

        PacketBuffer p = uBit.radio.datagram.recv();
        if (p == PacketBuffer::EmptyPacket)
            return mkBuffer(NULL, 0);

        int rssi = p.getRSSI();
        uint8_t buf[MICROBIT_RADIO_MAX_PACKET_SIZE + sizeof(int)]; // packet length + rssi
        memset(buf, 0, sizeof(buf));
        memcpy(buf, p.getBytes(), p.length()); // data
        memcpy(buf + MICROBIT_RADIO_MAX_PACKET_SIZE, &rssi, sizeof(int)); // RSSi - assumes Int32LE layout
        return mkBuffer(buf, sizeof(buf));
    }

    /**
     * Internal use only. Sends a raw packet through the radio (assumes RSSI appened to packet)
     */
    //% async
    void sendRawPacket(Buffer msg) {
        if (radioEnable() != MICROBIT_OK || NULL == msg) return;

        // don't send RSSI data; and make sure no buffer underflow
        int len = msg->length - sizeof(int);
        if (len > 0)
            uBit.radio.datagram.send(msg->data, len);
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
        uBit.radio.datagram.recv(); // wake up read code
    }

    /**
     * Sets the group id for radio communications. A micro:bit can only listen to one group ID at any time.
     * @param id the group id between ``0`` and ``255``, eg: 1
     */
    //% help=radio/set-group
    //% weight=100
    //% blockId=radio_set_group block="radio set group %ID"
    //% id.min=0 id.max=255
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
    //% power.min=0 power.max=7
    //% advanced=true
    void setTransmitPower(int power) {
        if (radioEnable() != MICROBIT_OK) return;

        uBit.radio.setTransmitPower(power);
    }

    /**
    * Change the transmission and reception band of the radio to the given channel
    * @param band a frequency band in the range 0 - 83. Each step is 1MHz wide, based at 2400MHz.
    **/
    //% help=radio/set-frequency-band
    //% weight=8 blockGap=8
    //% blockId=radio_set_frequency_band block="radio set frequency band %band"
    //% band.min=0 band.max=83
    //% advanced=true
    void setFrequencyBand(int band) {
        if (radioEnable() != MICROBIT_OK) return;
        uBit.radio.setFrequencyBand(band);
    }
}
