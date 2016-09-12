# Running programs on your micro:bit

How to compile, transfer, and run a program on your micro:bit.

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

**Windows**

![](/static/mb/device/usb-windows-device.jpg)

**Mac**

![](/static/mb/device/usb-osx-device.png)

## Step 2: Download your program

1. Open your project on [codethemicrobit.com](https://codethemicrobit.com)
2. Click **Download**
3. When prompted, choose to **save** the compiled file onto your computer. The
   prompt will be different depending on which browser you are using, or
   whether you are using a Windows computer or a Mac

### Windows

#### Chrome

Your `.hex` file appears as a download at the bottom of the browser. Click on
the arrow next to the name of the file and then click **Show in folder**.

![](/static/mb/device/usb-windows-chrome.png)

Drag and drop the `.hex` file from the download folder onto the `MICROBIT` drive.

#### Firefox

A window will appear asking whether you want to save or open the `.hex` file.
Select **Save File** and then select **OK**.

![](/static/mb/device/usb-windows-firefox-1.png)

The file will then appear in your downloads in the top right of your browser.
Click the **folder icon** next to the filename to open it in Windows Explorer.

![](/static/mb/device/usb-windows-firefox-2.png)

Drag and drop the `.hex` file from the download folder onto the `MICROBIT` drive.

#### Microsoft Edge

A message will appear at the bottom of the browser asking what you want to do
with the file. Click **Save**:

![](/static/mb/device/usb-windows-edge-1.png)

Then click **Open folder** and drag and drop the file from your Downloads to
your `MICROBIT` drive.

![](/static/mb/device/usb-windows-edge-2.png)

#### Internet Explorer

A message will appear at the bottom of the browser asking what you want to do
with the file. Click **Save**:

![](/static/mb/device/usb-windows-ie11-1.png)

Then click **Open folder** and drag and drop the file from your Downloads to
your `MICROBIT` drive.

![](/static/mb/device/usb-windows-ie11-2.png)

### Mac

#### Safari

When you select **Download** in Safari a file called `Unknown` will be
downloaded into your Downloads folder. Open your Downloads folder and drag and
drop the file onto your `MICROBIT` drive, under Devices:

![](/static/mb/device/usb-osx-dnd.png)

#### Firefox

A dialogue box will appear, asking whether you would like to open or save your
hex file. Select **Save file** and click **OK** and the file will then appear in
your downloads in the top right of your browser. Right click on the file and
click on **Show in Finder** and the file will appear in your downloads folder.
Select the file and drag and drop it onto your `MICROBIT` drive.

![](/static/mb/device/usb-osx-firefox-1.png)

![](/static/mb/device/usb-osx-firefox-2.png)

#### Chrome

When you select **Download** in Chrome, the file will appear at the bottom of
the browser. Click on the small arrow and select **Show in Finder**. This will
show the file in your download folder. Drag and drop the file onto your
`MICROBIT` drive.

![](/static/mb/device/usb-osx-chrome.png)

## Step 3: Transfer the file to your micro:bit

* Once you've found the folder containing your `.hex` file, drag and drop it
    onto your `MICROBIT` drive
* If you're using Windows, you can use **Send to** as described below 
* The LED on the back of your micro:bit flashes during the transfer (which 
    should only take a few seconds).
* Once transferred, the code will run automatically on your micro:bit. To rerun
   your program, press the reset button on the back of your micro:bit. The reset 
   button automatically runs the newest file on the micro:bit.

**Send to**: If you're using Windows you use *Send to* in File Explorer:

- In File Explorer, right-click on the hex file (created in Step 2 above), choose **Send to**, and then **MICROBIT**.

![](/static/mb/device/usb-windows-sendto.jpg)

By copying the script onto the `MICROBIT` drive, you have programmed it into the
flash memory on the micro:bit, which means even after you unplug the micro:bit,
your program will still run if the micro:bit is powered by battery.

If you want to save time, you can use the [micro:bit uploader](/uploader) to
automatically deploy hex files to your micro:bit. It works on Windows and is
compatible with any browser.

## Troubleshooting

You can’t drag and drop more than one hex file at once onto your micro:bit. If
you try to drag and drop a second hex file onto your micro:bit  before the first
file has finished downloading, then the second file may fail in different ways.

When the first program has been written to the micro:bit, the drive will
disengage. If you drag and drop a second file at this point it may not find the
drive and the second write will fail.

The errors may look like this:

**Windows**

![](/static/mb/device/usb-windows-copy-file-error.jpg)

**Mac**

![](/static/mb/device/usb-osx-copy-file-error.png)

Or it may appear that there are two hex files on your micro:bit so the micro:bit
won’t be able to run multiple files. To rectify this, unplug your micro:bit and
plug it in again. Make sure that your micro:bit  appears as `MICROBIT` and not
`MAINTENANCE`.

### See also

[Run code in a browser](/device/simulator)

