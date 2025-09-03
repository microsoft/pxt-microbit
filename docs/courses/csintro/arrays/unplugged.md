## Unplugged: Different sorts

This activity asks you to carefully consider something that comes naturally to you: sorting objects.
 
## Materials

* Pieces of paper numbered 1–10
 
## Initial Sort

* Mix up the order of the numbered pieces of paper. Then, put them in a line.
* Place the pieces in numberical order: but you must do this by moving **only one piece of paper at a time** to its proper place.
* Once the papers have been sorted, ask yourself the following:
>* How did you sort the papers into the right order?
>* Did you see a pattern?
>* What **exactly** did you do?

Try to be as precise as possible in explaining their thinking. Sometimes it helps to write the steps down, as an algorithm:

* _First, I went to the largest number, then put it in the right place._
* _Then I went to each of the next largest numbers and put them in the right place._

Think about how you would explain this sorting process you just did to a computer, which can only understand and execute specific commands.

## Some Different Types of Sorts
In computer science, there are certain common strategies, or algorithms, for sorting a collection of values. Try acting out each of these different sorts with the pieces of paper from earlier. We’ll demonstrate three sorting strategies:

* Bubble sort
* Selection sort
* Insertion sort
 
### Bubble Sort
In a bubble sort, each consecutive pair of values is compared and the larger value is swapped to the right. As multiple passes over the array occur, the larger values “bubble” up towards one end, like bubbles in a fizzy pop. Because you have to compare the same pairs of numbers repeatedly, bubble sort is not terribly efficient—although it does have the advantage that if you make a complete pass comparing every consecutive pair and no swaps occur, you can preemptively declare the array sorted and your task is done.

### Selection Sort
In a selection sort, multiple passes over the array are made to determine the smallest number on that pass. That smallest number is then swapped with the number on the end, and the next pass over the remaining unsorted numbers occurs. Because there is no way to tell if you have finished early, selection sort will always take the same number of passes as the number of elements in the array to complete. So, it is even slower than bubble sort, on average.

### Insertion Sort
Imagine that we’re sorting a pile of papers alphabetically. We might place the top paper to the side, starting a new pile, and consider it sorted. Then, we would take the next paper and place it either before or after the previous paper in the sorted pile depending on whether that paper comes before or after it in the alphabet. Every subsequent paper that comes off the unsorted pile we would place right where it belongs in the sorted pile. That way, we only touch each paper once, and after one pass through the array, we are done. At first this seems more efficient than bubble sort and selection sort, but as the sorted pile grows larger, the number of comparisons we have to make to place each paper in the right place also increases. So, insertion sort actually isn’t any more efficient than the other two methods, although it is probably closest to the way a human being would sort an array of elements.
 
### Bubble sort algorithm

Follow these steps to demonstrate a bubble sort:

1. Compare the first two papers. If the piece of paper on the right has a smaller number than the paper on the left, they should swap places.
2. Next, compare the second and third papers. If the paper on the right has a smaller number than the paper on the left, they should swap places.
3. When you reach the end, start at the beginning again.
4. Continue in this way until you make it through the entire row of numbers without swapping any of them.

![Bubble Sort Animation](/static/courses/csintro/arrays/bubble-sort.gif)

#### In MakeCode:

To code a bubble sort, the pseudocode could look like this:

1. Create a variable called **counter**.
2. Set the counter to **0**.
3. Go through the entire array.
4. If the value you are considering is greater than the value to its right, swap them and add one to counter.
5. Repeat steps 2 through 4 as long as counter is greater than zero.

Following is an example in MakeCode:

* Press B to display the array visually. The length of each vertical bar represents each number in the array from left to right.
* Press A to sort the array using Bubble Sort.
* Press A + B to generate new random numbers for the array.

```blocks
let temp = 0
let row = 0
let list: number[] = []
let counter = 0
let column = 0
let index = 0
input.onButtonPressed(Button.AB, () => {
    for (let index = 0; index <= 4; index++) {
        list[index] = randint(0, 5) + 1
    }
})
input.onButtonPressed(Button.B, () => {
    basic.clearScreen()
    for (let column = 0; column <= 4; column++) {
        row = 0
        while (row < list[column]) {
            led.plot(column, 4 - row)
            row += 1
        }
    }
})
input.onButtonPressed(Button.A, () => {
    while (counter > 0) {
        counter = 0
        for (let index = 0; index <= 3; index++) {
            if (list[index] > list[index + 1]) {
                temp = list[index]
                list[index] = list[index + 1]
                list[index + 1] = temp
                counter += 1
            }
            basic.clearScreen()
            for (let column = 0; column <= 4; column++) {
                row = 0
                while (row < list[column]) {
                    led.plot(column, 4 - row)
                    row += 1
                }
                basic.pause(100)
            }
        }
    }
})
basic.showLeds(`
    # # # . .
    # . . # .
    # # # . .
    # . . # .
    # # # . .
    `)
list = [4, 2, 5, 1, 3]
counter = 1
```

