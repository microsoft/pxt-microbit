#  Incompatibile Hardware

A newer version of @boardname@ usually adds hardware features which also bring new support from MakeCode to let you use them in your programs. This might be new blocks (or API's), and parameters to let code your programs for these new features.

If you have a program that's coded to work with the hardware introduced by the newer version of @boardname@, it will work with that board and most likely any newer future version that keeps these features. If you try to download this this program to a previous version of @boardname@ though, you will probably receive an error message telling you that your program contains - **Incompatible Code**.

You can download a program to a version of @boardname@ that doesn't have the hardware to support the all of the blocks (or API's) you've included in your code. Your program may run fine if it doesn't reach any code that uses any of the incompatible hardware features. If your program does try to run code that is incompatible, a hardware error will occur and your program will stop. An error code may show on the screen and you will need to reset the @boardname@ to run the program again.

## Hardware support levels

You can see if your @boardname@ will work with all of the code in your program by checking its hardware version page for the features it supports:

* [micro:bit v2](/device/v2)
