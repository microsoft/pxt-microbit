# Help translate

Our translations are managed via Crowdin, a translation management platform. It is free to join
and you can volunteer to translate parts of the web site.

## Crowdin project

The project below contains the resources from https://www.pxt.io and the menu items of https://pxt.microbit.org.

* [https://crowdin.com/project/kindscript](https://crowdin.com/project/kindscript)

If you want to help translating the editor, please sign in to Crowdin and send us a translator request.

## Translating the editor interface

The editor interface strings, like the "Download" button are in the ``strings.json`` file. Start by updating this file to translate the UI.

To test your changes "live", use **beta** build and the ``?livelang=CODE`` query argument where ``CODE`` is your language ISO code. For example, to see the french translations:

* https://pxt.microbit.org/beta?livelang=fr

Note that there may be a delay of up to 5 minutes before your changes in Crowdin make it into the "live" view.

## Translating the blocks and reference documentation

You will find package files under ``/microbit`` , one for the block definition and one for the descriptions:

* ``core-strings.json``: contains the block definitions
* ``core-jsdoc-strings.json``: contains the descriptions

The block definition should be carefully translated using the [block definition syntax](https://www.pxt.io/defining-blocks).