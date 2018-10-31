# Bluetooth HF2

The Bluetooth HF2 service implements a subset of [HF2](https://github.com/Microsoft/uf2/blob/master/hf2.md), namely the serial message logging.

## Service

### HF2 service 

 * UUID:  ``b112f5e6-2679-30da-a26e-0273b6043849``

### TX Characteristic

* Optional
* UUDI: ``b112f5e6-2679-30da-a26e-0273b604384a``
* NOTIFY only

This characteristic mostly emits HF2 serial messages. The first byte contains the type of message and length in the lower 6 bits. The message contains up to 19 bytes.

This service is supported by the MakeCode editor to receive messages.