# Serial Library

The serial library #docs

The **serial library** supports [serial communication](https://en.wikipedia.org/wiki/Serial_port) between the @boardname@ and another computer. Basically, this allows you to send data from the @boardname@ to your own computer. This is very useful for debugging purposes: you can add `write line` statements in your code and see them display on your computer as the program executes.

The code below shows a simple script that sends a line when the @boardname@ starts and another line each time the button ``A`` is pressed.

```
serial.writeLine("started...")
input.onButtonPressed(Button.A, () => {
    serial.writeLine("A pressed")
})
```

## How to read the @boardname@'s serial output from your computer

Unfortunately, using the serial library requires quite a bit of a setup.

### Windows

You must install a device driver (for the computer to recognize the serial interface of the @boardname@); then, you must also install a terminal emulator (which is going to connect to the @boardname@ and read its output). Here's how to do it:

* Follow instructions at https://developer.mbed.org/handbook/Windows-serial-configuration in order to install the device driver
* Install a terminal emulator; we recommend [Tera Term](https://ttssh2.osdn.jp/index.html.en). At the time of this writing, the latest version is 4.88 and can be downloaded [from here](http://en.osdn.jp/frs/redir.php?m=jaist&f=%2Fttssh2%2F63767%2Fteraterm-4.88.exe). Follow the instructions from the installer.

Once both the driver and the terminal emulator are installed, plug in the @boardname@ and wait until the device is fully setup. Then, open TeraTerm.

* Hit `File` > `New Connection`
* Check "Serial"; in the dropdown menu, pick the COM port that says "mbed Serial Port". Hit `Ok`.
* In the menus, hit `Setup` > `Serial Port` and set the baud rate to `115200`.

You should be good. Feel free to hit `Setup` > `Save Setup` in the menus to erase the default configuration file with a new one so that you don't have to type in the settings again.

Please note that Windows will assign you a different COM port if you plug in another @boardname@. If you're juggling between @boardname@s, you'll have to change the COM port every time.

### Alternative Windows setup with Putty

If you prefer another terminal emulator (such as [PuTTY](http://www.putty.org/)), here are some instructions.

* Open Windows's [Device Manager](https://windows.microsoft.com/en-us/windows/open-device-manager); expand the section called "Ports (COM & LPT)"; write down the com number for "mbed Serial Port" (e.g. COM14)
* Open PuTTY; on the main screen, use the following settings: Serial / COM14 / 115200. Replace COM14 with the COM port number you wrote down previously. Feel free to type in a name and hit "Save" to remember this configuration.

![](/static/mb/serial-library-0.png)

* (optional): in the "Terminal" section, check "implicit cr in every lf"

![](/static/mb/serial-library-1.png)

### Linux

(Untested).

* Plug in the @boardname@
* Open a terminal
* `dmesg | tail` will show you which `/dev/` node the @boardname@ was assigned (e.g. `/dev/ttyUSB0`)
* Then, do: `screen /dev/ttyUSB0 115200` (install the `screen` program if you don't have it). To exit, run `Ctrl-A` `Ctrl-D`.

Alternative programs include minicom, etc.

### Mac OS

* Plug in the @boardname@
* Open a terminal
* `ls /dev/cu.*` will return to you a list of serial devices; one of them will look like `/dev/cu.usbmodem1422` (the exact number depends on your computer)
* `screen /dev/cu.usbmodem1422 115200` will open up the @boardname@'s serial output. To exit, hit `Ctrl-A` `Ctrl-D`.

## Using the serial library in your programs

If the ``serial`` button is not available, you will need first to add the ``@boardname@ serial`` library to your script:

* tap on `add new`
* tap on `library`
* select `@boardname@ serial`

### Writing data

This is basically what you will use the serial library for: debugging purposes.

* write a number

```
serial.writeNumber(42)
```

* write a string

```
serial.writeString("hello")
```

* write a line of text

```
serial.writeLine("this is a line")
```

Theoretically, you can dump more sophisticated data and then read it back in the event that two @boardname@s should be connected to each other over serial. We have not tested this scenario yet as we have yet to expose functionality that allows re-routing the serial ports to the edge connector.

* write an image

```
let img = images.createImage(`
. . . . .
. # . # .
. . . . .
. . . . .
# # # # #
`)
serial.writeImage(img)
```

* write the current screen LED status

```
serial.writeScreen()
```

### Reading data

This is useful if you have something connected at the other end. As explained above, this is not yet a scenario.

* reads a line of text

```
let msg = serial.readString()
```

