# digital pet quiz answers

A display of pet images for the @boardname@ 

## Name

## Directions

Use this activity document to guide your work in the [digital pet tutorial](/lessons/digital-pet/tutorial)

Answer the questions while completing the tutorial. Pay attention to the dialogues!

## 1. What is a 'function'?

<br/>

A function is a unit of code that performs a specific task and may return a result.

## 2. Write the steps to create the function called set awake()

<br/>

Click on "+ add new" and then "function". Click on the function name (by default it is "set awake"), and rename it to "set awake()".

## 3. Write the code inside the function "set awake()" that shows an image of the pet awake

<br/>

```
let img = images.createImage(`
. # . # .
. . # . .
. . . . .
. # # # .
. . . . .
`)
img.showImage(0)
```

## 4. Write the steps to create the function called set sleep, function set sleep()

<br/>

Click on "+ add new" and then "function". Click on the function name (by default it is "set sleep"), and rename it to "set sleep()".

## 5. Write the code inside the function "set sleep()" that shows an image of the pet asleep

<br/>

```
img = images.createImage(`
# # . # #
. . # . .
. . . . .
. # # # .
. . . . .
`)
img.showImage(0)
```

