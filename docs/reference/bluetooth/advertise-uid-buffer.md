# Advertise UID Buffer

Advertises a UID via the Eddystone protocol over Bluetooth.

## ~hint

## Eddystone

Bluetooth beacons are used to indicate proximity to a place or object of interest. 
Beacons use Bluetooth advertising to broadcast a small amount of data, 
which can be received and acted upon by anyone in range with a suitable device and software, typically a smartphone and application.

There are various beacon message formats, which define the way Bluetooth advertising packets are used as containers for beacon data. 
iBeacon is Apple's beacon message format. Eddystone comes from Google.

Read more at https://lancaster-university.github.io/microbit-docs/ble/eddystone/ .

## ~

```sig
bluetooth.advertiseUidBuffer(pins.createBuffer(16), 7, true);
```

## Parameters

* ``buffer`` - a 16 bytes buffer containing the namespace (first 10 bytes) and instance (last 6 bytes).
* ``power`` - a [number](/types/number) representing the power level between 0 (short) and 7 (maximum range).
* ``connectable`` - a [boolean](/blocks/logic/boolean) indicating whether or not the @boardname@ should accept connections. 


## See Also

[stop-advertising](/reference/bluetooth/stop-advertising), [advertise-uid](/reference/bluetooth/advertise-uid)

```package
bluetooth
```
