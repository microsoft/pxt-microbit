# micro:bit target for PXT
* This README is for pxt-microbit 1.x, which is [currently in beta](https://makecode.com/blog/microbit/v1-beta)

This target allows you to program a [BBC micro:bit](https://microbit.org/) using 
PXT ([Microsoft Programming Experience Toolkit](https://github.com/Microsoft/pxt)).

* [Try it live](https://makecode.microbit.org/beta)

[![Build Status](https://travis-ci.org/Microsoft/pxt-microbit.svg?branch=master)](https://travis-ci.org/Microsoft/pxt-microbit)

## Issue tracking

Please add an issue if you discover an (unreported) bug.

## Local server

The local server lets you to run the editor and serve the documentation from your own computer.

### Setup   
This section explains how to setup your development environment for pxt-microbit, whether that be to run a copy locally or to make source changes.
Note that pxt-microbit cannot be run without its main dependency, [pxt](https://github.com/Microsoft/pxt). pxt-microbit 1.x requires pxt 3.x, which is currently the master branch. Below explains how to setup both.

1. Install [Node.js](https://nodejs.org/) 8.9.4 or higher.
2. Install [Yotta](http://docs.yottabuild.org/) if you are going to edit any `.cpp` files.
3. Clone the pxt repository. Refer to [GitHub Help: Cloning a repository](https://help.github.com/articles/cloning-a-repository/) for further information about cloning a repository.
```
git clone https://github.com/microsoft/pxt
cd pxt
```
4. Install the pxt dependencies.
```
npm install
cd ..
```
5. Clone this repository and switch it to the `v1` branch.
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

Run this command from inside pxt-microbit to open a local web server (add `sudo` for Mac/Linux shells)
```
pxt serve --cloud
```
If the local server opens in the wrong browser, make sure to copy the URL containing the local token. 
Otherwise, the editor will not be able to load the projects.

If you need to modify the `.cpp` files (and have installed yotta), enable yotta compilation by removing the `--cloud` flag (add `sudo` for Mac/Linux shells):
```
pxt serve
```

### Updates

To update your PXT version and make sure you're running the latest tools, run (add `sudo` for Mac/Linux shells):
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
