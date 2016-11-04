# counter quiz 

Learn how to create a counter with the @boardname@ button. 

## Name

## Directions

Use this activity document to guide your work in the [counter tutorial](/lessons/counter/activity).

Answer the questions while completing the tutorial. Pay attention to the dialogues!

## 1. What is a variable?

<br/>

## 2. Draw the stored value for the variable called count

```blocks
let count = 0
```

![](/static/mb/empty-microbit.png)

<br/>

## 3. Draw which LEDs are ON after running this code and pressing button "A" once. Explain you chose to draw that number

```blocks
let counts = 0
input.onButtonPressed(Button.A, () => {
    counts = counts + 1
    basic.showNumber(counts, 150)
})
```

![](/static/mb/empty-microbit.png)

<br/>

## 4. Draw which LEDs are ON after running this code and pressing button "A" three times. Explain you chose to draw that number

```blocks
let counting= 0
input.onButtonPressed(Button.A, () => {
    counting = counting + 1
    basic.showNumber(counting, 100)
})
```

![](/static/mb/empty-microbit.png)

<br/>

