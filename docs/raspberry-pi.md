# Raspberry Pi and Raspbian

It is possible to run the web editor or [command line interface](/cli) from Raspbian on Raspberry Pi 2 or 3.

## Web editor

The web editor requires to install IceWeasel (Firefox) as the built-in browser cannot handle it.

```
sudo apt-get install iceweasel
```

Once installed simply navigate to https://codethemicrobit.com or type

```
firefox https://codethemicrobit.com
``` 

## Command line

The PXT command line also works on Raspbian and allows to run a local server and/or edit programs from any text editor.

* Node.JS 6.0 needs installed

To install all the tools, 

```
curl -s https://raw.githubusercontent.com/Microsoft/pxt-rpi/master/install.sh | sh -
```