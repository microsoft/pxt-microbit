# typing game challenges

My script. #docs

**Challenge 0**

This [guided tutorial](/lessons/typing-game/tutorial) will teach you how to use the method concat to connect to pieces of text together.

```
alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
index = 0
name = ""
input.onButtonPressed(Button.A, () => {
    led.showString(alphabet.substr(index, 1), 0)
    index = index + 1
})
if (index > 25) {
    index = 0
}
input.onButtonPressed(Button.B, () => {
    name = name.concat(alphabet.substr(index - 1, 1))
})
input.onGesture(Gesture.Shake, () => {
    led.showString(name, 150)
})
```

**Challenge 1**

After you have shown the string in the condition `on shake`, make the name variable hold nothing in it again so people can add a new name after they have shaken it.

```
alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
index = 0
name = ""
input.onButtonPressed(Button.A, () => {
    led.showString(alphabet.substr(index, 1), 0)
    index = index + 1
})
if (index > 25) {
    index = 0
}
input.onButtonPressed(Button.B, () => {
    name = name.concat(alphabet.substr(index - 1, 1))
})
input.onGesture(Gesture.Shake, () => {
    led.showString(name, 150)
    name = "" // ***
})
```

**Challenge 2**

After you have cleared the name variable to hold nothing, make `index := 0` so that when button `A` is pressed, the first letter of the alphabet will be displayed.

```
alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
index = 0
name = ""
input.onButtonPressed(Button.A, () => {
    led.showString(alphabet.substr(index, 1), 0)
    index = index + 1
})
if (index > 25) {
    index = 0
}
input.onButtonPressed(Button.B, () => {
    name = name.concat(alphabet.substr(index - 1, 1))
})
input.onGesture(Gesture.Shake, () => {
    led.showString(name, 150)
    name = ""
    index = 0 // ***
})
```

**Challenge 3**

Give Micro a nickname and display it on the @boardname@!

