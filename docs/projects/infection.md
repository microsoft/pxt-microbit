# Infection

## ~avatar avatar

There is a disease outbreak! Will you find patient zero?!?

## ~

**Infection** is a distributed game which simulates
the spread of an illness. **The goal is to stop the outbreak before every player dies!**

* **Number of players:** 1 Master and 4, or more, additional players. The Master and all other players need a @boardname@ with battery pack.

In this game, a Master @boardname@ infects a single, initial player ("patient zero")
with the illness. The infected player is contagious immediately but won't show any signs sickness
during the incubation time. The sickness gets transmitted when two @boardname@s get close enough to each other to "contract the disease".
After the incubation period, a sad face appears on the screen. After the sickness period, the player will eventually die and a skull displays on the screen. Dead players are out of the game.

If at least one player survives the outbreak, the game is won. Otherwise, try again!

## ~ hint

**Infection** is an engaging game that will get your students running around.
We recommend playing it outside, or in a large open area, to give more space for the activity.

## ~

## How to play

Press `A+B` to enter Master mode (there's only one Master in a game).

Wait for players to be paired. The number of paired players will display on the screen.
When paired, a letter appears on the player's screen, this letter is the player's identity.

Once all of your players are registered, press `A+B` to start the infection game.
The game randomly picks a player as **patient zero**.

A player will transmit the disease to another player if close enough (detecting a sufficient `RSSI`), and if a certain probability (`TRANSMISSIONPROB`) of disease transfer is reached.
During the incubation phase (`INCUBATION`), the player does not show any sign of illness (happy face).
After that phase, the player gets sick and shows a sad face on the screen. After the sick (sad) face, the player dies and a skull shows up.

Once the game is over, the @boardname@ will show the player's id (`A`, `B`, `C`...), health, and
the id of the player who infected them. The Master @boardname@ will show the identity of patient zero.

Icons used in the game:

* Pairing: `IconNames.Ghost`
* Paired: `IconNames.Happy`
* Dead: `IconNames.Skull`
* Sick: `IconNames.Sad`
* Incubating: `IconNames.Confused`
* Healthy: `IconNames.Happy`

## ~ hint

Take a look at this video to see how the @boardname@ uses radio to spread "disease"
in this game:

https://www.youtube.com/watch?v=Re3H2ISfQE8

## ~

## Project share

### ~ hint

This code uses language features, such as ``switch`` or ``enum``, that are not supported in blocks.
As a result, it will not convert back to blocks.

### ~

## JavaScript code

```typescript
/**
 * Infection game
 *
 * Flash all micro:bits with this script
 *
 * Press A+B to enter master mode (1 per game)
 *
 * Wait for players to be paired. The number of paired player will display on screen.
 * An icon will appear on player's screen.
 *
 * Press A+B to start the infection game. The master will pick a random
 * player as patient zero.
 *
 * A player will transmit the disease if close enough (RSSI)
 * and with a certain probability (TRANSMISSIONPROB).
 * During the incudation phase (INCUBATION), the player does not show any sign
 * of illness. After that phase, the sad face shows up.
 *
 * The game will automatically stop once all players are dead or healthy. The master can
 * also press A+B again to stop the game.
 *
 * Once the game is over, the micro:bit will show the player id (A,B,C...), health and
 * who infected him.
 *
 * Icons used in the game:
 *
 * Pairing: IconNames.Ghost
 * Paired: IconNames.Happy
 * Dead: IconNames.Skull
 * Sick: IconNames.Sad
 * Incubating: IconNames.Confused
 * Healthy: IconNames.Happy
 *
 */
const INCUBATION = 20000 // time before showing symptoms
const DEATH = 40000 // time before dying off the disease
const RSSI = -45 // db
const TRANSMISSIONPROB = 40 // % probability to transfer disease

enum GameState {
    Stopped,
    Pairing,
    Infecting,
    Running,
    Over
}

enum HealthState {
    Healthy,
    Incubating,
    Sick,
    Dead
}

enum MessageKind {
    PairRequest,
    PairConfirmation,
    HealthSet,
    HealthValue,
    InitialInfect,
    TransmitVirus,
    GameState
}

const GameIcons = {
    Pairing: IconNames.Ghost,
    Paired: IconNames.Happy,
    Dead: IconNames.Skull,
    Sick: IconNames.Sad,
    Incubating: IconNames.Confused,
    Healthy: IconNames.Happy
}

class Message {

    private _data: Buffer

    constructor(input?: Buffer) {
        this._data = input || control.createBuffer(13)
    }

    get kind(): number {
        return this._data.getNumber(NumberFormat.Int8LE, 0)
    }

    set kind(x: number) {
        this._data.setNumber(NumberFormat.Int8LE, 0, x)
    }

    get fromSerialNumber(): number {
        return this._data.getNumber(NumberFormat.Int32LE, 1)
    }

    set fromSerialNumber(x: number) {
        this._data.setNumber(NumberFormat.Int32LE, 1, x)
    }

    get value(): number {
        return this._data.getNumber(NumberFormat.Int32LE, 5)
    }

    set value(x: number) {
        this._data.setNumber(NumberFormat.Int32LE, 5, x)
    }

    get toSerialNumber(): number {
        return this._data.getNumber(NumberFormat.Int32LE, 9)
    }

    set toSerialNumber(x: number) {
        this._data.setNumber(NumberFormat.Int32LE, 9, x)
    }

    send() {
        radio.sendBuffer(this._data)
        basic.pause(250)
    }
}

const playerIcons = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
class Player {
    id: number
    icon: number
    health: HealthState
    show() {
        basic.showString(playerIcons[this.icon])
    }
}

// common state
let state = GameState.Stopped

// master state
let master = false
let patientZero: Player
const players: Player[] = []

// player state
let paired = false
let infectedBy = -1 // who infected (playerIcon)
let infectedTime = 0 // local time when infection happened
let playerIcon = -1 // player icon and identity
let health = HealthState.Healthy

// get a player instance (creates one as needed)
function player(id: number): Player {
    for (const p of players)
        if (p.id == id) return p

    // add player to game
    let p = new Player()
    p.id = id
    p.icon = (players.length + 1) % playerIcons.length
    p.health = HealthState.Healthy
    players.push(p)
    serial.writeLine(`player ==> ${p.id}`)

    return p
}

function allDead(): boolean {
    for (const p of players)
        if (p.health != HealthState.Dead) return false
    return true
}

function gameOver() {
    state = GameState.Over
    if (patientZero)
        patientZero.show()
}

function gameFace() {
    switch (state) {
        case GameState.Stopped:
            basic.showIcon(GameIcons.Pairing)
            break
        case GameState.Pairing:
            if (playerIcon > -1)
                basic.showString(playerIcons[playerIcon])
            else
                basic.showIcon(paired ? GameIcons.Paired : GameIcons.Pairing, 1)
            break
        case GameState.Infecting:
        case GameState.Running:
            switch (health) {
                case HealthState.Dead:
                    basic.showIcon(GameIcons.Dead, 1)
                    break
                case HealthState.Sick:
                    basic.showIcon(GameIcons.Sick, 1)
                    break
                default:
                    basic.showIcon(GameIcons.Healthy, 1)
                    break
            }
            break
        case GameState.Over:
            // show id
            basic.showString(playerIcons[playerIcon])
            basic.pause(2000)
            // show health
            switch (health) {
                case HealthState.Dead:
                    basic.showIcon(GameIcons.Dead, 2000)
                    break
                case HealthState.Sick:
                    basic.showIcon(GameIcons.Sick, 2000)
                    break
                case HealthState.Incubating:
                    basic.showIcon(GameIcons.Incubating, 2000)
                    break
                default:
                    basic.showIcon(GameIcons.Healthy, 2000)
                    break
            }
            // show how infected
            if (infectedBy > -1) {
                basic.showString(" INFECTED BY")
                basic.showString(playerIcons[infectedBy])
                basic.pause(2000)
            } else {
                basic.showString(" PATIENT ZERO")
                basic.pause(2000)
            }
            // show score
            game.showScore()
            basic.pause(1000)
            break
    }
}

// master button controller
input.onButtonPressed(Button.AB, function () {
    // register as master
    if (state == GameState.Stopped && !master) {
        master = true
        paired = true
        state = GameState.Pairing
        serial.writeLine("registered as master")
        radio.setTransmitPower(7) // beef up master signal
        basic.showString("0")
        return
    }

    if (!master) return // master only beyond this

    // launch game
    if (state == GameState.Pairing) {
        // pick 1 player and infect him
        patientZero = players[randint(0, players.length - 1)]
        // infecting message needs to be confirmed by
        // the player
        state = GameState.Infecting
        serial.writeLine(`game started ${players.length} players`)
    } // end game
    else if (state == GameState.Running) {
        gameOver()
    }
})

radio.setGroup(42)
radio.onReceivedBuffer(function (receivedBuffer: Buffer) {
    const incomingMessage = new Message(receivedBuffer)
    const signal = radio.receivedPacket(RadioPacketProperty.SignalStrength)
    if (master) {
        switch (incomingMessage.kind) {
            case MessageKind.PairRequest:
                // register player
                let n = players.length
                player(incomingMessage.fromSerialNumber)
                // show player number if changed
                if (n != players.length) {
                    basic.showNumber(players.length)
                }
                break
            case MessageKind.HealthValue:
                let p = player(incomingMessage.fromSerialNumber)
                p.health = incomingMessage.value
                // check if all infected
                if (allDead())
                    gameOver()
                break
        }
    } else {
        switch (incomingMessage.kind) {
            case MessageKind.GameState:
                // update game state
                state = incomingMessage.value as GameState
                break
            case MessageKind.InitialInfect:
                if (infectedBy < 0 &&
                    incomingMessage.toSerialNumber == control.deviceSerialNumber()) {
                    // infected by master
                    infectedBy = 0 // infected my master
                    infectedTime = input.runningTime()
                    health = HealthState.Incubating
                    serial.writeLine(`infected ${control.deviceSerialNumber()}`)
                }
                break
            case MessageKind.HealthSet:
                if (incomingMessage.toSerialNumber == control.deviceSerialNumber()) {
                    const newHealth = incomingMessage.value
                    if (health < newHealth) {
                        health = newHealth
                    }
                }
                break
            case MessageKind.PairConfirmation:
                if (!paired && state == GameState.Pairing &&
                    incomingMessage.toSerialNumber == control.deviceSerialNumber()) {
                    // paired!
                    serial.writeLine(`player paired ==> ${control.deviceSerialNumber()}`)
                    playerIcon = incomingMessage.value
                    paired = true
                }
                break
            case MessageKind.TransmitVirus:
                if (state == GameState.Running) {
                    if (health == HealthState.Healthy) {
                        serial.writeLine(`signal: ${signal}`)
                        if (signal > RSSI &&
                            randint(0, 100) > TRANSMISSIONPROB) {
                            infectedBy = incomingMessage.value
                            infectedTime = input.runningTime()
                            health = HealthState.Incubating
                        }
                    }
                }
                break
            case MessageKind.HealthValue:
                if (health != HealthState.Dead && signal > RSSI) {
                    game.addScore(1)
                }
                break
        }
    }
})

// main game loop
basic.forever(function () {
    let message: Message
    if (master) {
        switch (state) {
            case GameState.Pairing:
                // tell each player they are registered
                for (const p of players) {
                    message = new Message()
                    message.kind = MessageKind.PairConfirmation
                    message.value = p.icon
                    message.toSerialNumber = p.id
                    message.send()
                }
                serial.writeLine(`pairing ${players.length} players`)
                basic.pause(500)
                break
            case GameState.Infecting:
                if (patientZero.health == HealthState.Healthy) {
                    message = new Message()
                    message.kind = MessageKind.InitialInfect
                    message.toSerialNumber = patientZero.id
                    message.send()
                    basic.pause(100)
                } else {
                    serial.writeLine(`patient ${patientZero.id} infected`)
                    // show startup
                    basic.showIcon(GameIcons.Dead)
                    state = GameState.Running
                }
                break
            case GameState.Running:
                for (const p of players) {
                    message = new Message()
                    message.kind = MessageKind.HealthSet
                    message.value = p.health
                    message.toSerialNumber = p.id
                    message.send()
                }
                break
            case GameState.Over:
                if (patientZero)
                    patientZero.show()
                break
        }
        message = new Message()
        message.kind = MessageKind.GameState
        message.value = state
        message.send()
    } else { // player loop
        switch (state) {
            case GameState.Pairing:
                // broadcast player id
                if (playerIcon < 0) {
                    message = new Message()
                    message.kind = MessageKind.PairRequest
                    message.fromSerialNumber = control.deviceSerialNumber()
                    message.send()
                } else if (infectedBy > -1) {
                    message = new Message()
                    message.kind = MessageKind.HealthValue
                    message.fromSerialNumber = control.deviceSerialNumber()
                    message.value = health
                    message.send()
                }
                break
            case GameState.Infecting:
                message = new Message()
                message.kind = MessageKind.HealthValue
                message.fromSerialNumber = control.deviceSerialNumber()
                message.value = health
                message.send()
                break
            case GameState.Running:
                // update health status
                if (health != HealthState.Healthy && input.runningTime() - infectedTime > DEATH)
                    health = HealthState.Dead
                else if (health != HealthState.Healthy && input.runningTime() - infectedTime > INCUBATION)
                    health = HealthState.Sick
                // transmit disease
                if (health == HealthState.Incubating || health == HealthState.Sick) {
                    message = new Message()
                    message.kind = MessageKind.TransmitVirus
                    message.fromSerialNumber = control.deviceSerialNumber()
                    message.value = playerIcon
                    message.send()
                }
                message = new Message()
                message.kind = MessageKind.HealthValue
                message.fromSerialNumber = control.deviceSerialNumber()
                message.value = health
                message.send()
                break
        }
        // show current animation
        gameFace()
    }
})

basic.showIcon(GameIcons.Pairing)
```

```package
radio
```
