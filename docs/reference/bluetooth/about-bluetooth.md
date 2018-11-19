# About Bluetooth

![](/static/bluetooth/Bluetooth_SIG.png)

## Introduction

Bluetooth is a wireless communications technology which allows devices to communicate with each other without the need for a central device like a router or access point.

Bluetooth has a special "low energy feature" which means it can be used without requiring much power from the devices using it. It's the Bluetooth low energy feature which the @boardname@ uses.

In the world of Bluetooth low energy, a device has something called a "profile" which defines the way other devices are able to communicate over Bluetooth with it. In a way, the Bluetooth profile defines the way a device appears to other devices in terms of its features and the things it can do.

To put it another way, a Bluetooth profile is really an interface specification. It defines the data which a device has, what another device can do with that data over a Bluetooth connection and how the device with the profile should respond when a connected device acts upon its data in some way. Let's look at that description in a little more technical detail.

## Basic Concepts

A Bluetooth device contains a table of data called an Attribute Table which can be accessed by other connected devices in various possible ways. That table of data and the ways in which it can be exploited falls into a technical area of Bluetooth called the Generic Attribute profile or "GATT" for short and you may see the term GATT in some of the documentation for APIs such as those provided by the Android platform.

The Attribute Table contains something like a series of records of various types. The main types are called Services, Characteristics and Descriptors. Let's look at each of these terms in turn.

## Attributes

Services, Characteristics and Descriptors are all types of Attribute. Hence Generic Attribute Profile, Attribute Table and something called the Attribute Protocol. All attributes have a type which is identified by a UUID (Universally Unique Identifer). Some Attributes are defined by the Bluetooth SIG, the technical standards body for Bluetooth and these have UUIDs which are 16 bits in length. Some Attributes are custom designed for a particular device by the product team and these have 128 bit UUIDs. The @boardname@ uses a mixture of 16 bit and 128 bit UUIDs.

## Structure

Services, Characteristics and Descriptors are organised in a hierarchy with Services at the top and Descriptors at the bottom. Services contain one or more Characteristics. A Characteristic owns zero or more Descriptors. Zero because Descriptors are completely optional whereas a Service must contain at least one Characteristic.

![](/static/bluetooth/gatt_hierarchy.png)
  
## Services

A Service is a container for logically related Bluetooth data items. Those data items are in fact called Characteristics. A Service can be thought of as the owner of the Characteristics inside it. Often a Service represents a particular feature (e.g. a hardware feature) of a device like the buttons or a particular sensor. An example of a Bluetooth SIG defined Service is the Device Information Service which, as the name suggests, is a container for various items of information about the device such as its manufacturer and serial number. The @boardname@ has this service.

## Characteristics

Characteristics are items of data which relate to a particular internal state of the device or perhaps some state of the environment which the device can measure using a sensor. The current battery level is an example of internal state data whereas the ambient temperature could perhaps be measured by a sensor. Sometimes Characteristics represent configuration data such as the frequency at which you want something to be measured. In any of these cases, the way a device can expose such data to other devices to use via Bluetooth is by making them available as a Characteristic. An example of a Bluetooth SIG defined Characteristic is the Serial Number String which you'll find inside the Device Information service.

Characteristics contain various parts. They have a type, a value, some properties and some permissions.

Type is something already explained above, a UUID value which indicates which particular type of Characteristic an Attribute is. Value is the value of the associated state data item.

Properties define what another device can do with the characteristic over Bluetooth in terms of various defined operations such as READ, WRITE or NOTIFY. Reading a characteristic means transferring its current value from the attribute table to the connected device over Bluetooth. Writing allows the connected device to change that value in the state table. Notifications are a special message type which a device like the @boardname@ can send to a connected device whenever the value of the associated characteristic changes or perhaps periodically, controlled by a timer. Not all Characteristics support all operations. The Characteristic's properties tell you which operations are supported.

Sometimes the device will have been programmed to respond in a special way when it processes an operation like reading or writing a value from the attribute table so operations can result in more happening than simply transferring data across the connection. Perhaps changing the value of a Characteristic will result in the device changing the frequency with which it samples readings from the device accelerometer for example.

