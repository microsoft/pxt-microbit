let levelTime: number
let person: Entity
let monsters: Entity[]
let totalMonsters: number
let playing: boolean
let gameSuspended: boolean
let busyPos: Point[]

class Entity {
    public x: number
    public y: number
    public dirX: number
    public dirY: number
    public hitHorizontalWall(): boolean {
        return this.y == 0 && this.dirY == -1 || this.y == 4 && this.dirY == 1
    }

    public hitVerticalWall(): boolean {
        return this.x == 0 && this.dirX == -1 || this.x == 4 && this.dirX == 1
    }

    public possHorizontalDir(): number {
        if (this.x == 0) {
            return 1
        } else if (this.x == 4) {
            return - 1
        } else {
            return Math.randomInt(2) * 2 - 1
        }
    }

    public possVerticalDir(): number {
        if (this.y == 0) {
            return 1
        } else if (this.y == 4) {
            return - 1
        } else {
            return Math.randomInt(2) * 2 - 1
        }
    }

    public collidesX(p2: Entity): boolean {
        return this.y == p2.y && this.y + this.dirY == p2.y + p2.dirY && (this.x + this.dirX == p2.x || this.x + this.dirX == p2.x + p2.dirX || p2.x + p2.dirX == this.x)
    }

    public collidesY(p2: Entity): boolean {
        return this.x == p2.x && this.x + this.dirX == p2.x + p2.dirX && (this.y + this.dirY == p2.y || this.y + this.dirY == p2.y + p2.dirY || p2.y + p2.dirY == this.y)
    }

    public move1() {
        this.x = this.x + this.dirX
        this.y = this.y + this.dirY
    }

    public towardsX(p2: Entity): number {
        return Math.sign(p2.x - this.x)
    }

    public towardsY(p2: Entity): number {
        return Math.sign(p2.y - this.y)
    }

    public plot() {
        led.plot(this.x, this.y)
    }

    public blink() {
        led.plot(this.x, this.y)
        basic.pause(125)
        led.unplot(this.x, this.y)
        basic.pause(125)
        led.plot(this.x, this.y)
    }

}

class Point {
    public x: number
    public y: number
}

initializeState()
redraw()
basic.pause(1000)
basic.forever(() => {
    levelTime = levelTime + 12
    basic.pause(12)
    if (!playing) {
        levelTime = 0
        playing = true
    }
    if (levelTime >= 5000) {
        gameSuspended = true
        game.levelUp()
        levelUp()
        levelTime = 0
        resetState()
        redraw()
        basic.pause(1000)
        gameSuspended = false
    }
})
basic.forever(() => {
    if (!gameSuspended) {
        logic()
        redraw()
        basic.pause(500)
    }
})
input.onButtonPressed(Button.A, () => {
    let temp = Math.abs(person.dirX) * (-1)
    person.dirX = Math.abs(person.dirY) * (-1)
    person.dirY = temp
})
input.onButtonPressed(Button.B, () => {
    let temp1 = Math.abs(person.dirX)
    person.dirX = Math.abs(person.dirY)
    person.dirY = temp1
})

function redraw() {
    basic.clearScreen()
    person.plot()
    for (let i = 0; i < totalMonsters; i++) {
        monsters[i].blink()
    }
}

function initializeState() {
    person = new Entity()
    playing = false
    busyPos = ([] as Point[])
    let busyPos1 = new Point()
    busyPos1.x = 1
    busyPos1.y = 1
    let busyPos2 = new Point()
    busyPos2.x = 1
    busyPos2.y = 3
    let busyPos3 = new Point()
    busyPos3.x = 3
    busyPos3.y = 1
    busyPos.push(busyPos1)
    busyPos.push(busyPos2)
    busyPos.push(busyPos3)
    monsters = ([] as Entity[])
    addMonster()
    resetState()
}

function logic() {
    if (person.hitHorizontalWall()) {
        person.dirY = 0
        person.dirX = person.possHorizontalDir()
    }
    if (person.hitVerticalWall()) {
        person.dirX = 0
        person.dirY = person.possVerticalDir()
    }
    let lost = false
    for (let i = 0; i < totalMonsters; i++) {
        let m = monsters[i]
        m.dirX = m.towardsX(person)
        m.dirY = m.towardsY(person)
        if (m.dirX != 0 && m.dirY != 0) {
            let x = Math.randomInt(2)
            if (x == 1) {
                m.dirX = 0
            } else {
                m.dirY = 0
            }
        }
        if (person.collidesX(m) || person.collidesY(m)) {
            lost = true
        }
    }
    if (!lost) {
        moveAll()
    } else {
        loseLife()
    }
}

function loseLife() {
    moveAll()
    basic.pause(500)
    basic.showLeds(`
        . # . # .
        . . # . .
        . . . . .
        . # # # .
        # . . . #
        `, 400)
    basic.pause(1000)
    basic.clearScreen()
    game.removeLife(1)
    playing = false
    resetState()
}

function moveAll() {
    person.move1()
    for (let i = 0; i < totalMonsters; i++) {
        monsters[i].move1()
    }
}

function addMonster() {
    let m = new Entity()
    monsters.push(m)
    totalMonsters = totalMonsters + 1
}

function levelUp() {
    addMonster()
}

function resetState() {
    levelTime = 0
    game.setLife(5)
    person.x = 4
    person.y = 4
    person.dirX = -1
    person.dirY = 0
    for (let i = 0; i < totalMonsters; i++) {
        let busy = busyPos[i]
        let m = monsters[i]
        m.x = (busy.x + Math.randomInt(3)) - 1
        m.y = (busy.y + Math.randomInt(3)) - 1
    }
}
