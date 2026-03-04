# @extends

## #promo

### ~ hint

#### Help translate

Looking to help translate the site for **[microbit.org](http://microbit.org)**? Try http://translate.microbit.org/ to help the Micro:bit Foundation!
 
### ~

## #target-files

When you select your language from the [MakeCode](https://crowdin.com/project/makecode) project homepage, you'll find all of the localization files for MakeCode shown in a folder tree. The strings to translate for the @boardname@ are found in the files under the **microbit** folder for the current language.

![microbit strings files](/static/mb/translate/crowdin-folder.png)

Localization files are present in two different forms, JSON and markdown. The JSON files (those you see with the **.json** ending in their names) contain localizable strings related to both the editor UI and the text shown on the programming code blocks. All of the markdown files (those with **.md** at the end of their names) are documents for reference, projects, tutorials, help information, etc.

The files listed in the following sections provide a guide to how each of the translation files and folders relate to the **MakeCode for @boardname@** editor.

### Editor

There are a few files that are specific to the MakeCode editor itself. These contain strings for the editor UI and the simulator. They are essential to translate and should be prioritized before the other files.

| File | Description |
| - | - |
| strings.json | Common strings that are shared by all MakeCode editors. **Note**: This file is located at the MakeCode project's root folder rather than under **microbit** |
| target-strings.json | Strings custom to the @boardname@ editor interface |
| sim-strings.json | Strings for the @boardname@ simulator |
<br/>

This is an example of the editor with its interface elements localized:

![Translated editor elements](/static/mb/translate/target-strings.jpg)

### Blocks

The strings for the programming code blocks all have names in the form of '_name_-strings.json' and '_name_-jsdoc-strings.json'. The _name_ part of the filename often refers to which set of blocks or the extension that the blocks come from.

| File | Description |
| - | - |
| core-jsdoc-strings.json | Description text for code elements of the [basic](/reference/basic) and core [blocks](/blocks). **Note**: this file contains strings for the fundamental set of coding blocks and should be prioritized over the other strings files for blocks |
| core-strings.json | Display text for the [basic](/reference/basic) and core [blocks](/reference/blocks). **Note**: this file contains strings for the fundamental set of coding blocks and should be prioritized over the other strings files for blocks |
| radio-jsdoc-strings.json | Description text for code elements of the [radio](/reference/radio) blocks |
| radio-strings.json | Display text for the [radio](/reference/radio) blocks |
| radio-broadcast-jsdoc-strings.json | Description text for code elements of the radio broadcast blocks |
| radio-broadcast-strings.json | Display text for the radio broadcast blocks |
| servo-jsdoc-strings.json | Description text for code elements of the [servo](/reference/servos) blocks |
| servo-strings.json | Display text for the [servo](/reference/servos) blocks |
| bluetooth-jsdoc-strings.json | Description text for code elements of the [bluetooth](/reference/bluetooth) blocks |
| bluetooth-strings.json | Display text for the [bluetooth](/reference/bluetooth) blocks |
| devices-jsdoc-strings.json | Description text for code elements of the _connected devices_ blocks |
| devices-strings.json | Display text for the _connected devices_ blocks |
| flashlog-jsdoc-strings.json | Description text for code elements of the _flashlog_ blocks |
| flashlog-strings.json | Display text for the _flashlog_ blocks |
| datalogger-jsdoc-strings.json | Description text for code elements of the [datalogger](/reference/datalogger) blocks |
| datalogger-strings.json | Display text for the [datalogger](/reference/datalogger) blocks |
| jacdac-jsdoc-strings.json | Description text for code elements of the _jacdac_ blocks |
| jacdac-strings.json | Display text for the _jacdac_ blocks |
| color-jsdoc-strings.json | Description text for code elements of the _color_ blocks |
| color-strings.json | Display text for the _color_ blocks |
| microphone-jsdoc-strings.json | Description text for code elements of the _microphone_ blocks |
| microphone-strings.json | Display text for the _microphone_ blocks |
| settings-jsdoc-strings.json | Description text for code elements of the _settings_ blocks |
| settings-strings.json | Display text for the _settings_ blocks |
<br/>

Here are some examples of translated blocks:

![Translated block text](/static/mb/translate/block-text.jpg)

### Document pages

Document pages contain the text for any markdown page available on the MakeCode editor site. These include code block reference, projects, tutorials, how-to information, etc.

| File | Description |
| - | - |
| docs | Documentation pages for projects, courses, lessons, and code block reference |
| libs | Documentation pages for code block reference and other information related to built-in extensions like _servo_ and _datalogger_ |
<br/>

Here's an example of a translated document page for a course lesson:

![Translated document page](/static/mb/translate/doc-page.jpg)
