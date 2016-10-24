# Uploading from Edge on Windows

How to compile, transfer, and run a program on your micro:bit on **Microsoft Edge**.

While you're writing and testing your programs, you'll mostly be [running them
in the simulator](/device/simulator), but once you've finished your program you
can **compile** it and run it on your micro:bit.

The basic steps are:

1. Connect your micro:bit to your computer via USB
2. Click **Download** and download the `.hex` file
3. Copy the `.hex` file from your computer onto the micro:bit drive

### ~hint

You can use the [micro:bit uploader](/uploader) to automatically deploy ``.hex`` files to your micro:bit!
![](/static/uploader/tooltip.png)

### ~

## Requirements

You need the following things to transfer and run a script on your micro:bit:

* A-Male to Micro USB cable to connect your computer to your micro:bit. This is
    the same cable that is commonly used to connect a smart phone to a computer.
* A PC running Windows 7 or later, or a Mac running OS X 10.6 or later

## Step 1: Connect your micro:bit to your computer

First, connect the micro:bit:

1. Connect the small end of the USB cable to the micro USB port on your micro:bit.

2. Connect the other end of the USB cable to a USB port on your computer.

Your computer should recognise your micro:bit as a new drive. On computers
running Windows, `MICROBIT` appears as a drive under Devices and drives. On a Mac
it appears as a new drive under Devices.

![](/static/mb/device/usb-windows-device.jpg)

## Step 2: Download your program

1. Open your project on [pxt.microbit.org](https://pxt.microbit.org)
2. Click **Download**
3. When prompted, choose to **save** the compiled file onto your computer. The
   prompt will be different depending on which browser you are using, or
   whether you are using a Windows computer or a Mac

A message will appear at the bottom of the browser asking what you want to do
with the file. Click **Save**:

![](/static/mb/device/usb-windows-edge-1.png)

Then click **Open folder** and drag and drop the file from your Downloads to
your `MICROBIT` drive.

![](/static/mb/device/usb-windows-edge-2.png)

## Step 3: Transfer the file to your micro:bit

* Once you've found the folder containing your `.hex` file, drag and drop it
    onto your `MICROBIT` drive
* If you're using Windows, you can use **Send to** as described below 
* The LED on the back of your micro:bit flashes during the transfer (which 
    should only take a few seconds).
* Once transferred, the code will run automatically on your micro:bit. To rerun
   your program, press the reset button on the back of your micro:bit. The reset 
   button automatically runs the newest file on the micro:bit.

In File Explorer, right-click on the hex file (created in Step 2 above), choose **Send to**, and then **MICROBIT**.

![](/static/mb/device/usb-windows-sendto.jpg)

By copying the script onto the `MICROBIT` drive, you have programmed it into the
flash memory on the micro:bit, which means even after you unplug the micro:bit,
your program will still run if the micro:bit is powered by battery.

If you want to save time, you can use the [micro:bit uploader](/uploader) to
automatically deploy hex files to your micro:bit. It works on Windows and is
compatible with any browser.

### ~hint

Transfer not working? See some [troubleshooting tips](/device/usb/troubleshooting).

### ~
