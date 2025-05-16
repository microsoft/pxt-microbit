# WebUSB

[WebUSB](https://wicg.github.io/webusb/) is a recent and developing web feature that allows you to access a @boardname@ directly from a web page. With MakeCode it allows for **one-click** downloads to your @boardname@ without installing an additional app or other software! It also lets you directly receive data into the MakeCode editor from the @boardname@.

https://youtu.be/PxfPs1zwKl0

### ~ reminder

#### WebUSB support for your @boardname@

If you're not using a current version of the Chrome or Microsoft Edge browsers, make sure they are this version or newer:

* Chrome (version 79 and newer) browser for Android, Chrome OS, Linux, macOS and Windows 10.
* Microsoft Edge (version 79  and newer) browser for Android, Chrome OS, Linux, macOS and Windows 10.

Also, if you have a [@boardname@ V1 board](https://support.microbit.org/support/solutions/articles/19000119162-how-to-identify-the-version-number-of-your-micro-bit), make sure that it is running version **0249** or above of the firmware. Upgrading is as easy as dragging a file to a folder and it takes a few seconds to get it done.

* Check out the [instructions](/device/usb/webusb/troubleshoot) to check and upgrade your @boardname@.

### ~

## Pair your @boardname@

The first time you pair your @boardname@ with your computer you'll need to go through a few easy steps to get setup. Here's how to get paired with WebUSB:

### Download your project

Once you've created or opened a project, and you're ready to download it to the @boardname@, click the **Download** button at the bottom of the editor window.

![Download button and menu](/static/mb/device/usb/download-button-menu.png)

### Connect the USB cable

If you haven't connected it already, connect your @boardname@ to your computer with a [micro-USB](https://support.microbit.org/support/solutions/articles/19000037633-what-type-of-usb-lead-do-i-need-for-the-micro-bit-) cable. Then, click **Next** in the message window.

![Connect device dialog](/static/mb/device/usb/connect-usb.png)

### Pair the @boardname@ with your computer

Another message window will display telling you to pair with the @boardname@ device. Click **Pair** to see to the device list.

![Device name dialog](/static/mb/device/usb/pair-device.png)

The @boardname@ will appear as either **BBC micro:bit CMSIS-DAP** or **DAPLink CMSIS-DAP** in the list. Select the device and click **Connect**.

![Device list for WebUSB pairing](/static/mb/device/usb/select-device-pair.png)

### ~ alert

#### Don't see your micro:bit device?

If you don't see any devices in the list and the @boardname@ is either a **V2** board or has the correct firmware version (**0249** or above), you can create a [support ticket](https://support.microbit.org/support/tickets/new) to notify the Micro:bit Foundation of the problem. You can skip the remaining steps.

![Device list for WebUSB pairing](/static/mb/device/usb/no-pair-device.png)

### ~

### You're connected!

When your @boardname@ is connected, you'll see the **Connected to micro:bit** message window. Click on **Download** and you're project will transfer directly to the @boardname@!

![Connected message window](/static/mb/device/usb/usb-connected.png)

### ~ alert

#### Connection failed?

If the connection to your @boardname@ was unsuccessful, you'll see the **Failed to connect** message. You can press **Try Again** to attempt the connection again, download the project as a file instead, or cancel the window and [troubleshoot](/device/usb/webusb/troubleshoot) your connection.

![Connect failed message window](/static/mb/device/usb/usb-connect-fail.png)

### ~

## One-click downloads

Once your @boardname@ is paired, MakeCode will use WebUSB to transfer the code directly and you won't have to drag and drop .hex files from a folder. Just click the **Download** button in the editor and your project code will just transfer to the @boardname@.

## Console output

Another feature of having a WebUSB connection is that MakeCode will be able to detect console output from your @boardname@ and display the console output in the editor.

## Unpair your @boardname@ #unpair

If you don't want to use WebUSB any longer, you will need to unpair your device from the editor to disable the WebUSB connection.

1. Click on the **lock** icon in the address bar of the browser.
2. Uncheck each **BBC micro:bit CMSIS-DAP** or **DAPLink CMSIS-DAP** device displayed in the device list.
3. Reload the MakeCode editor page.

![Unpairing from the browser](/static/download/browser-unpair-image.gif)
