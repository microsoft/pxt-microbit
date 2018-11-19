# MES events

Events and event values are generated in the Message Event Service (MES). Using MES events allows orderly interactions between the @boardname@ and external devices. These events are sent to and received from other wireless devices paired with the @boardname@ (phone, game pad, etc.).

The event source IDs represent a device feature category. The event values are actions for, or notifications about a device feature.

### ~hint

**MES system sources**

The MES events are defined in this source file of the **[microbit-dal](https://github.com/lancaster-university/microbit-dal)**:

* [MESEvents.h](https://github.com/lancaster-university/microbit-dal/blob/master/inc/bluetooth/MESEvents.h)

Also, you can see how the message bus works in the DAL core files:

* [MemberFunctionCallback.cpp](https://github.com/lancaster-university/microbit-dal/blob/master/source/core/MemberFunctionCallback.cpp)
* [MicroBitListener.cpp](https://github.com/lancaster-university/microbit-dal/blob/master/source/core/MicroBitListener.cpp)

### ~

## Raised events

Events are generated, or _raised_, for by the @boardname@ for a paired device. These are raised using the [raise event](/reference/control/raise-event) function.

```typescript-ignore
control.raiseEvent(
    control.eventSourceId(EventBusSource.MES_REMOTE_CONTROL_ID),
    control.eventValueId(EventBusValue.MES_REMOTE_CONTROL_EVT_VOLUMEUP)
);
```

### Remote control

Events for using the @boardname@ as a remote control for audio play.

#### MES_REMOTE_CONTROL_ID

* `MES_REMOTE_CONTROL_EVT_PLAY`: Play the current track
* `MES_REMOTE_CONTROL_EVT_PAUSE`: Pause the current play in progress
* `MES_REMOTE_CONTROL_EVT_STOP`: Stop playing and reset to the beginning of the current track
* `MES_REMOTE_CONTROL_EVT_NEXTTRACK`: Skip to the next track
* `MES_REMOTE_CONTROL_EVT_PREVTRACK`: Skip to the previous track
* `MES_REMOTE_CONTROL_EVT_FORWARD`: Move forward in the current track
* `MES_REMOTE_CONTROL_EVT_REWIND`: Move backward in the current track
* `MES_REMOTE_CONTROL_EVT_VOLUMEUP`: Increase the play volume (audio)
* `MES_REMOTE_CONTROL_EVT_VOLUMEDOWN`: Decrease the play volume (audio)

### Camera

Control camera actions on a paired device.

#### MES_CAMERA_ID

* `MES_CAMERA_EVT_LAUNCH_PHOTO_MODE`: Turn on or set the camera to _photo_ mode.
* `MES_CAMERA_EVT_LAUNCH_VIDEO_MODE`: Turn on or set the camera to _video_ mode.
* `MES_CAMERA_EVT_TAKE_PHOTO`: Capture the picture in the camera view.
* `MES_CAMERA_EVT_START_VIDEO_CAPTURE`: Begin capturing video (start record)
* `MES_CAMERA_EVT_STOP_VIDEO_CAPTURE`: End capturing video (stop record)
* `MES_CAMERA_EVT_STOP_PHOTO_MODE`: Stop photo mode and return to the default mode
* `MES_CAMERA_EVT_STOP_VIDEO_MODE`: Stop video mode and return to the default mode
* `MES_CAMERA_EVT_TOGGLE_FRONT_REAR`: Switch from the front camera to rear camera or rear to front

### Alerts

Trigger standard alert notifications on a device.

#### MES_ALERTS_ID

* `MES_ALERT_EVT_DISPLAY_TOAST`
* `MES_ALERT_EVT_VIBRATE`
* `MES_ALERT_EVT_PLAY_SOUND`
* `MES_ALERT_EVT_PLAY_RINGTONE`
* `MES_ALERT_EVT_FIND_MY_PHONE`
* `MES_ALERT_EVT_ALARM1`
* `MES_ALERT_EVT_ALARM2`
* `MES_ALERT_EVT_ALARM3`
* `MES_ALERT_EVT_ALARM4`
* `MES_ALERT_EVT_ALARM5`
* `MES_ALERT_EVT_ALARM6`

## Received events

Events are received by the @boardname@ from a paired device. You capture these in an [on event](/reference/control/on-event) function.

```typescript-ignore
control.onEvent(EventBusSource.MES_DEVICE_INFO_ID, EventBusValue.MES_DEVICE_INCOMING_CALL, () => {

})
```

### Carrier signal strength

Signal strength to the subscribed carrier service.

#### MES_SIGNAL_STRENGTH_ID

* `MES_SIGNAL_STRENGTH_EVT_NO_BAR`: No service available or very low signal strength
* `MES_SIGNAL_STRENGTH_EVT_ONE_BAR`: Low signal strength
* `MES_SIGNAL_STRENGTH_EVT_TWO_BAR`: Medium signal strength
* `MES_SIGNAL_STRENGTH_EVT_THREE_BAR`: High signal strength
* `MES_SIGNAL_STRENGTH_EVT_FOUR_BAR`: Full signal strength

### Device information

Information about the current status of the device

#### MES_DEVICE_INFO_ID

* `MES_DEVICE_ORIENTATION_LANDSCAPE`: Display orientation is now in landscape
* `MES_DEVICE_ORIENTATION_PORTRAIT`: Display orientation is now in portrait
* `MES_DEVICE_GESTURE_NONE`: No gesture detected for device activation
* `MES_DEVICE_GESTURE_DEVICE_SHAKEN`: The device was shaken
* `MES_DEVICE_DISPLAY_OFF`: Device display is now turned off
* `MES_DEVICE_DISPLAY_ON`: Device display is now turned on
* `MES_DEVICE_INCOMING_CALL`: Currently receiving an incoming call
* `MES_DEVICE_INCOMING_MESSAGE`: A message was received (SMS or other messaging app)

### Game pad controller

Button events from a paired game pad.

#### MES_DPAD_CONTROLLER_ID

* `MES_DPAD_BUTTON_A_DOWN`: Button **A** pressed
* `MES_DPAD_BUTTON_A_UP`: Button **A** released
* `MES_DPAD_BUTTON_B_DOWN`: Button **B** pressed
* `MES_DPAD_BUTTON_B_UP`: Button **B** released
* `MES_DPAD_BUTTON_C_DOWN`: Button **C** pressed
* `MES_DPAD_BUTTON_C_UP`: Button **C** released
* `MES_DPAD_BUTTON_D_DOWN`: Button **D** pressed
* `MES_DPAD_BUTTON_D_UP`: Button **D** released
* `MES_DPAD_BUTTON_1_DOWN`: Button **1** pressed
* `MES_DPAD_BUTTON_1_UP`: Button **1** released
* `MES_DPAD_BUTTON_2_DOWN`: Button **2** pressed
* `MES_DPAD_BUTTON_2_UP`: Button **2** released
* `MES_DPAD_BUTTON_3_DOWN`: Button **3** pressed
* `MES_DPAD_BUTTON_3_UP`: Button **3** released
* `MES_DPAD_BUTTON_4_DOWN`: Button **4** pressed
* `MES_DPAD_BUTTON_4_UP`: Button **4** released

## See also

[raise event](/reference/control/raise-event), [on event](/reference/control/on-event),
[event value](/reference/control/event-value)
