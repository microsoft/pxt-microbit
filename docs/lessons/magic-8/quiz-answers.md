# magic 8 quiz answers

create a magic 8 ball on the @boardname@.

## Name

## Directions

Use this activity document to guide your work in the [magic 8 activity](/lessons/magic-8/activity).

Answer the questions while completing the tutorial. Pay attention to the dialogues!

## 1. Define what an 'if statement' is.

<br />

An if statement will conditionally run code depending on whether or not a condition is true.

## 2. Create a Variable called ``x`` and assign it to a random number between 0 and 2.

```blocks
let x = Math.randomRange(0, 3)
```

## 3. Write the 'if statement' to check if ``x`` is equal to 2. Inside the 'if statement', display the string "Yes".

```blocks
let x = Math.randomRange(0, 3)
if (x == 2) {
    basic.showString("Yes", 150)
}
```

## 4. Write the 'if statement' to check if ``x`` is equal to 1. Inside the 'if statement', display the string "No."

```blocks
let x = Math.randomRange(0, 3)
if (x == 2) {
    basic.showString("Yes", 150)
} else if (x == 1) {
    basic.showString("No", 150)
}
```

## 5. Write the code to display the string "I don't know" if the Variable ``x`` is neither 2 nor 1.

```blocks
let x = Math.randomRange(0, 3)
if (x == 2) {
    basic.showString("Yes", 150)
} else if (x == 1) {
    basic.showString("No", 150)
}
else {
    basic.showString("I don't know", 150)
}
```

Note: Students are only required to write the bottom half of this answer (starting with "else").

