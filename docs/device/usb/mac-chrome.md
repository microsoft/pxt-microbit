# Uploading from Chrome for Mac

While you're writing and testing your programs, you'll mostly be [running them
in the simulator](/device/simulator), but once you've finished your program you
can **compile** it and run it on your micro:bit.

The basic steps are:

1. Connect your micro:bit to your computer via USB
2. Click **Download** and download the `.hex` file
3. Copy the `.hex` file from your computer onto the micro:bit drive

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

![](/static/mb/device/usb-osx-device.png)

## Step 2: Download your program

1. Open your project on @homeurl@
2. Click **Download**
3. When prompted, choose to **save** the compiled file onto your computer. The
   prompt will be different depending on which browser you are using, or
   whether you are using a Windows computer or a Mac

When you select **Download** in Chrome, the file will appear at the bottom of
the browser. Click on the small arrow and select **Show in Finder**. This will
show the file in your download folder. Drag and drop the file onto your
`MICROBIT` drive.

![](/static/mb/device/usb-osx-chrome.png)

## Step 3: Transfer the file to your micro:bit

* Once you've found the folder containing your `.hex` file, drag and drop it
    onto your `MICROBIT` drive
* The LED on the back of your micro:bit flashes during the transfer (which 
    should only take a few seconds).
* Once transferred, the code will run automatically on your micro:bit. To rerun
   your program, press the reset button on the back of your micro:bit. The reset 
   button automatically runs the newest file on the micro:bit.

By copying the script onto the `MICROBIT` drive, you have programmed it into the
flash memory on the micro:bit, which means even after you unplug the micro:bit,
your program will still run if the micro:bit is powered by battery.


## ~hint

Transfer not working? See some [troubleshooting tips](/device/usb/troubleshoot).

## ~
