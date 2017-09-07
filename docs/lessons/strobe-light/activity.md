# strobe light activity

Develop shapes with a for loop. 

## ~avatar avatar



Welcome! This guided tutorial will teach how to develop shapes with a for loop. Let's get started!

## ~

Create a `for loop` that will loop from 0 to 4 to indicate the x-coordinates of the @boardname@ display.

```blocks
for (let i = 0; i < 5; i++) {
    
}

```

Create another for loop that will loop from 0 to 4, indicating the y-coordinates of the @boardname@ instead. This for loop will light each LED by column.


```blocks
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {

    }
}
```


We will light up each LED by plotting them individually.

```blocks
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        led.plot(i, j)
        basic.pause(200)
    }
}
```


The pause will add a delay between lighting each LED.

```blocks
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        led.plot(i, j)
        basic.pause(200)
    }
}
```

## ~avatar avatar

Excellent, you're ready to continue with the [challenges](/lessons/strobe-light/challenges)!

## ~

