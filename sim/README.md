# The micro:bit simulator

## Layout

The simulator is split by location into DOM-free code in `sim/core/` and view code in
`sim/visuals/`, following the pxt-core simulator design (`pxtsimcore/README.md` in pxt-core).

- `sim/core/` holds the board state and every shim that runs without a browser:
  - `dalboardstate.ts`: `DalBoardState`, a `CoreBoard` that constructs every component state
    (LED matrix, buttons, edge connector, radio, microphone, accelerometer, serial, thermometer,
    light sensor, compass, logo touch, file system, samples, recording, control messages) and
    registers each in `builtinParts`. `ensureHardwareVersion` raises `hardwareVersion` and queues
    a display update; the state never calls the view.
  - `boardaccess.ts`: `DalBoard` (the board class, an empty subclass of `DalBoardState`), the
    `board()` and `boardView()` accessors, and `parsePinString`.
  - `headless.ts`: `initHeadlessDalBoard`, registered as `pxsim.initHeadlessRuntime` unless one is
    already set.
  - the peripheral state and shims: `accelerometer.ts`, `buttonpair.ts`, `compass.ts`,
    `edgeconnector.ts`, `edgeconnectorsim.ts`, `ledmatrix.ts`, `lightsensor.ts`, `logotouch.ts`,
    `microphone.ts`, `serial.ts`, `thermometer.ts`, `music.ts`, `soundexpression.ts`,
    `audio-samples.ts`, `midi.ts`, `record-audio.ts`, `filesystem.ts`, `flashlog.ts`, and the rest
    of the folder. Sound goes through `pxsim.audiohost`; recording goes through the
    `record.RecorderHost` interface, unsupported until a host is set with `setRecorderHost`.
- `sim/visuals/` holds the view: `dalboardview.ts` (`DalBoardView` and `initRuntimeWithDalBoard`),
  `microbit.ts` (the board SVG), `boardview.ts`, `buttonpairsim.ts`, `ledmatrix.ts`,
  `microservo.ts`, `mute.ts`, and `record-audio-dom.ts`, which sets the MediaRecorder recorder
  host.
- `sim/tsconfig.core.json` compiles `core/**/*.ts` and the pxt-common-packages core files listed
  below with no `dom` lib, against pxt-core's `built/pxtsimcore.d.ts` and
  `built/pxtsimcore-globals.d.ts`, to `built/simcore.js` and `built/simcore.d.ts`.
- `sim/tsconfig.json` compiles `visuals/**/*.ts` and pxt-common-packages'
  `libs/core/sim/neopixel.ts` with the `dom` libs, against pxt-core's `built/pxtsim.d.ts` and
  `built/simcore.d.ts`, and lists `../built/simcore.js` in `prepend`. `pxt buildtarget` builds
  the core config first, then this one, then concatenates, so `built/sim.js` is `simcore.js`
  followed by the view code and `built/sim.d.ts` is `simcore.d.ts` followed by the view
  declarations.
- In `sim/core/`, `boardaccess.ts` pins `dalboardstate.ts` ahead of it with
  `/// <reference path>`, since `DalBoard` extends `DalBoardState` at load time, and `headless.ts`
  pins `boardaccess.ts`.
- `sim/public/simulator.html` loads pxt-core's `pxtsim.js` and then `sim.js`. The micro:bit
  simulator does not load `common-sim.js`; it compiles the pxt-common-packages files it uses
  into its own bundles:
  - core: `libs/base/sim/core/control.ts`, `libs/base/sim/core/controlmessage.ts`,
    `libs/core/sim/core/analogSensor.ts`, `libs/core/sim/core/neopixelstate.ts`,
    `libs/microphone/sim/core/state.ts`, `libs/radio/sim/core/*.ts`,
    `libs/settings/sim/core/*.ts`;
  - view: `libs/core/sim/neopixel.ts`.

### Board state and view

