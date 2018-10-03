# Starter Blocks

## ~ hint

Use your blocks knownledge to learn JavaScript faster.

## ~

MakeCode can convert your blocks to JavaScript and back. Start from blocks and jump into JavaScript for an easier start.

## Do it blocks then convert

So you are pretty familiar with the blocks editor and still getting used to JavaScript. MakeCode can convert any block code into JavaScript. Let's see it in action.

* create a simple program in the code editor

```blocks
input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
})
```

* click on the **{} JavaScript** button in the top menu to convert the blocks to JavaScript. Voila!

```typescript
input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
})
```

## Go back to blocks

Do you feel like editing blocks again? MakeCode can convert back your JavaScript code into blocks.

* replace a few dots '.' with hashmarks '#'

```typescript
input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . . . . .
        . . # . .
        . # # # .
        . . # . .
        . . . . .
        `)
})
```

### ~ hint

So you change your JavaScript code and nothing works anymore, there are tons of red squiggle and you don't understand why... Don't panic, use the **Undo** button to revert your changes until everything works again.

### ~

* click on the **Blocks** button in the top to convert the JavaScript back to blocks.

```blocks
input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . . . . .
        . . # . .
        . # # # .
        . . # . .
        . . . . .
        `)
})
```

## Grey blocks are a good sign!

If you start to writing more complex JavaScript (good job!), MakeCode might not be able to convert it back to blocks. In that case, you will see _grey blocks_ in your block code. They represent chunks of JavaScript that are too complicated for blocks.
 
* go back to **JavaScript** and add a second frame to create animation. This is something you can do in JavaScript but not in blocks.

```typescript
input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . . . . .    . . . . . 
        . . # . .    . # # # .
        . # # # .    . # # # .
        . . # . .    . # # # .
        . . . . .    . . . . .
        `)
})
```

* go to the **Blocks** editor and you will see a big **grey** block in the button handler. This is because you are creating code too complex for the blocks. Take it as a compliment!

```blocks
input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        . . . . .    . . . . . 
        . . # . .    . # # # .
        . # # # .    . # # # .
        . . # . .    . # # # .
        . . . . .    . . . . .
        `)
})
```