### Selection Sort algorithm
Follow these steps to demonstrate a selection sort:

1. Take the first paper on the left and consider that paper's number the smallest number you have found so far.
2. If the next paper in line has a number that is smaller than that number, make that paper's number your new smallest number and continue in this way until you reach the end of the line of papers.
3. Move the paper with the smallest number all the way to the left.
4. Start over from the second paper in line.
5. Keep going, finding the smallest number each time, and making that paper the rightmost paper in the sorted line of papers.

![Selection Sort Animation](/static/courses/csintro/arrays/selection-sort.gif)

#### In MakeCode:

To code a selection sort, the pseudocode could look like this:

1. Find the smallest unsorted value in the array.
2. Swap that value with the first unsorted value in the array.
3. Repeat steps a and b while the number of unsorted items is greater than zero.

Following is an example in MakeCode:

* The inner loop gets smaller as the sorting algorithm runs because the number of unsorted items decreases as you go.
* The index that the inner loop starts at needs to change as the number of sorted items increases, which is why we have to use a separate counter (item) and compute j every time through the inner loop

```blocks
let temp = 0
let j = 0
let min = 0
let row = 0
let list: number[] = []
let item = 0
let column = 0
input.onButtonPressed(Button.B, () => {
    basic.clearScreen()
    for (let column = 0; column <= 4; column++) {
        row = 0
        while (row < list[column]) {
            led.plot(column, 4 - row)
            row += 1
        }
    }
})
input.onButtonPressed(Button.AB, () => {
    for (let index = 0; index <= 4; index++) {
        list[index] = randint(0, 5) + 1
    }
})
input.onButtonPressed(Button.A, () => {
    item = 1
    for (let i = 0; i <= 3; i++) {
        min = i
        for (let inner = 0; inner <= 3 - i; inner++) {
            j = inner + item
            if (list[j] < list[min]) {
                min = j
            }
        }
        if (min != i) {
            temp = list[min]
            list[min] = list[i]
            list[i] = temp
        }
        item += 1
        basic.clearScreen()
        for (let column = 0; column <= 4; column++) {
            row = 0
            while (row < list[column]) {
                led.plot(column, 4 - row)
                row += 1
            }
            basic.pause(100)
        }
    }
})
basic.showLeds(`
    . . # # .
    . # . . .
    . . # . .
    . . . # .
    . # # . .
    `)
list = []
list = [4, 2, 5, 1, 3]
min = 1
```

### Insertion Sort
Follow these steps to demonstrate an insertion sort:

1. Take the first paper on the left and consider that paper sorted.
2. Take the next paper and compare its number to the first paper in the sorted section. If its number is greater than the first paper's, then place it to the right of the paper in the sorted section. Otherwise, place it to the left of the paper in the sorted section.
3. Continue down the line, considering each paper in turn and then moving from left to right along the papers in the sorted section until you find the proper place for each paper to go, shifting the other papers to the right to make room.

#### In MakeCode:

To code an insertion sort, the pseudocode could look like this:

1. For each element in the unsorted section of the list, compare it against each element in the sorted section of the list until you find its proper place.
2. Shift the other elements in the sorted list to the right to make room.
3. Insert the element into its proper place in the sorted list.

Following is an example in MakeCode:

```blocks
let j = 0
let row = 0
let element = 0
let list: number[] = []
input.onButtonPressed(Button.A, () => {
    for (let i = 0; i <= 4; i++) {
        element = list[i]
        j = i
        while (j > 0 && list[j - 1] > element) {
            list[j] = list[j - 1]
            j += -1
            list[j] = element
        }
        basic.clearScreen()
        for (let column2 = 0; column2 <= 4; column2++) {
            row = 0
            while (row < list[column2]) {
                led.plot(column2, 4 - row)
                row += 1
            }
            basic.pause(100)
        }
    }
})
input.onButtonPressed(Button.AB, () => {
    for (let index = 0; index <= 4; index++) {
        list[index] = randint(0, 5) + 1
    }
})
input.onButtonPressed(Button.B, () => {
    basic.clearScreen()
    for (let column = 0; column <= 4; column++) {
        row = 0
        while (row < list[column]) {
            led.plot(column, 4 - row)
            row += 1
        }
    }
})
list = []
basic.showLeds(`
    . # # # .
    . . # . .
    . . # . .
    . . # . .
    . # # # .
    `)
list = []
list = [4, 2, 5, 1, 3]
j = 1
```

## Sidebar

In 2008, Illinois Senator Barack Obama was interviewed by Google’s CEO Eric Schmidt, who asks him a computer science interview question. Watch as the interview doesn’t go exactly as planned…

https://www.youtube.com/watch?v=k4RRi_ntQc8
[Barack Obama interviewed by Eric Schmidt](https://www.youtube.com/watch?v=k4RRi_ntQc8)
