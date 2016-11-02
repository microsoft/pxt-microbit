# In-browser compiler

The @boardname@ pins.

## We listened to your feedback!

Following the feedback from teachers, the following improvements were made:

* compile without signing in
* compile offline
* save and load code using files

## A new in-browser compiler

The compilation from a script to ARM machine code is now done entirely in the browser  (read the [in depth story](https://www.touchdevelop.com/docs/touch-develop-in-208-bits) about building the compiler). The new compiler is used by the Block Editor, Touch Develop and Code Kingdoms to create a .hex file solely within the confines of your web browser (no Internet connection is needed). The @boardname@ compilation process (see page 10 in the Quick Start book) has been updated below to reflect the new compiler architecture, shown below.

![](/static/mb/offline-2.png)

The C++ compiler now only is used to compile the @boardname@ runtime - this is done offline by the @boardname@ team and the precompiled runtime linked with your compiled script in the browser.

## Save and load code using files

![](/static/mb/offline-0.png)

The @boardname@ automatically saves and synchronizes scripts for signed in users through the cloud. Unfortunately, this scenario would not work always so we decided to also support files. Users are now able to import and export scripts as files. For example, they can simply email it or submit them in their classroom portal.

![](/static/mb/offline-1.png)

Compiled .hex files can also be imported back into the web site. This make it easy for a teacher to review the source of a script by simply drag and dropping the file into the editor.