- `runtime.board` is the `DalBoard`, read through `board()` by shims and state code.
  `runtime.boardView` is the `DalBoardView`, a pxt-core `RuntimeBoardView`, read by view code
  only (`boardView()` returns it, or `undefined` in a headless run). Core code never calls the
  view; it changes state and calls `runtime.queueDisplayUpdate()`.
- `pins.setAudioPinEnabled` sets `EdgeConnectorState.audioPinDisabled` and queues a display
  update.
- `DalBoardView` registers the part visuals (`builtinVisuals`, `builtinPartVisuals`), builds a
  `visuals.BoardHost` over the state in `initAsync` (turning on version 2 when the program uses
  version 2 parts), adds the mute button on Safari until the user unmutes, renders screenshots
  through the board host, draws or removes the disabled-headphone overlay from
  `audioPinDisabled` and runs its update subscribers on `updateView`, and releases the board host
  in `kill`.
- `initRuntimeWithDalBoard` creates a `DalBoard` and a `DalBoardView`; it becomes
  `pxsim.initCurrentRuntime` unless one is already set.
- `initHeadlessDalBoard` creates a `DalBoard` with no view; it becomes
  `pxsim.initHeadlessRuntime` unless one is already set. Because `headless.ts` is in
  `sim/core/`, both `simcore.js` and `sim.js` carry it.
- On a runtime error both call `drawSadFace` (`sim/core/ledmatrix.ts`), which draws the sad face
  into `ledMatrixState`.

### Tests

`tests/sim/` holds headless simulator tests: `audio-pin.ts`, `buttons.ts`, `led-brightness.ts`,
`led-image.ts`, `led-plot.ts` and `sensors.ts`. Each is a program with `// @serial: text` expectations. After
`pxt buildtarget`, run them with

    pxt simtest --base libs/blocksprj tests/sim

and add `--core` to run on `pxtsimcore.js` and `built/simcore.js` alone.

## Input API design

This part is a proposal; none of it is implemented. It describes a typed way for a test, or any
tool driving a simulated program, to send inputs to a micro:bit program and observe its output,
including programs loaded into their own headless simulators.

### Typed inputs

A test sends inputs with the enums and types the user program sees, never DAL ids or
`control.raiseEvent`:

    // instead of control.raiseEvent(DAL.DEVICE_ID_BUTTON_A, DAL.DEVICE_BUTTON_EVT_CLICK)
    sim.input.click(Button.A)
    sim.input.shake()
    sim.input.setTemperature(30)

It runs under `pxt simtest`, with and without `--core`, and can later serve a browser test or a
"simulate inputs" panel.

There are two layers:

1. Sim-side input primitives in `sim/core/`, part of `simcore.js`: one function per input that
   applies it to `DalBoardState` and queues the matching events. The pointer handlers in
   `sim/visuals/buttonpairsim.ts` (and the accelerometer and pin handlers) call the same
   primitives instead of setting `pressed` and calling `bus.queue` themselves, so a test goes
   through the code a real button uses.
2. A program-side API: a hidden namespace (no blocks, no docs) with `//% shim=` declarations
   implemented by a `namespace pxsim` file in `sim/core/`. The implementations use `board()`,
   never `boardView()`. The namespace lives in a package that test projects add and shipped
   projects never depend on; it has no native implementation.

