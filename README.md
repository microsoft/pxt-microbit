# micro:bit target for PXT

[![Build Status](https://travis-ci.org/microsoft/pxt-microbit.svg?branch=master)](https://travis-ci.org/microsoft/pxt-microbit) ![pxt-testghpkgs](https://github.com/microsoft/pxt-microbit/workflows/pxt-testghpkgs/badge.svg)

pxt-microbit is a [Microsoft Programming Experience Toolkit (PXT)](https://github.com/Microsoft/pxt) target that allows you to program a [BBC micro:bit](https://microbit.org/). 
* pxt-microbit **beta**,  ``v2.*`` (>2.0) requires pxt v5.*, which is currently in the [master branch of pxt](https://github.com/Microsoft/pxt/tree/master).
* pxt-microbit ``v2.0.*``, branch ``stable2.0``, requires [pxt v5.15.\*](https://github.com/microsoft/pxt/tree/stable5.15). It is the servicing branch for live editor.
* pxt-microbit ``v1.*`` requires pxt v4.4, which is currently in the [stable4.4 branch of pxt](https://github.com/Microsoft/pxt/tree/stable4.4).
* pxt-microbit ``v0.*`` is in the [v0 branch of this repository](https://github.com/microsoft/pxt-microbit/tree/v0)

* [Try it live](https://makecode.microbit.org/)

## Issue tracking

Please add an issue if you discover an (unreported) bug.

## Developing new extensions

Authoring and testing of new extensions can be done directly from the web editor. See [our documentation](https://makecode.com/blog/github-packages) on how to get started. If you want to run the editor locally, keep reading.

## Local server setup

The local server lets you to run the editor and serve the documentation from your own computer. It is meant for a single developer used and not designed to serve the editor to a large amount of users.

1. Install [Node.js](https://nodejs.org/) 8.9.4 or higher.
2. Clone this repository.
```
git clone https://github.com/microsoft/pxt-microbit
cd pxt-microbit
```
3. Install the PXT command line (add `sudo` for Mac/Linux shells).
```
npm install -g pxt
```
4. Install the pxt-microbit dependencies.
```
npm install
```

Go to the **Running** section.

### Developer Setup

This is the typical setup used by the MakeCode team to work on the microbit.

1. Install [Node.js](https://nodejs.org/) 8.9.4 or higher.
2. Install [Docker](https://www.docker.com/get-started) if you plan to build ``.cpp`` files.
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
5. Clone the pxt-common-packages repository
```
git clone https://github.com/microsoft/pxt-common-packages
cd pxt-common-packages
npm install
cd ..
```
6. Clone this repository.
```
git clone https://github.com/microsoft/pxt-microbit
cd pxt-microbit
```
7. Install the PXT command line (add `sudo` for Mac/Linux shells).
```
npm install -g pxt
```
8. Install the pxt-microbit dependencies.
```
npm install
```
8. Link pxt-microbit back to base pxt repo (add `sudo` for Mac/Linux shells). 
This step is only required if you intend to make changes to pxt and/or 
pxt-common-packages repos. If all you want is serve a local Makecode, you can skip
this step.
```
pxt link ../pxt
pxt link ../pxt-common-packages
```
Note the above command assumes the folder structure of   
```
       makecode
          |
  ----------------------------------
  |       |                        |
 pxt      pxt-common-packages  pxt-microbit
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
pxt serve --local
```

If you want to speed up the build, you can use the ``rebundle`` option, which skips building and simply refreshes the target information
```
pxt serve --rebundle
```

### Cleaning

Sometimes, your built folder might be in a bad state, clean it and try again.
```
pxt clean
```


### Building with CODAL locally

The following commands force a local build using CODAL.

```
pxt buildtarget --local
```

To disable docker, run

```
export PXT_NODOCKER=1
```

If you are also modifiying CODAL, consider running ``pxt clean`` to ensure the proper branch is picked up.

### Modifying DAL/CODAL locally

* follow instructions above until `pxt serve`
* open editor on localhost and create a project
* do `export PXT_FORCE_LOCAL=1 PXT_RUNTIME_DEV=1 PXT_ASMDEBUG=1`; you can add `PXT_NODOCKER=1`; `pxt help` has help on these
* find project folder under `pxt-microbit/projects`, typically `pxt-microbit/projects/Untitled-42`
* if you're going to modify `.cpp` files in PXT, replace `"core": "*"` in `pxt.json` with `"core": "file:../../libs/core"`;
  similarly `"radio": "file:../../libs/radio"`
* you can edit `main.ts` to change the PXT side of the program; you can also edit it from the localhost editor;
  note that `Download` in the localhost editor will produce different binary than command line, as it builds in the cloud
  and uses tagged version of CODAL
* in that folder run `pxt build` - this will clone codal somewhere under `built/` (depends on build engine and docker)
* similarly, you can run `pxt deploy` (or just `pxt` which is the same) - it will build and copy to `MICROBIT` drive
* assuming the build folder is under `built/codal`, go to `built/codal/libraries` and run `code *`
* in git tab, checkout appropriate branches (they are all in detached head state to the way we tag releases)
* modify files, run `pxt`, see effects
* you can also run `pxt gdb` to debug; this requires `openocd`
* other commands using `openocd` are `pxt dmesg` which dumps `DMESG(...)` buffer and `pxt heap` which can be used to visualize PXT heap 
  (and CODAL's one to some extent)

### Updating dal.d.ts

```
cd libs/blocksprj
rm -rf built
PXT_FORCE_LOCAL=1 PXT_COMPILE_SWITCHES=csv---mbcodal pxt build
PXT_FORCE_LOCAL=1 PXT_COMPILE_SWITCHES=csv---mbcodal pxt builddaldts
mv dal.d.ts ../core
```

### Updates

Make sure to pull changes from all repos regularly. More instructions are at https://github.com/Microsoft/pxt#running-a-target-from-localhost

## Update playlists in markdown

Get a Google API key and store it in the ``GOOGLE_API_KEY`` environment variables (turn on data from the app).

```
pxt downloadplaylists
```

## Repos 

The pxt-microbit target depends on several other repos. The main ones are:
- https://github.com/Microsoft/pxt, the PXT framework
- https://github.com/Microsoft/pxt-common-packages, common APIs accross various MakeCode editors
- https://github.com/lancaster-university/microbit, basic wrapper around the DAL
- https://github.com/lancaster-university/microbit-dal

## History

See the [MakeCode blog](https://makecode.com/blog).

## Code of Conduct

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

## Trademarks

MICROSOFT, the Microsoft Logo, and MAKECODE are registered trademarks of Microsoft Corporation. They can only be used for the purposes described in and in accordance with Microsoft’s Trademark and Brand guidelines published at https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general.aspx. If the use is not covered in Microsoft’s published guidelines or you are not sure, please consult your legal counsel or MakeCode team (makecode@microsoft.com).
