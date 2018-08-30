# micro:bit target for PXT

[![Build Status](https://travis-ci.org/Microsoft/pxt-microbit.svg?branch=v1)](https://travis-ci.org/Microsoft/pxt-microbit)

*This README is for pxt-microbit v1.x, which is [currently in beta](https://makecode.com/blog/microbit/v1-beta).*

pxt-microbit is a [Microsoft Programming Experience Toolkit (PXT)](https://github.com/Microsoft/pxt) target that allows you to program a [BBC micro:bit](https://microbit.org/). pxt-microbit v1.x requires pxt v3.x, which is currently in the [master branch of pxt](https://github.com/Microsoft/pxt/tree/master).

* [Try it live](https://makecode.microbit.org/beta)

## Issue tracking

Please add an issue if you discover an (unreported) bug.

## Local server

The local server lets you to run the editor and serve the documentation from your own computer.

### Setup

1. Install [Node.js](https://nodejs.org/) 8.9.4 or higher.
2. Install [Yotta](http://docs.yottabuild.org/) if you are going to edit any `.cpp` files.
3. Clone the pxt repository.
```
git clone https://github.com/microsoft/pxt
cd pxt
```
4. Install the dependencies of pxt and build it
```
npm install
npm run build
cd ..
```
5. Clone the `v1` branch of this repository.
```
git clone https://github.com/microsoft/pxt-microbit --branch v1
cd pxt-microbit
```
6. Install the PXT command line (add `sudo` for Mac/Linux shells).
```
npm install -g pxt
```
7. Install the pxt-microbit dependencies.
```
npm install
```
8. Link pxt-microbit back to base pxt repo (add `sudo` for Mac/Linux shells).
```
npm link ../pxt
```
Note the above command assumes the folder structure of   
```
       makecode
          |
  -----------------
  |               |
 pxt        pxt-microbit
 ```

### Running

Run this command from inside pxt-microbit to open a local web server
```
pxt serve
```
If the local server opens in the wrong browser, make sure to copy the URL containing the local token. 
Otherwise, the editor will not be able to load the projects.

If you need to modify the `.cpp` files (and have installed yotta), enable yotta compilation using the `--localbuild` flag:
```
pxt serve --localbuild
```

### Updates

To update your PXT version and make sure you're running the latest tools, run:
```
pxt update
```

More instructions are at https://github.com/Microsoft/pxt#running-a-target-from-localhost

## Repos 

The pxt-microbit target depends on several other repos. The main ones are:
- https://github.com/Microsoft/pxt, the PXT framework
- https://github.com/lancaster-university/microbit, basic wrapper around the DAL
- https://github.com/lancaster-university/microbit-dal

## History

See the [MakeCode blog](https://makecode.com/blog).

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
