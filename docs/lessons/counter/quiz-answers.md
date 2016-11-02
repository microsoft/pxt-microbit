# counter quiz answers 

Learn how to create a counter with the @boardname@ button. 

This is the answer key for the [counter quiz](/lessons/counter/quiz).

## 1. What is a variable?

Answers may vary but a variable is a place where you can store and retrieve data

## 2. Draw the stored value for the variable called count

```blocks
let count = 0
```

![](/static/mb/lessons/counter-0.png)

We create a **variable**, `count` to keep track of the current count. The number 0 is stored into memory of the variable.

<br/>

## 3. Draw which LEDs are ON after running this code and pressing button "A" once. Explain you chose to draw that number

```blocks
let count = 0
input.onButtonPressed(Button.A, () => {
    count = count + 1
    basic.showNumber(count)
})
```

![](/static/mb/lessons/counter-1.png)

We are only pressing on button pressed once. So the number to display on the @boardname@ is also one.

<br/>

## 4. Draw which LEDs are ON after running this code and pressing button "A" three times. Explain you chose to draw that number

```blocks
let count = 0
input.onButtonPressed(Button.A, () => {
    count =  + 1
    basic.showNumber(count)
})
```

![](/static/mb/lessons/counter-2.png)

We included the code ``on button pressed("A")`` that runs each time the user presses A. The code increments `count` by `1`. We increase `count` by 1 whenever the user presses the button. So the third time the A button is pressed on the @boardname@, the number 3 is displayed

<br/>

