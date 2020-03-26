# Robot Unicorn

## by [Helen Leigh](https://twitter.com/helenleigh)

Hey, I made a herd of very silly gesture controlled robot unicorns I did this because I was bored with those personality-free robots that only move in a straight line. This is a cheap, unreliable, hilarious robot unicorn project suitable for total beginners. You'll learn about LEDs, gesture control, radio, and servo control.

On this project page, I've written up what you'll need to make your own Robot Unicorn, with all the steps you'll need to follow and the code you'll need to write. I've even have videos for each of the steps to help guide you through this project. Happy making and have fun! 

![Robot Unicorn](/static/mb/projects/robot-unicorn/robotunicorn.jpg)

## Ingredients

Here's what you'll need. The links telling where to get parts are just examples - with a bit of searching you will be able to find any of these parts cheaper in whatever shop you normally use to get parts like this: eBay, Amazon, Rapid, Digikey, Kitronik, etc.

- Two @boardname@s plus a AAA battery pack for each of them.
- Two 360 continuous rotation servos with wheels (I used FS90R servos with wheels [like this](https://www.kitronik.co.uk/2574-wheel-for-fs90r-60mmx8mm.html)). 360 servos are super cheap, super unreliable and super easy to hook up, which is exactly why I chose them. Remember, the unicorn not going exactly where you expect it to go is kind of the point.
- One small swivelling castor wheel plus the nuts and bolts to fix it to the base (something [like this](https://www.amazon.co.uk/dp/B074WP1QJN/)). You can use a marble like castor wheel designed for robots but if you use the cheaper ones designed for furniture you can figure out a special way to get your robot unicorn to rear up like She Ra's flying unicorn Swift Wind. Or sometimes it will just fall over. Either way, it's funny.
- One 3XAA battery pack with on off switch and leads (something [like this](https://www.amazon.com/x1-5V-Battery-Holder-Switch-Wires/dp/B01C5J4K3Q/)).
- Three crocodile clips, or alligator clips as Americans apparently call them. Cute.
- One unicorn horn. Obviously. I modified an old ``stl`` from Adafruit at [Thingverse](https://www.thingiverse.com/thing:956359) to make it smaller and give it a solid base so it stuck securely onto my unicorn's head. I've included my revised ``stl`` file in the project files at the bottom of this project page if you want to 3D print your own, or you can make a horn from whatever kind of material you like!
- Something shiny for the tail. I used tinsel for some and tiny disco balls for some others. 
- Three sheets of A4 card, the sparklier the better. I've made pdf templates for the shape of the body and head which you can either use as a printed template or as a lasercutting file. You'll find the pdfs in the project files at the bottom of this project page. If you want to experiment with using other materials for your Robot Unicorn, go for it! I've used a card base and a furry body, my friend made a leather version and I've also lasercut semi transparent polypropylene for the head, putting LEDs, jelly beans, copper tape and glitter inside. (The glitter was a total pain. 0/10 do not recommend.)
- Some wire strippers and some electrical tape.
- Some double sided sticky tape, some sellotape and/or some decent glue. Those double sided sticky pads work really well for fixing the servos to the cardboard chassis.

![micro:bits and Unicorn Horn](/static/mb/projects/robot-unicorn/microbitsunicorn.jpg)

### Instructions

**1. Make the unicorn body!** I've made the video below to show how to put your unicorn together using the templates in the project files at the bottom of this project page. Not feeling crafty? That's okay! You can experiment with cutting wheel holes in a small box instead.

https://www.youtube.com/watch?v=CKqrMxuZ6gQ
<br/>

**2. Add in the electronics!** Put on the wheels, then wire up the servos and the battery and the first @boardname@. Just watch my video to see how. 

https://youtu.be/CKqrMxuZ6gQ?t=178
<br/>

**3. Code it!** I've supplied my code below, but I'd recommend that you watch the videos I've made so that you understand what is going on. The first video gets you started with one @boardname@, and the second helps you take the next step: gesture controlling your robot unicorn with two @boardname@s. **Pro tip**: there are lots of ways to get the same results using different code, so it's totaslly fine if your code works but doesn't match mine. 

**Getting started with @boardname@**

https://www.youtube.com/watch?v=OBcVMPdAIoE
<br/>

**Using gesture control and radio to control your Robot Unicorn with @boardname@**

https://www.youtube.com/watch?v=qAakgfNouOI
<br/>

**4. Play!** Make an obstacle course! Make another one and have a race or a dance off with a friend! Once you've mastered the basics of making your unicorn move around you might want to think about how to make improvements.

**5. Tell me about it!** It brings me joy to know other people make my silly inventions. You can say hi [on Twitter](https://twitter.com/helenleigh), follow me [on Insta](https://www.instagram.com/helenleigh_makes/) or [subscribe to my channel on YouTube](https://youtube.com/c/HelenLeigh).

## Code

**MakeCode blocks for the body of the Robot Unicorn**

```blocks
radio.onReceivedNumberDeprecated(function (receivedNumber) {
    received = receivedNumber
})
let received = 0
radio.setGroup(1)
received = 4
basic.forever(function () {
    if (received == 0) {
        basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
        pins.analogWritePin(AnalogPin.P0, 100)
        pins.analogWritePin(AnalogPin.P1, 10)
    } else if (received == 1) {
        basic.showLeds(`
            . . # . .
            . . # . .
            # . # . #
            . # # # .
            . . # . .
            `)
        pins.analogWritePin(AnalogPin.P0, 10)
        pins.analogWritePin(AnalogPin.P1, 100)
    } else if (received == 2) {
        pins.analogWritePin(AnalogPin.P0, 20)
        pins.analogWritePin(AnalogPin.P1, 20)
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
    } else if (received == 3) {
        pins.analogWritePin(AnalogPin.P0, 80)
        pins.analogWritePin(AnalogPin.P1, 80)
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
    } else if (received == 4) {
        pins.analogWritePin(AnalogPin.P0, 0)
        pins.analogWritePin(AnalogPin.P1, 0)
        basic.showLeds(`
            # . . . #
            . # . # .
            . . # . .
            . # . # .
            # . . . #
            `)
    }
})

```

**MakeCode blocks for the Robot Unicorn controller**

```blocks
input.onButtonPressed(Button.AB, function () {
    radio.sendNumber(4)
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
})
input.onGesture(Gesture.Shake, function () {
    radio.sendNumber(1)
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
})
input.onGesture(Gesture.LogoDown, function () {
    radio.sendNumber(0)
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
})
input.onGesture(Gesture.TiltRight, function () {
    radio.sendNumber(2)
    basic.showLeds(`
        . . # . .
        . . . # .
        # # # # #
        . . . # .
        . . # . .
        `)
})
input.onGesture(Gesture.TiltLeft, function () {
    radio.sendNumber(3)
    basic.showLeds(`
        . . # . .
        . # . . .
        # # # # #
        . # . . .
        . . # . .
        `)
})
radio.setGroup(1)
radio.setTransmitPower(7)
basic.showLeds(`
    . . # . .
    . # # # .
    # # # # #
    # # # # #
    . # . # .
    `)
```

## Everythin Else

Here's where you can find all the templates you need to make the Robot Unicorn. 

- Template for the main part of the body: [pdf file here](https://github.com/helenleigh/robot-unicorn/blob/master/unicorn%20chassis%20A4.pdf) and [ai file here](https://github.com/helenleigh/robot-unicorn/blob/master/unicorn%20chassis%20A4.ai).
- Template for the top part of the body: [pdf file here](https://github.com/helenleigh/robot-unicorn/blob/master/unicorn%20lid%20a4.pdf) and [ai file here](https://github.com/helenleigh/robot-unicorn/blob/master/unicorn%20lid%20a4.ai).
- Template for the head: [pdf file here](https://github.com/helenleigh/robot-unicorn/blob/master/unicorn%20head%20A4.pdf) and [ai file here](https://github.com/helenleigh/robot-unicorn/blob/master/unicorn%20head%20A4.ai).
- STL file for 3D printing your Robot Unicorn horn [is here](https://github.com/helenleigh/robot-unicorn/blob/master/unicorn%20horn%20solid%20base.stl).

![Robot Unicorn Tail](/static/mb/projects/robot-unicorn/robotunicorntail.jpg)

```package
radio
```