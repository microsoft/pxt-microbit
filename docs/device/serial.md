# Serial

The [serial](/reference/serial) supports [serial communication](https://en.wikipedia.org/wiki/Serial_port) between the BBC micro:bit and another computer. Basically, this allows you to send data from the micro:bit to your own computer. This is very useful for debugging purposes: you can add `write line` statements in your code and see them display on your computer as the program executes.

The code below shows a simple script that sends a line when the BBC micro:bit starts and another line each time the button ``A`` is pressed.

```blocks
serial.writeLine("started...")
input.onButtonPressed(Button.A, () => {
    serial.writeLine("A pressed")
})
```

Data is also automatically streamed to serial by the ** bar graph** block
and picked up by the editor. This data can be streamed to the cloud as well.

```blocks
basic.forever(() => {
   led.plotBarGraph(input.acceleration(Dimension.X), 0);
});
```

## How to read the micro:bit's serial output from your computer

Unfortunately, using the serial library requires quite a bit of a setup.

### ~ hint

**Windows earlier than 10**

If you are running a Windows version earlier than 10, you must [install a device driver](https://os.mbed.com/docs/latest/tutorials/windows-serial-driver.html) (for the computer to recognize the serial interface of the micro:bit).

## ~
Also, if you don't see the serial port as one of your computer's devices, you might need to [update the firmware](/device/firmware) on the @boardname@. Find the device name for the attached serial port in the following instructions for your operating system.

### Windows > Tera Term

* Install the terminal emulator [Tera Term](https://ttssh2.osdn.jp/index.html.en). At the time of this writing, the latest version is 4.88 and can be downloaded [from here](http://en.osdn.jp/frs/redir.php?m=jaist&f=%2Fttssh2%2F63767%2Fteraterm-4.88.exe). Follow the instructions from the installer.

Once both the driver and the terminal emulator are installed, plug in the micro:bit and wait until the device is fully setup. Then, open TeraTerm.

* Hit `File` > `New Connection`
* Check "Serial"; in the dropdown menu, pick the COM port that says "mbed Serial Port". Hit `Ok`.
* In the menus, hit `Setup` > `Serial Port` and set the baud rate to `115200`.

You should be good. Feel free to hit `Setup` > `Save Setup` in the menus to erase the default configuration file with a new one so that you don't have to type in the settings again.

Please note that Windows will assign you a different COM port if you plug in another micro:bit. If you're juggling between micro:bits, you'll have to change the COM port every time.

### Windows > Putty

If you prefer another terminal emulator (such as [PuTTY](http://www.putty.org/)), here are some instructions.

* Open Windows's [Device Manager](https://windows.microsoft.com/en-us/windows/open-device-manager); expand the section called "Ports (COM & LPT)"; write down the com number for "mbed Serial Port" (e.g. COM14)
* Open PuTTY; on the main screen, use the following settings: Serial / COM14 / 115200. Replace COM14 with the COM port number you wrote down previously. Feel free to type in a name and hit "Save" to remember this configuration.

![](/static/mb/serial-library-0.png)

* (optional): in the "Terminal" section, check "implicit cr in every lf"

![](/static/mb/serial-library-1.png)

## Linux

* Install the program `screen` if it is not already installed.
* Plug in the micro:bit.
* Open a terminal.
* Find which device node the micro:bit was assigned to with the command `ls /dev/ttyACM*`.
* If it was `/dev/ttyACM0`, type the command `screen /dev/ttyACM0 115200`. If it was some other device node,
  use that one in the command instead. **Note:** You may need root access to run `screen`
  successfully. You can probably use the command `sudo` like this: `sudo screen /dev/ttyACM0 115200`.
* To exit `screen`, type `Ctrl-A` `Ctrl-D`.

Alternative programs include `minicom` and so on.

## Mac OS

* Plug in the micro:bit
* Open a terminal
* `ls /dev/cu.*` will return to you a list of serial devices; one of them will look like `/dev/cu.usbmodem1422` (the exact number depends on your computer)
* `screen /dev/cu.usbmodem1422 115200` will open up the micro:bit's serial output. To exit, hit `Ctrl-A` `Ctrl-D`.
