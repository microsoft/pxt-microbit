# microbit-chrome
Prototype chrome addon that exposes the @boardname@'s serial output to webpages. 
* watch the [demo video](https://vimeo.com/146207766)

# Installation
See [developer.chrome.com](https://developer.chrome.com/extensions/getstarted#unpacked)
for instructions on how to install the local version into your chrome browser.

# Requirements
* Chrome 48 or later.

# Sample page
The `demo.html` webpage goes along with the
https://github.com/Microsoft/microbit-touchdevelop/blob/master/examples/tcs34725.cpp
program. Run `http-server` from this directory, then visit
http://localhost:8080/demo.html
(keep in mind that pages served from `file://` cannot open ports).

# Building

Open a command prompt and run the following commands.

````
npm install
typings update
````