| Area | API | Primitive |
|---|---|---|
| Buttons | `press(b: Button)`, `release(b)`, `click(b)`, `longClick(b)` | the `ButtonPairState` button's `pressed`, then `bus.queue` with the button id and the down, up, click or long-click event; `Button.AB` presses A and B |
| Logo | `touchLogo()`, `releaseLogo()` | `logoTouch`, a `Button` |
| Gestures | `gesture(g: Gesture)`, `shake()` | `accelerometerState.accelerometer.forceGesture`, or an acceleration vector for the gesture |
| Acceleration | `setAcceleration(x, y, z)` (milli-g) | `accelerometerState.accelerometer.update(x, y, z)` |
| Temperature | `setTemperature(c)` | `thermometerState.temperature` |
| Light | `setLightLevel(n)` | `lightSensorState.lightLevel` |
| Compass | `setHeading(deg)` | `compassState.heading` |
| Sound | `setSoundLevel(n)` | `microphoneState.setLevel` |
| Pins | `setPinValue(p: DigitalPin \| AnalogPin, v)`, `pressPin(p: TouchPin)` | `edgeConnectorState.getPin(id)`: `value`, `mode`, `touched`, and the pin events |
| Radio | `receiveRadio(value)`, `receiveRadioString(s)` | a `radiopacket` message through `board().receiveMessage` |
| Serial in | `receiveSerial(text)` | a `serial` message through `board().receiveMessage` |
| Observing | `led(x, y)`, `ledBrightness(x, y)` | `ledMatrixState.image` |

Rules:

- Parameters are the existing enums (`Button`, `Gesture`, `Dimension`, `DigitalPin`,
  `AnalogPin`, `TouchPin`, `Rotation`), so the compiler checks values and tests read like user
  code. No parameter is a DAL constant; one table in the primitive layer maps each enum member to
  its DAL id, and a test checks that every member maps.
- Calls return at once and only queue events; `pause(1)` after `click(Button.A)` lets handlers
  run.
- An input the running hardware version lacks (logo touch on version 1) fails with a clear
  runtime error.
- Gestures are driven through acceleration vectors where possible, so `input.isGesture` agrees
  with the event.
- Names stay clear of `input.*`; a separate top-level namespace avoids collisions.
- Each input has a `tests/sim/*.ts` program whose `@serial` lines assert that the handler fired
  or the sensor read back the value, plus negative tests for unsupported inputs and out-of-range
  values.

### Programs in their own simulators: `test.sim[id]`

A test program can load other programs into separate headless simulators, name each with an
id, and drive and observe them:

    test.load("a", { share: "_abc123XYZ" })
    test.load("b", { github: "owner/repo#v1.2.0" })
    test.load("c", { project: "libs/blocksprj" })
    test.load("d", { source: "led.plot(0, 0)" })

    test.sim["a"].input.click(Button.A)
    console.log(test.sim["a"].led(0, 0) ? "on" : "off")
    test.sim["a"].stop()

- The scope is the headless test runner. Every loaded program is its own runtime with its own
  `vm` context and board and no view. Programs never talk to each other; the runner sees every
  message.
- `test.sim` is a property holding a map from id to handle, so `test.sim[id]` is valid Static
  TypeScript; `test.load` also returns the handle.
- `test.load(id, source)` loads and starts a program. Loading an id already in use is an error;
  `stop()` frees it. `SimSource` is a tagged object: `{ share }`, `{ github }`, `{ project }`,
  `{ source }` or `{ json }` (a files map).
- A handle offers `input` (the input API bound to that simulator), observers (`led`,
  `screenText`, `serialOutput`), `waitUntilRunning()`, `stop()`, `restart()`, `send`, and
  `onSerial`, `onError` and `onMessage` for what the child posts.
- Messages a child posts (`radiopacket`, `serial`, `bulkserial`, custom messages, errors) are
  only recorded unless the test handles them with `test.onMessage((id, msg) => ...)` or forwards
  them with `test.forward(fromId, toId, filter?)`, for example to bridge radio between boards.
- A child error arrives as an event (`onError`, and `test.onMessage`) and never throws into the
  test or stops another child. An error nothing handles is reported at the end and fails the
  test.
- Every program uses the runner's target `sim.js`; a program for another target fails to load
  with a clear error.
- Loading from the network takes an explicit `--allow-network`, share and GitHub sources are
  pinned to a script id or tag, and resolved sources are cached. Counts, sizes and run times of
  children are limited.

### Host protocol

New simulator messages, typed next to the other message interfaces in pxt-core's
`pxtsimcore/messages.ts`:

