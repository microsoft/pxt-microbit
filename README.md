# micro:bit target for PXT

This target allows you to program a [BBC micro:bit](https://microbit.org/) using 
PXT ([Microsoft Programming Experience Toolkit](https://github.com/Microsoft/pxt)).

* [Try it live](https://makecode.microbit.org)

[![Build Status](https://travis-ci.org/Microsoft/pxt-microbit.svg?branch=master)](https://travis-ci.org/Microsoft/pxt-microbit)

## Issue tracking

Please add an issue if you discover an (unreported) bug.

## Local server

The local server lets you to run the editor and serve the documentation from your own computer.

### Setup

The following commands perform a one-time setup after synching the repo on your machine.

* install node.js 8.9.4 or higher
* install the PXT command line (add ``sudo`` for Mac/Linux shells).
```
npm install -g pxt
```
* install the microbit target
```
pxt target microbit
```

### Running

Run this command to open a local web server (add ``sudo`` for Mac/Linux shells)
```
pxt serve
```

If the local server opens in the wrong browser, make sure to copy the URL containing the local token. 
Otherwise, the editor will not be able to load the projects.

The server assumes you have yotta installed. You can skip that requirement by adding ``--cloud``.

```
pxt serve --cloud
```

### Updates

To update your PXT version and make sure you're running the latest tools, run (add ``sudo`` for Mac/Linux shells):
```
pxt update
```

More instructions are at https://github.com/Microsoft/pxt#running-a-target-from-localhost

## Developer setup

If you need to make source changes to ``pxt`` and ``pxt-microbit``, follow these instructions:

* clone https://github.com/Microsoft/pxt
```
git clone https://github.com/Microsoft/pxt
```
* checkout the ``v0`` branch in pxt
```
cd pxt
git checkout v0
```
* ``npm install`` and run ``jake``
```
npm install
jake
```
* clone https://github.com/Microsoft/pxt-microbit
```
cd ..
git clone https://github.com/Microsoft/pxt-microbit
```
* ``npm install`` and link to the ``pxt`` folder
```
cd pxt-microbit
npm install
npm link ../pxt
```

Both of those repoes are now ready to go. To start your local server, run
```
pxt serve
```
or, without yotta tools,
```
pxt serve --cloud
```

## Repos 

The pxt-microbit target depends on several other repos. The main ones are:
- https://github.com/Microsoft/pxt, the PXT framework
- https://github.com/lancaster-university/microbit, basic wrapper around the DAL
- https://github.com/lancaster-university/microbit-dal

## History

See the [MakeCode blog](https://makecode.com/blog).

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
