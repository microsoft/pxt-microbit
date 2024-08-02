# Rock Paper Scissors

### @explicitHints true

## {Introduction @unplugged}

![Cartoon of the Rock Paper Scissors game](/static/mb/projects/a4-motion.png)

Turn your micro:bit into a **Rock Paper Scissors** game that you can play with your friends!

## {Step 1 @fullscreen}

We'll start our Rock Paper Scissors game when we shake 👋 our micro:bit. Add an ``||input:on shake||`` function to run code when you shake the @boardname@. Type the code below, or drag a code snippet from the ``||input:Input||`` Toolbox category.

```spy
input.onGesture(Gesture.Shake, function () {

})
```

## {Step 2}

Create a variable named "hand" - this will help us keep track of whether we have a Rock, Paper or Scissors in our hand. Then inside the ``||input:on shake||`` function, use the ``||math:randint||`` function to set the hand variable to a random number from **1** to **3** representing a Rock, Paper or Scissors.

```spy
let hand = 0
input.onGesture(Gesture.Shake, function () {
    hand = randint(1, 3)
})
```

## {Step 3}

To check the value of the hand variable, type ``||logic:if hand==1||`` then use the ``||basic:show icon||`` function to show a small square icon representing a 💎 Rock.

```spy
let hand = 0
input.onGesture(Gesture.Shake, function () {
    hand = randint(1, 3)
    if (hand == 1) {
        basic.showIcon(IconNames.SmallSquare)
    }
})
```

## {Step 4}

Now add an ``||logic:else if||`` clause to check if the hand value is **2**. In that case, use the ``||basic:show icon||`` function to show a large square icon representing 📃 Paper.

```spy
let hand = 0;
input.onGesture(Gesture.Shake, function() {
    hand = randint(1, 3)
    if (hand == 1) {
    	basic.showIcon(IconNames.SmallSquare)
    } else if (hand == 2) {
    	basic.showIcon(IconNames.Square)
    }
})
```

## {Step 5}

Finally let's deal with the last condition - if our hand variable isn't holding a 1 (Rock) or a 2 (Paper), then it must be 3 (Scissors)! Add an ``||logic:else||`` clause and use the ``||basic:show icon||`` function to show ✀ Scissors.

```spy
let hand = 0;
input.onGesture(Gesture.Shake, function() {
    hand = randint(1, 3)
    if (hand == 1) {
    	basic.showIcon(IconNames.SmallSquare)
    } else if (hand == 2) {
    	basic.showIcon(IconNames.Square)
    } else {
    	basic.showIcon(IconNames.Scissors)
    }
})
```

## {Step 6}

Let's test your code! Press the white **SHAKE** button on the micro:bit on-screen simulator, or move your cursor quickly back and forth over the simulator. Do you see the icons for rock, paper and scissors randomly appear?  ⭐ Great job! ⭐

## {Step 7}

If you have a @boardname@ device, connect it to your computer and click the ``|Download|`` button. Follow the instructions to transfer your code onto the @boardname@. Once your code has been downloaded, attach your micro:bit to a battery pack and challenge another micro:bit or a human to a game of 💎 Rock, 📃 Paper, ✀ Scissors!