| Direction | Message | Purpose |
|---|---|---|
| test -> runner | `{ type: "simload", id, source }` | create simulator `id` |
| runner -> test | `{ type: "simloaded", id, ok, error? }` | the program compiled and started, or failed |
| test -> runner | `{ type: "siminput", id, input: { kind, ...args } }` | an input addressed to `id` |
| test -> runner | `{ type: "simstop", id }` | stop and dispose `id` |
| runner -> test | `{ type: "simevent", id, event }` | serial, errors and state changes from `id` |
| child -> runner | any message the child posts | intercepted; delivered only where the test forwards it |

Each input has a serializable form (`{ kind: "click", button: 1 }`), so the primitive layer is
reached directly in a program and over a message across simulators. The primitives take the
target `DalBoardState`; the runner picks the board for `id`.

Resolving a source is a `ProgramResolver` (`resolveAsync(source)` resolving to the compiled JS,
files and target), so the CLI and tests plug in their own and tests use a fake without the
network. The CLI resolver reuses `pxt.Cloud.downloadScriptFilesAsync` for share links, the
`pxt.github` resolution for repositories, `pxt.MainPackage` loading for local projects, and
`pxtc.compile` for the JS. In the CLI, `cli/simtest.ts` gains a `SimInstance` over one `vm`
context and `Runtime`, a registry keyed by id, and a router for the protocol; all instances share
one virtual host.

A browser form can reuse the same protocol later: `SimulatorCoordinator` keeps child frames
created through `SimFrameHost.createFrame`, routes `siminput` to the child's frame and forwards
its `simevent`s to the controller's frame, shows each child labelled with its id, and is gated
off by default in the editor.

### Observation through a headless board view

- `HeadlessBoardView`, a DOM-free `RuntimeBoardView`, becomes `runtime.boardView` in
  `initHeadlessDalBoard`. It draws nothing; its `updateView` takes a snapshot of the observable
  state and notifies subscribers, so the runtime's `updateDisplay` (flushed at most once per
  scheduler step) is the change signal and state files need no hooks of their own.
- A `BoardSnapshot` type, defined once in `sim/core/`, is the plain serializable shape: LED image
  and brightness, pin values and modes (servo angles included), neopixels and serial. The runner,
  the `simstate` message and the program-side API all use it.
- Change events come from diffing consecutive snapshots: `onLedChange`, `onPinChange(pin, ...)`,
  `onSerial`, and `onSound` from the audio host's sound events
  (`pxsim.audiohost.setSoundEventHandler`).
- Waiting assertions: `waitFor(condition, timeoutMs)` and `expect` helpers such as
  `expect.led(2, 2).toBeOn()`, `expect.screenText("Hi")` and `expect.serial("x")`. A timeout
  reports the last snapshot.
- An opt-in, size-limited history of timestamped snapshots lets a test assert sequences (scrolled
  text, tones, servo moves) after the fact.
- Helpers: `ledsAsString()` in the `images.createImage` literal syntax, a text rendering for
  failure messages, and golden-file comparison.
- Across runtimes, the headless view posts `{ type: "simstate", area, data }` on change. The
  runner keeps the latest snapshot per child, and `test.sim[id]` reads that mirror; the runner
  itself reads snapshots directly.

### Open questions

- Namespace name: `sim.input`, `simInput` or `testInput`, and whether `test` clashes with
  existing identifiers.
- Package location: hidden inside `libs/core`, or a separate opt-in package.
- Whether the input API is also exposed to the runner for scripted timelines (`{ at: ms, input }`
  steps sent as messages while the program is blocked), or in-program use is enough.
- Whether a "simulate inputs" browser panel is a goal that justifies building the primitives for
  UI reuse now.
- Magnetic force: `input.magneticForce` returns 0 and no state backs it, so a
  `setMagneticForce(dim: Dimension, v)` input needs that state first.
- Snapshot granularity: a whole-board snapshot on each change, or per-area deltas.
- Whether observation is opt-in per area (`handle.watch("leds")`) or always on.
- Which outputs come first: LEDs and serial, then pins and radio, then sound.
