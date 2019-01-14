# Command Responder

## ~ avatar

Code a network command responder and learn how to use the switch statement.

## ~

## Make a protocol

Effective network communication requires a method of receiving requests from a sender and a way to send back a response so that the sender can understand it. This is done by using a format for data that both the sender and receiver agree to use. The sequence of actions and format to request some data, and receive a response, is called a communication _protocol_.

## Receive a command request

For the @boardname@ we can make a simple protocol which just responds with some data that relates to a command request from the sender. To get started, we'll create a command called ``"temp"`` which asks the receiving @boardname@ to reply with its current measured temperature. We can call the program that does this a "command responder".

Our command responder code fits inside an ``||radio:on radio received||`` block using the ``receivedString`` parameter. Go get a ``||radio:on radio received||`` block and put it in the workspace. Inside that block, put in a ``||logic:if then||``. Set the condition to check that ``receivedString`` is equal to ``"temp"``. Then, in the ``||logic:if then||``, send the current value for the temperature back to the requester using ``||radio:radio send value||``. The value name is the same as the command in ``receivedString``. This forms the response part of our protocol.

```block
radio.onReceivedString(function (receivedString) {
    if (receivedString == "temp") {
        radio.sendValue(receivedString, input.temperature())
    } 
})
```

We can make our protocol more useful by allowing the sender to give more commands. Let's add 3 more responses for light level, compass heading, and acceleration. The commands for these that the the requester can send are: ``"light"``, ``"heading"``, ``"accel"``.

Drag out the ``||radio:radio send value||`` block from the ``||logic:if then||`` and put it just after it. Make a new variable and name it ``response``. Pull out the ``||variables:response||`` variable from the ``||variables:Variables||`` drawer and put it in ``||radio:radio send value||`` where the the ``||input:temperature||`` block is. Get a ``||variables:set response to||``, put it into the ``||logic:if then||``. Place a ``||input:temperature||`` in the value slot where `0` is. We now have the ``"temp"`` command response refactored to let us easily add the other command responses.

```block
let response = 0
radio.onReceivedString(function (receivedString) {
    if (receivedString == "temp") {
        response = input.temperature()
    }
    radio.sendValue(receivedString, response)
})
```

Find the **(+)** symbol on the ``||logic:if then||`` block and click it 4 times to make **3** ``||logic:else if||`` sections and **1** ``||logic:else||`` section. For each ``||logic:else if||`` condition, copy the condtion from ``||logic:if then||`` and put in the strings for the remaining 3 commands. Also, for each one, set ``response`` to the proper ``||input:Input||`` value. Finally, in the ``||logic:else||`` section, set ``response`` to `0` in case an unknown command is received.

```blocks
let response = 0
radio.onReceivedString(function (receivedString) {
    if (receivedString == "temp") {
        response = input.temperature()
    } else if (receivedString == "light") {
        response = input.lightLevel()
    } else if (receivedString == "heading") {
        response = input.compassHeading()
    } else if (receivedString == "accel") {
        response = input.acceleration(Dimension.Strength)
    } else {
        response = 0
    }
    radio.sendValue(receivedString, response)
})
```

## The `switch` statement

JavaScript has a very powerful way to write code to check multiple values. It's really useful for processing communications messages that are sent using a protocol like in the command responder we just made. It's called a **switch** statement. It works by checking for one or more cases of possible values for a variable. When a case is matched to the value in the variable, you can run some code just for that case. You have to go to the JavaScript editor to use the switch statement.

To compare the ``switch`` statement to the ``||logic:if then||``, let's look at just the ``"temp"`` command case again, this time in the JavaScript editor. Make this code again in Blocks:

```blocks
let response = 0
radio.onReceivedString(function (receivedString) {
    if (receivedString == "temp") {
        response = input.temperature()
    }
    radio.sendValue(receivedString, response)
})
```

Now switch over to JavaScript:

```typescript
let response = 0
radio.onReceivedString(function (receivedString) {
    if (receivedString == "temp") {
        response = input.temperature()
    }
    radio.sendValue(receivedString, response)
})
```

For the complete ``if`` statement, which earlier was our ``||logic:if then||`` block, we'll replace it with a ``switch`` statement having 1 case for the ``"temp"`` command. Change your ``if`` statement to a ``switch`` statement like this:

```typescript
let response = 0
radio.onReceivedString(function (receivedString) {
    switch (receivedString) {
        case "temp":
            response = input.temperature()
    }
    radio.sendValue(receivedString, response)
})
```

The ``receivedString`` parameter is what the ``switch`` statement is "switching" on inside the ``( )``. This means it's going to select a case that matches the current value of ``receivedString``. A case is made with a ``case`` statement inside the `{ }` of the ``switch``. Under the ``case`` statement is the code you want to run for that particular case. You can have multiple cases and run different code for each.

The cases can have more than one line of code and they end with a ``break`` statement. If the ``break`` isn't at the end of the ``case``, the code in the next ``case`` will run too, all the way until the next ``break``. For our command responder, we'll put in a ``break`` for every ``case``.

The complete command responder code using the ``switch`` looks like this:

```typescript
let response = 0
radio.onReceivedString(function (receivedString) {
    switch (receivedString) {
        case "temp":
            response = input.temperature()
            break
        case "light":
            response = input.lightLevel()
            break
        case "heading":
            response = input.compassHeading()
            break
        case "accel":
            response = input.acceleration(Dimension.Strength)
            break
        default:
            response = 0
    }
    radio.sendValue(receivedString, response)
})
```

All of the cases after the first one replace the ``||logic:else if||`` blocks. Also, you see that at the end of the ``switch`` there is a ``default`` statement. This is similar to the ``||logic:else||`` part of the ``||logic:if then else||`` block. It takes care of all other values of ``receivedString`` that don't match any of the cases in ``switch``. You could put a ``break`` at the end of ``default`` but it's not necessary since it's the last part of the ``switch`` statement.

## Try it!

If you have a second @boardname@ to use, add some sending code to the command responder program we have already. Try sending one of the commands:

```blocks
radio.setGroup(1)
radio.sendString("temp")
```

Download and try both the ``||logic:if then||`` and the ``switch`` statement versions of the program on each @boardname@. See if each version works the same.

```package
radio
```