# Bluetooth Tests

## Test preparations

Four hex files needed:
- "Meet the micro:bit": This is the programme that runs on the micro:bit when
  it is first powered on from factory.
    - Downloadable from the micro:bit website:
      https://microbit.org/get-started/user-guide/meet-the-microbit-program/
- "Out of Box": The previous factory programme before the
  "Meet the micro:bit" was released.
    - Downloadable from the micro:bit website:
      https://microbit.org/get-started/user-guide/meet-the-microbit-program/
- MakeCode Live Editor hex file: To ensure micro:bits with a recent MakeCode
  project can be flashed via Bluetooth with the MakeCode editor under test.
    - Create a hex file from the latest MakeCode live editor:
      https://makecode.microbit.org/
- Python Editor hex file: To ensure MakeCode editor under test can BLE flash
  micro:bits after using the Python Editor.
    - Go to https://python.microbit.org and download the hex file
      from the default project.

Two mobile/tablet devices needed:
- Android device with the micro:bit app installed.
    - To load a different MakeCode URL, long touch the micro:bit logo in the
      app main screen and a modal will appear with the option to change
- iOS device with the micro:bit app installed.
    - To load a different MakeCode URL, long press the MakeCode back chevron
      to choose beta.

Two micro:bits needed:
- micro:bit V1
- micro:bit V2

The micro:bits can be powered via USB for these tests, as that avoids any
possible issues or errors due to low batteries.

## Test 1: Full & partial flashing with Bluetooth

This test should be carried out with:
- Android app
- iOS app

And the following micro:bit versions:
- micro:bit V1
- micro:bit V2

A test run for each of these hex files is required:
- "Out of Box" hex file
- "Meet the micro:bit" hex file
- MakeCode Live Editor hex file
- Python Editor hex file

Steps:
1. Connect the micro:bit to the computer via USB.
2. Copy the hex file under test to the `MICROBIT` USB drive.
3. Open the app and load the MakeCode editor under test.
    - From the front page, select "Create Code"
4. Create a new MakeCode project with a simple programme (e.g. display
   something on the LED matrix).
    - If a programme has already been created from a previous test run,
      it can be reused.
5. Tap the "Download" button and follow the instructions to connect the
   micro:bit via Bluetooth and flash the programme.
6. Verify the programme is running on the micro:bit.
7. Change the blocks in the MakeCode editor to do something different
   (e.g. display a different icon/message on the LED matrix).
8. Tap the "Download" button and follow the instructions to flash the programme.
9. Confirm the BLE flashing process was shorter than the initial download from
   step 5.
10. Verify that the new programme is running on the micro:bit.

## Test 2: Utility Service

This test checks that the Utility Service is available and working on
the builds of the MakeCode editor under test.

This test should be carried out with:
- Android app
- iOS app

And the following micro:bit versions:
- micro:bit V2 only

Steps:
1. Flash the micro:bit with this MakeCode programme, using any method:
    ```javascript
    basic.forever(function () {
        datalogger.log(
        datalogger.createCV("y", input.acceleration(Dimension.Y)),
        datalogger.createCV("x", input.acceleration(Dimension.X))
        )
        basic.pause(100)
    })
    ```
2. Open the micro:bit app, go to "My Programs".
3. Tap on the "Fetch MY_DATA (V2 only)" button and follow the instructions
   to connect the micro:bit via Bluetooth.
4. Verify that the data as a table of Time, X and Y acceleration values
   is shown in the app.
