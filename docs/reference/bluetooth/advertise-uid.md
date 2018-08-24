# Advertise UID

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
bluetooth.advertiseUid(42, 1, 7, true);
```

## Parameters

* ``namespace`` last 4 bytes of the namespace uid (6 to 9)
* ``instance`` last 4 bytes of the instance (2 to 5)
* ``power`` - a [number](/types/number) representing the power level between 0 (short) and 7 (maximum range).
* ``connectable`` - a [boolean](/blocks/logic/boolean) indicating whether or not the @boardname@ should accept connections. 

## Encoding

The bytes of ``namespace`` and ``instance`` are encoded to generate the 10 bytes UID namespace and 6 bytes UID instance.

```
UID namespace: [0, ..., namespace]
UID instance: [0, ..., instance]
```

## See Also

[stop-advertising](/reference/bluetooth/stop-advertising), [advertise-uid-buffer](/reference/bluetooth/advertise-uid-buffer)

```package
bluetooth
```
