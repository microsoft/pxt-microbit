# rotation animation quiz answers

Learn how to create a rotating image with a while loop.

This is the answer key for the [rotation animation quiz](/lessons/rotation-animation/quiz).

## 1. What is a " variable"?

Answers may vary. A variable is a place where you can store data so that you can use it later in your code.

## 2. Write the code to create a ** variable** called `foo` that stores a boolean and initialize it to **false**.



```blocks
let rotating = true;
```

## 3. Explain what this line of code does.

```blocks
let rotating = true;
while (rotating) {
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}

```



<br/>

It is a **while** loop that will be executed only if the ** variable** called `rotating` is **true**.

## 4. If the rectangle below represents the @boardname@, shade the areas that will be displayed. Explain why that particular area is shaded.

```blocks
basic.showLeds(`
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        . . # . .
        `)
basic.showLeds(`
        . . . . .
        . . . . .
        # # # # #
        . . . . .
        . . . . .
        `)
basic.showLeds(`
        . . . . #
        . . . # .
        . . # . .
        . # . . .
        # . . . .
        `)
basic.showLeds(`
        . . . . #
        . . . # .
        . . # . .
        . # . . .
        # . . . .
        `)
   
```



![](/static/mb/lessons/rotation-animation-0.png)

![](/static/mb/lessons/rotation-animation-1.png)

![](/static/mb/lessons/rotation-animation-2.png)

![](/static/mb/lessons/rotation-animation-3.png)

Show animation will show a series of image frames on the LED screen, pausing the specified time (400 milliseconds) after each frame

