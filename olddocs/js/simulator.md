# Run Code in your Browser

Run scripts in a web browser.

While you're writing and testing your scripts, you'll mostly be running scripts in your browser by clicking the `run` button. Both the [Microsoft Block editor](/blocks/editor) and the [Touch Develop editor](/js/editor) have a `run` button above the coding area.

*Note*: in the Touch Develop editor, the button actually is named `run main`, reflecting the fact that execution of a Touch Develop script always beings in the `main` function

When you click `run main` in the Touch Develop editor, your code executes and the results are simulated on-screen, using an image of the @boardname@ device, like this:


In the picture above, [plot image](/reference/led/plot-image) create a heart image that appears on the @boardname@ simulator.

The @boardname@ simulator let's you...

* write and test code, even if you don't have a @boardname@ device
* test your code throughly before downloading and running your script on the @boardname@

### What does the simulator support?

The @boardname@ simulator supports the Touch Develop [functions](/js/contents) and Microsoft [blocks](/blocks/contents), including those related to the LED screen, input buttons, the compass, accelerometer, and the digital I/O pins.

* **LED screen**: the [LED screen](/device/screen) that appears on-screen shows you what you'll see on the @boardname@ device
* **input buttons**: when running code with [button is pressed](/reference/input/button-is-pressed) or [on button pressed](/reference/input/on-button-pressed) functions, click the on-screen A or B button
* **compass**: when running code that includes [compass heading](/reference/input/compass-heading), click and drag the on-screen compass needle to change the heading
* **accelerometer**: move your mouse over the on-screen @boardname@ device to simulate [acceleration](/reference/input/acceleration). The x and y axis values are shown on-screen.
* **digital pins**: you can click the on-screen digital pins (0 , 1, or 2) to turn them on or off (see [digital write pin](/reference/pins/digital-write-pin) and [digital read pin](/reference/pins/digital-read-pin) for more info).

**Can't see the red LEDs on the simulator?**

If you click on the white THEME button in the top right corner of the simulator, it will switch to an accessible version of the simulator, where the LEDs are displayed in blue on a white background.

### All done?

Once you're done writing and testing your code on the simulator, compile and run your script on your @boardname@ device. To find out how to do this, see [run scripts on the @boardname@](/device/usb).

### Simulator vs @boardname@

Running your scripts in a web browser is a *simulation* of how your code will run on the @boardname@ device. When you run your script on your @boardname@ device, the results may differ slightly. For example, the timing may be subtly different when your script runs on the @boardname@ device (you may need to adjust your [pause](/reference/basic/pause) functions). For this reason, be sure to test your scripts on the @boardname@ device.

### See also

[run scripts on the @boardname@](/device/usb), [Microsoft Block editor](/blocks/editor), [Touch Develop editor](/js/editor)