Permissions are to do with security and further describe the security conditions that must be met before read or write access to the characteristic is to be granted.

## Descriptors

Descriptors contain meta data which either augments the details relating to the Characteristic which the Descriptor belongs to or allows the configuration of a behaviour involving that Characteristic. Notification messages are switched on or off using a special descriptor called the Client Characteristic Configuration Descriptor for example.

## Profile

A Bluetooth profile is a specification which pulls together all the required information about how a device behaves, how it can be accessed in terms of its services, characteristics and descriptors, security rules, concurrency limitations and so on.

## Client Server Architecture

When a smartphone application interacts with a device like the @boardname@ over a Bluetooth connection we have a client/server architecture. The phone application is usually the GATT client and the @boardname@ is usually the GATT server. They communicate using a protocol called the Attribute Protocol or just ATT for short. As a smartphone developer you work with APIs and do not have to worry about formulating ATT protocol data units and so on.

![](/static/bluetooth/services_and_GATT.png)

## Device Discovery

Everything described above relates to devices which are connected and communicating as GATT client and server. But there's a stage which precedes this where the two devices are not yet connected. How do they find each other and connect? The answer to this question is termed 'Device Discovery' and is the responsibility of another part of the Bluetooth architecture called the Generic Access Profile (GAP).

In GAP, one devices advertises, emitting small packets of data periodically. These packets contain information about the device doing the advertising. Other devices looking for devices to connect to perform something called scanning, receiving and processing advertising packets and filtering out those that come from devices of a type that are not of interest. Usually the user is given information about devices which are discovered and they then select one to be connected to. The device which advertises is called a Bluetooth Peripheral whereas the one doing the scanning is a Bluetooth Central device. @boardname@ is a Bluetooth peripheral.

Bluetooth on the @boardname@

Full documentation for the @boardname@ Bluetooth profile as used by this application can be found at the [Lancaster University documentation](http://lancaster-university.github.io/microbit-docs/ble/profile/) web site.

The @boardname@'s accelerometer (motion detector), magnetometer (digital compass), two buttons on the front, LED Display, IO pins on the edge connector, internal message bus and internal temperature sensor are all exposed as Services so that applications can exploit these features of the device. In addition: 

* the Bluetooth SIG defined Device Information Service is included to allow applications to obtain information such as firmware version details over Bluetooth
* there's a Device Firmware Update (DFU) service which allows new @boardname@ code to be flashed to the device over Bluetooth instead of over USB
* there's a UART service which allows arbitrary data to be exchanged with the @boardname@ in a way resembling traditional serial communications.

Everything you can do with the @boardname@ over Bluetooth is achieved through read, write and notify operations. Not all characteristics support all three so check the profile documentation. Often there are Characteristics whose purpose is to allow you to write configuration values which control other behaviours. Technically these are called Control Points. For example you can specify the frequency with which accelerometer data is sampled before it is transmitted as a Notification message to your application.

## Want to Know More?

The Bluetooth SIG web site at http://www.bluetooth.com is a good place for further information about Bluetooth in general. You'll find all the SIG defined profiles, services, characteristics and descriptors there as well as the core specification for all Bluetooth technology.

That's it! Enjoy using Bluetooth on the @boardname@!

Martin Woolley, Bluetooth SIG. Twitter: @bluetooth_mdw

### Video
https://www.youtube.com/watch?v=aep_GVowKfs


## See also

[About Bluetooth](/reference/bluetooth/about-bluetooth), [@boardname@ Bluetooth profile overview ](http://lancaster-university.github.io/microbit-docs/ble/profile/), [@boardname@ Bluetooth profile reference](http://lancaster-university.github.io/microbit-docs/resources/bluetooth/microbit-profile-V1.9-Level-2.pdf),  [Bluetooth on @boardname@ resources](http://bluetooth-mdw.blogspot.co.uk/p/bbc-microbit.html), [Bluetooth SIG](https://www.bluetooth.com)

```package
bluetooth
```
