# Starter Blocks

## ~ hint

Use your knowledge of blocks to learn JavaScript faster.

## ~

MakeCode can convert your blocks to JavaScript and back. Start your program with blocks and then jump into JavaScript as an easy way to begin working in the code.

## Do it blocks then convert

So you are pretty familiar with the blocks editor and still getting used to JavaScript? MakeCode can convert any block code into JavaScript. Let's see it in action.

* Create a simple program in the code editor.

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

* Click on the **{} JavaScript** button in the top menu to convert the blocks to JavaScript. Voila!

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

Do you want to go back to editing with blocks again? MakeCode can convert your JavaScript code back into blocks.

* Replace a few dots `.` with hash marks `#`.

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

Well, you changed your JavaScript code and nothing works anymore. You see gobs of red squiggles and you don't understand why... Don't panic, use the **Undo** button to revert your changes until everything works again.

### ~

* Click on the **Blocks** button in the top to convert the JavaScript back to blocks.

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

If you start to write more complex JavaScript (it's great that you are!), MakeCode might not be able to convert it back to blocks. In that case, you will see _grey blocks_ in your block code. They represent chunks of JavaScript that are too complicated for blocks.
 
* Go back to **JavaScript** and add a second frame to create animation. This is something you can do in JavaScript but not in blocks.

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

* Go to the **Blocks** editor and you will see a big **grey** block in the button handler. This is because you are creating code too complex for the blocks. Take it as a compliment!

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
