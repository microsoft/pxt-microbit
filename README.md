# micro:bit target for PXT

This target allow to program a [BBC micro:bit](https://microbit.org/) using 
PXT ([Microsoft Programming Experience Toolkit](https://github.com/Microsoft/pxt)).

* [Try it live](@homeurl@)

[![Build Status](https://travis-ci.org/Microsoft/pxt-microbit.svg?branch=master)](https://travis-ci.org/Microsoft/pxt-microbit)

## Issue tracking

All issue tracking for this repo happens at https://github.com/Microsoft/pxt, see you there!

## Local server

The local server allows to run the editor and the documentation from your computer.

### Setup

The following commands are a 1-time setup after synching the repo on your machine.

* See requirements for [pxt](https://github.com/Microsoft/pxt)
* [clone this repo](https://help.github.com/articles/cloning-a-repository/) to your computer and go in the project folder
```
git clone https://github.com/microsoft/pxt-microbit
cd pxt-microbit
```
* install the PXT command line (add ``sudo`` for Mac/Linux shells).
```
npm install -g pxt
```
* install the dependencies
```
npm install
```

### Running

Run this command to open a local web server (add ``sudo`` for Mac/Linux shells)
```
pxt serve
```
If the local server opens in the wrong browser, make sure to copy the URL containing the local token. 
Otherwise, the editor will not be able to load the projects.

If you need modify the `.cpp` files, turn on yotta compilation with the ``-yt`` flag (add ``sudo`` for Mac/Linux shells):
```
pxt serve -yt
```

## Updates

To update your PXT version and make sure you're running the latest tools, run (add ``sudo`` for Mac/Linux shells)
```
pxt update
```

More instructions at https://github.com/Microsoft/pxt#running-a-target-from-localhost 

## Testing

The build automatically runs the following:

* make sure the built-in packages compile
* `pxt run` in `libs/lang-test*` - this will run the test in command line runner; 
  there is a number of asserts in both of these
* `pxt testdir` in `tests` - this makes sure all the files compile and generates .hex files
* run the TD->TS converter on a number of test scripts from `microbit.co.uk` and make sure the results compile

To test something on the device:

* do a `pxt deploy` in `libs/lang-test*` - they should show `1` or `2` on the screen (and not unhappy face)
* run `pxt testdir` in `tests` and deploy some of the hex files from `tests/built`

The `lang-test0` source comes from the `pxt-core` package. It's also tested with `pxt run` there. 

## Repos 

There are a number of repos that pxt-microbit depends on. The main ones are:
- https://github.com/Microsoft/pxt, the PXT framework
- https://github.com/lancaster-university/microbit, basic wrapper around the DAL
- https://github.com/lancaster-university/microbit-dal


## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
