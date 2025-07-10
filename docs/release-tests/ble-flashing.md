# Bluetooth Tests

## Test preparations

Three hex files needed:
- "Meet the micro:bit": This is the program that runs on the micro:bit when
  it is first powered on from factory.
    - Downloadable from the micro:bit website:
      https://microbit.org/get-started/user-guide/meet-the-microbit-program/
- "Out of Box": The previous factory program before the
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
- iOS device with the micro:bit app installed.

## Test 1: Full flashing with Bluetooth from "Out of Box" and "Meet the micro:bit"

This test should be carried out with:
- Android app
- iOS app

A test run for each of these hex files is required:
- "Out of Box" hex file
- "Meet the micro:bit" hex file
- MakeCode Live Editor hex file
- Python Editor hex file

Steps:
1. Connect the micro:bit to the computer via USB.
2. Copy the hex file under test to the `MICROBIT` USB drive.
3. Disconnect the micro:bit from the computer and connect a battery pack.
4. Open the app and load the MakeCode editor under tests.
    - Instructions will be added soon.
5. Create a new MakeCode project with a simple program (e.g. display
   something on the LED matrix).
6. Click the "Download" button.
7. Follow the connection instructions to connect the micro:bit via Bluetooth
   and download the program.
8. Verify that the program runs on the micro:bit.

## Test 2: Partial flashing

Test 1 has to be performed inmediately before this test to ensure the micro:bit
is in a known state.

This test should be carried out with:
- Android app
- iOS app

Steps:
1. Follow steps from Test 1.
2. Change the blocks in the MakeCode editor to something different
   (e.g. display a different icon/message on the LED matrix).
3. Click the "Download" button.
4. Follow the connection instructions to connect the micro:bit via Bluetooth
   and download the program.
5. Verify the BLE flashing process was shorter than on Test 1.
6. Verify that the program runs on the micro:bit.

## Test 3: Utility Service

This test checks that the Utility Service is available and working on
the builds of the MakeCode editor under test.

This test should be carried out with:
- Android app
- iOS app

Steps:
1. Flash the micro:bit with this MakeCode programme, using any method:
    ```javascript
    basic.forever(function () {
        datalogger.log(
        datalogger.createCV("y", input.acceleration(Dimension.Y)),
        datalogger.createCV("x", input.acceleration(Dimension.X))
        )
    })
    ```
2. Open the micro:bit app and connect to the micro:bit.
3. TODO: Rest of the instructions will be added soon.
