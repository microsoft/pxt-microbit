# Advertise Url

Advertises a URL via the Eddystone protocol over Bluetooth.

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
bluetooth.advertiseUrl("https://makecode.microbit.org/", 7, true);
```

## Parameters

* ``url`` - a [string](/types/string) containing the URL to broadcast, at most 17 characters long, excluding the protocol (eg: ``https://``) which gets encoded as 1 byte.
* ``power`` - a [number](/types/number) representing the power level between 0 (short) and 7 (maximum range).
* ``connectable`` - a [boolean](/blocks/logic/boolean) indicating whether or not the @boardname@ should accept connections. 

## Example: Broadcast a secret code

```blocks
bluetooth.advertiseUrl("https://pxt.io?secret=42", 7, true);
```

## See Also

[stop-advertising](/reference/bluetooth/stop-advertising), [advertise-uid](/reference/bluetooth/advertise-uid)

```package
bluetooth
```
