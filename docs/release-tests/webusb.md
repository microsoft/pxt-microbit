# WebUSB Tests

## Test matrix

WebUSB tests should be carried out with the following combination of
micro:bit boards, DAPLink versions, and browsers/apps to ensure full coverage
of the supported configurations.

### Test boards and DAPLink versions

Each WebUSB test should be carried out with these micro:bit boards and
DAPLink versions.
The goal is to test each DAPLink port with the first factory release,
the latest official release, and the latest beta release.

| Board | DAPLink   | DAPLink MCU  | Description                       |
| ----- | --------- | ------------ | --------------------------------- |
| V1.x  | 0249      | KL26         | V1.5 factory release              |
| V1.x  | 0253      | KL26         | Latest V1 official release        |
| V2.00 | 0255      | KL27         | Factory & latest official release |
| V2.00 | 0258-beta | KL27         | Latest beta release               |
| V2.2x | 0257      | nRF52833/820 | Factory & latest official release |
| V2.2x | 0258-beta | nRF52833/820 | Latest beta release               |

### Test browsers, apps & Operating Systems

Each WebUSB test should be carried out with the latest version of these
Chrome-based browsers and operating systems:

- Chrome on Windows
- Chrome on macOS
- Chrome on ChromeOS
- Chrome on Linux
- Chrome on Android
- Edge on Windows
- MakeCode Offline App for Windows
    - https://makecode.microbit.org/offline-app
- MakeCode Offline App for macOS
    - https://makecode.microbit.org/offline-app
- MakeCode Windows Store App
    - https://apps.microsoft.com/detail/9nmqdq2xzkwk

## Tests to run on all matrix variations

The following tests should be carried out with all combinations of the
micro:bit boards, DAPLink versions, and browsers/apps listed in the
"Test Matrix" section.

As these tests can be repeated multiple times in the same computer with
different micro:bit boards, when a test step indicates to create a new project,
it is acceptable to use an existing project created in a previous test run.

### Test 1: WebUSB Download

1. Connect the micro:bit to the computer via USB.
2. Open the micro:bit MakeCode editor under test in a Chrome-based browser.
3. Create a new project, and add a block to display an icon on the LED matrix.
4. If the micro:bit was automatically connected via WebUSB, disconnect it from
   the editor by clicking on the "Disconnect" button in "Download" menu
   (three dots icon at the right of the "Download" button).
5. Click the "Download" button.
6. Follow the connection instructions to connect the micro:bit via WebUSB and
   download the programme.
7. Verify that the programme runs on the micro:bit.
8. Change the code to display a different icon on the LED matrix.
9. Click the "Download" button again.
10. No connection instructions should be show this time and the programme
    should be downloaded directly to the micro:bit in a shorter amount of time.
11. Verify the new programme runs on the micro:bit with the new icon.

### Test 2: WebUSB Serial

1. Connect the micro:bit to the computer via USB.
2. Open the micro:bit MakeCode editor under test in a Chrome-based browser.
3. Create a new project and add this code
    ```javascript
    basic.forever(function () {
        serial.writeLine("hello")
        basic.pause(1000)
    })
    ```
5. Click the "Download" button.
6. Follow the connection instructions to connect the micro:bit via WebUSB and
   download the programme.
7. Click on "Show Data Device" button to open the serial console.
8. Verify that the serial console shows "hello" every second.

## Tests on specific variations

This test should only be carried out with the configuration listed at the
beginning of each test.

### Test 3: WebUSB with incompatible DAPLink

The following DAPLink versions are not expected to work with WebUSB, and
this test is to ensure an error message suggesting a firmware update is shown.

This test should be carried out with the following DAPLink versions:
- micro:bit V1.x with DAPLink 0234
    - This is the V1.03 factory version from the original BBC school drop
- micro:bit V1.x with DAPLink 0241
    - This is the V1.3B factory version, from the first commercial release

1. Connect the micro:bit to the computer via USB.
2. Open the micro:bit MakeCode editor under test in a Chrome-based browser.
3. Create a new project.
4. Add a block to the project (e.g. something simple to display on the LED
   matrix).
5. Click the "Download" button.
6. Follow the connection instructions to connect the micro:bit via WebUSB.
7. Verify that an error message is shown suggesting a firmware update is
   required.

### Test 4: WebUSB within micro:bit classroom

This test can be executed only once, using any micro:bit board with any
DAPLink WebUSB compatible version, using Chrome on Windows.
The goal of this test is to ensure that WebUSB feature is not broken due to
the MakeCode editor being embedded in classroom.

1. Connect the micro:bit to the computer via USB.
2. Open the micro:bit Classroom with this URL:
    https://classroom.microbit.org/?editorVersion=beta
3. Create and start a blank session.
4. Click on "Edit Code", which should open the embedded MakeCode editor.
5. Drag a block into the workspace (e.g. something simple to display on the LED
   matrix).
6. Click the "Download" button.
7. Follow the connection instructions to connect the micro:bit via WebUSB and
   download the programme.
8. Verify that the programme runs on the micro:bit.

### Test 5: WebUSB within micro:bit CreateAI

This test can be executed only once, using any micro:bit board with any
DAPLink WebUSB compatible version, using Chrome on Windows.
The goal of this test is to ensure that WebUSB feature is not broken due to
the MakeCode editor being embedded in CreateAI.

1. Connect the micro:bit to the computer via USB.
2. Open the micro:bit CreateAI with this URL, which includes a project:
     https://review-createai.microbit.org/makecode-lang-picker/import?id=simple-ai-exercise-timer&project=Project%3A%20Simple%20AI%20exercise%20timer&name=Simple%20AI%20exercise%20timer&editors=makecode&editorVersion=beta
3. A "New session setup" screen should appear, click on "Start session".
4. On the next screen, click on "Train Model".
5. Wait for the model to be trained, which should take a few seconds.
6. On the next screen, click on "Edit in MakeCode".
7. The MakeCode editor should open with the project loaded. Click on the
   "Download" button.
8. Follow the connection instructions to connect the micro:bit via WebUSB and
   download the programme.
9. Verify that the programme runs on the micro:bit.
