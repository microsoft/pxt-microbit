# WebUSB

[WebUSB](https://wicg.github.io/webusb/) is a recent and developing web standard that allows you to access @boardname@ directly from a web page. It allows for a **one-click download** without installing any additional app or software! It also lets you receive data into the web page from the @boardname@.

## Support

* Chrome (version 79 and newer) browser for Android, Chrome OS, Linux, macOS and Windows 10.
* Microsoft Edge (version 79  and newer) browser for Android, Chrome OS, Linux, macOS and Windows 10.

## Prepare your @boardname@

Make sure that your @boardname@ is running version **0249** or above of the firmware. Upgrading is as easy as dragging a file and it takes a few seconds to get it done.

* [Check out the instructions to check and upgrade your @boardname@.](/device/usb/webusb/troubleshoot)

## Pair your @boardname@

Here are the steps on the supported browsers:

* Connect your @boardname@ to your computer with the Micro USB cable
* Open a project
* Click the triple dot icon on the **Download** button and then click **Connect device**.

![Download button and menu](/static/mb/device/usb/download-button-menu.jpg)

* In the connection message window, click **Next**.

![Connect device dialog](/static/mb/device/usb/connect-usb.jpg)

* Another message window will display telling you which device you should pair with. Click **Next** to go to the device list.

![Device name dialog](/static/mb/device/usb/pair-dap.jpg)

* Select **BBC micro:bit CMSIS-DAP** or **DAPLink CMSIS-DAP** from the list and click **Connect**.

![Device list for WebUSB pairing](/static/mb/device/usb/pair-device.jpg)

If you don't see any devices in the list and @boardname@ has the right firmware (**0249** or above), you can create a [support ticket](https://support.microbit.org/support/tickets/new) to notify the Micro:bit Foundation of the problem. Skip the rest of these steps.

![Device list for WebUSB pairing](/static/mb/device/usb/no-pair.jpg)

* When your @boardname@ is connected, you'll see the **Connected to micro:bit** message window. Click on **Done** and you're ready to go! 

![Connected message window](/static/mb/device/usb/connected.jpg)

* If the connection to your @boardname@ was unsuccessful, you'll see the **Connect failed** message. You can press **Try Again** to attempt the connection again or cancel the window and [troubleshoot](/device/usb/webusb/troubleshoot) your connection.

![Connect failed message window](/static/mb/device/usb/connect-fail.jpg)

## Unpair your @boardname@ #unpair

You will need to unpair your device from the editor to disable WebUSB.

* Click on the **lock** icon in the address bar
* Uncheck each **BBC micro:bit CMSIS-DAP** or **DAPLink CMSIS-DAP** device
* Reload the page

![Unpairing from the browser](/static/webusb/unpair.gif)

## One-click Download

Once your @boardname@ is paired, MakeCode will use WebUSB to transfer the code without having to drag and drop. Happy coding!

## Console output

MakeCode will be able to "listen" to your @boardname@ and display the console output.
