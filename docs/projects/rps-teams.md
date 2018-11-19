# Rock Paper Scissors Teams

## ~avatar avatar

Massively multi-player rock paper scissors!

## ~

https://youtu.be/8ztOmdZi5Pw
<br/>
Playing rock paper scissors is usually a two player game... but it will work with many more players too!
When playing with more than two players, it becomes a team game: all players shake at the same time, 
then the amount of **rocks**, **paper**, and **scissors** is tallied between all the players. 
Teams are formed automatically based on which tool is chosen by shaking the @boardname@. The team with the most players after the shake wins the game.

Starting with the [basic version of the RPS game](/projects/rock-paper-scissors), we are going
to change the code so that the @boardname@ counts and displays the number of players on a team.
The @boardname@ will use **radio** communication to send its status and receive the status of the other boards.

Let's get started!

## Starting blocks

Let's start out with the code from the original game. The basic version picks one of the tools in an ``||input:on shake||`` event and displays a matching icon. Take a peek at the code below to refresh your memory.

```blocks
let tool = 0
input.onGesture(Gesture.Shake, function() {
    tool = Math.randomRange(0, 2)
    if (tool == 0) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (tool == 1) {
        basic.showIcon(IconNames.Square)
    } else {
        basic.showIcon(IconNames.Scissors)
    }
});
```

## Step 1: Refactoring the rendering

**Refactoring** is a funny word used in coding which pretty much means ``reorganizing``. In this case, we are going to move the code that displays the rock/paper/scissor icon into its own ``||basic:forever||`` loop.

```blocks
let tool = 0
input.onGesture(Gesture.Shake, function() {
    tool = Math.randomRange(0, 2)
})

basic.forever(function() {
    if (tool == 0) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (tool == 1) {
        basic.showIcon(IconNames.Square)
    } else {
        basic.showIcon(IconNames.Scissors)
    }
});
```

## Step 2: Send status via radio

We send the value of ``tool`` over the radio to the other @boardname@ in the ``||basic:forever||`` loop. Since a radio packet may or may not arrive, it's a good idea to keep sending them.

We also set the radio group and send the device serial number (a number that uniquely identifies a @boardname@) as we will need that later.

```blocks
let tool = 0
input.onGesture(Gesture.Shake, function() {
    tool = Math.randomRange(0, 2)
})

basic.forever(function() {
    radio.sendNumber(tool)
    if (tool == 0) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (tool == 1) {
        basic.showIcon(IconNames.Square)
    } else {
        basic.showIcon(IconNames.Scissors)
    }
});
radio.setGroup(10)
radio.setTransmitSerialNumber(true)
```

## Step 3: the team roster

All players are constantly broadcasting to the other players which tool they picked. 
Let's add the code that receives this status and counts it.

We'll add an **[Array](/types/array)** variable that contains all the players on the same team as the current player. This array, named ``players``, is like your team roster: it contains the list of @boardname@ serial numbers that are using the same tool as you.

```block
let players: number[] = [0]
```

## Step 4: Receiving a message (part 1)

In an ``||radio:on received number||`` event, we receive the status from another @boardname@. Click on the **gearwheel** to add the ``serial`` parameter as we will need it to identify who sent that packet.

We compute three values from the data received:

* ``match`` - a boolean value indicating whether or not the tool of the other @boardname@ matches our current tool
* ``player_index`` - the position in the array of the other board's serial number. It will be `-1` if it is not in the array
* ``found`` - a boolean value indicating whether or not the @boardname@ serial number is part of the ``players`` array

```blocks
let match = false
let player_index = 0
let players: number[] = [0]
let tool = 0
let found = false
let serialNumber = 0;
radio.onReceivedNumber(function (receivedNumber) {
    serialNumber = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    match = tool == receivedNumber
    player_index = players.indexOf(serialNumber)
    found = player_index >= 0
})
```

## Step 5: Receiving a message (part 2)

There are two cases that we need to handle when looking at ``match`` and ``found``:

* **if** we have a ``match`` **and** the player is ``not found`` in the list, **then** we **add** it to ``players``
* **if** we don't have a ``match`` **and** the player is ``found`` in the list, **then** we **remove** it from ``players``

We turn the two rules above into two ``||logic:if then||`` statements where the serial number is added or removed.

```blocks
let match = false
let player_index = 0
let players: number[] = [0]
let tool = 0
let found = false
let temp = 0
let serialNumber = 0;
radio.onReceivedNumber(function (receivedNumber) {
    serialNumber = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    match = tool == receivedNumber
    player_index = players.indexOf(serialNumber)
    found = player_index >= 0
    if (match && !(found)) {
        players.push(serialNumber)
    } 
    if (!(match) && found) {
        temp = players.removeAt(player_index)
    }
})
```

## Step 6: Resetting the team

What if some of the other players leave the game? They would stop broadcasting their status but would still stay in our list of players. To avoid this problem, we reset the ``players`` array each time we shake:

```block
input.onGesture(Gesture.Shake, function() {
    let players: number[] = [0]
    let tool = Math.randomRange(0, 2)
})
```

## Step 7: Showing team score

The team score is the number of players in that team... which is really just the ``length`` of the ``players`` array. We add a ``||basic:show number||`` block in the ``||basic:forever||`` loop to display it.

```block
let players: number[] = [0]
let tool = 0
basic.forever(function() {
    basic.showNumber(players.length)
})
```

## The final code

Now, it's time to glue together all the pieces of our program. 
Go carefully through all the steps and assemble the various features. Eventually, it should look
like the following program here. Download and play it with your friend**ssss**!

```blocks
let temp = 0
let found = false
let player_index = 0
let tool = 0
let match = false
let players: number[] = []
let serialNumber = 0;
radio.onReceivedNumber(function (receivedNumber) {
    serialNumber = radio.receivedPacket(RadioPacketProperty.SerialNumber)
    match = tool == receivedNumber
    player_index = players.indexOf(serialNumber)
    found = player_index >= 0
    if (match && !(found)) {
        players.push(serialNumber)
    }
    if (!(match) && found) {
        temp = players.removeAt(player_index)
    }
})
input.onGesture(Gesture.Shake, function() {
    players = [0]
    tool = Math.randomRange(0, 2)
})
basic.forever(function() {
    radio.sendNumber(tool)
    if (tool == 0) {
        basic.showIcon(IconNames.SmallSquare)
    } else if (tool == 1) {
        basic.showIcon(IconNames.Square)
    } else {
        basic.showIcon(IconNames.Scissors)
    }
    basic.showNumber(players.length)
})
players = [0]
radio.setGroup(10)
radio.setTransmitSerialNumber(true)
```

```package
radio
```
