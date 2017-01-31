# Packages

You can publish libraries (also known as packages or extensions)
that users can then add to their scripts. These typically
provide a driver for a particular hardware device you can connect
to a microbit. 

### ~ hint

All packages need to be approved by the Micro:bit Foundation before being available in the web editor.
See **Approval** section below.

### ~

* [pxt-neopixel](https://github.com/Microsoft/pxt-neopixel) -- TypeScript + ARM Thumb assembly package
* [pxt-max6675](https://github.com/Microsoft/pxt-max6675) -- TypeScript
* [pxt-sonar](https://github.com/microsoft/pxt-sonar) -- TypeScript
* [pxt-i2c-fram](https://github.com/microsoft/pxt-i2c-fram) -- TypeScript

* [Sample C++ extension](https://github.com/Microsoft/pxt-microbit-cppsample)

## Finding packages

From the block editor, the user clicks on **Add Package** and searches for the package. 
Otherwise, the **Add Package** is also available from the gearwheel menu.

To see the list of packages, switch to JavaScript and use the **Explorer** view to find them.

To remove a package, click on the garbage button in the **Explorer** view next to the package.

## Publishing and Approving packages

Once your package is ready, follow these steps to get it approved and listed in the pxt.microbit.org web site:

1. setup a public GitHub repository with your package sources
2. ensure that the license is **Apache2** or **MIT**
3. fill ``test.ts`` with a test scenario
4. ensure that the package builds by running ``pxt`` from the package folder. [Read more...](https://www.pxt.io/packages).
5. fill up the ``README.md`` file with documentation. See [markdown docs](https://pxt.io/writing-docs) for syntax.
6. publish a release by running ``pxt bump`` from the package folder.
7. open a support ticket at https://support.microbit.org, add **package approval** in the subject line.

```
Package approval request

github repo: .....
```

## Localizing packages

It is possible to package localization strings for the **jsDoc** description associated to the API in the package.

When compiling a package, the PXT compiler generates a `strings.json` file under the `_locales/` folder. 
This file contains a map from the symbol name to the en

```
{
  ...
  "basic": "Provides access to common functionality.",
   ...
}
```

```
{
  "basic.clearScreen": "Eteint toutes les diodes."
}
```

```
_locales/
_locales/fr/strings.json
_locales/pt-BR/strings.json
```
