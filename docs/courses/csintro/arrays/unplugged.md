## Unplugged: Different sorts of people

In this activity, you will demonstrate different kinds of sorting methods on your own students. This is an unplugged activity, so your students will be standing at the front of the room.  If you or your students are curious to see what these different sorts look like in code, we have included a MakeCode version of each algorithm in this lesson, for you to explore if you choose.
 
## Materials

* Sheets of paper numbered 1–10, one large printed number to a page

## Set Up

* Have up to ten students (the Sortees) stand up at the front of the classroom. Ask another student to volunteer to be the Sorter.
* Mix up the order of the papers and give each student a piece of paper with a number on it. They should hold the paper facing outward so their number is visible. Each of these students is like an element in an array.

![Illustration of line of students representing an array](/static/courses/csintro/arrays/sorts-people.png)
 
## Initial Sort

* Ask the Sorter to place the students in order by directing them to move, one at a time, to the proper place.
* Once the students are sorted, ask students the following:

>*  How did she sort you into the right order? 
* Did you see a pattern? 
* What did she do?
 
Try to get students to be as precise as possible in explaining their thinking. Sometimes it helps to put the steps on the board, in an algorithm:
* _First, she went to the first student, then put him in the right place._
* _Then she went to each of the next students and put them in the right place._
 
Ask for clarification when necessary: _What does it mean when you say “put them in the right place”?_
 
_To Put Someone in the Right Place:_

_Bring the person to the front of the line and then compare that person’s number with the first person’s number. If it’s larger, then move that person to the right. K eep doing this as long as the person’s number is larger than the person on the right._
 
## Some Different Types of Sorts
In computer science, there are certain common strategies, or algorithms, for sorting a collection of values. Try acting out each of these different sorts with your students.
 
### Bubble Sort
Compare the first two students. If the student on the right is smaller than the student on the left, they should swap places. Then compare the second and third students. If the student on the right is smaller than the student on the left, they should swap places. When you reach the end, start over at the beginning again. Continue in this way until you make it through the entire row of students without swapping anybody.
 
#### In pseudocode:
1. Create a variable called counter.
2. Set the counter to zero.
3. Go through the entire array.
4. If the value you are considering is greater than the value to its right:
>1. Swap them
>2. Add one to counter
5. Repeat steps 2 through 4 as long as counter is greater than zero.
 
![Bubble Sort Animation](/static/courses/csintro/arrays/bubble-sort.gif)

#### In MakeCode:

**Note:** Press B to display the array visually. The length of each vertical bar represents each number in the array, from left to right. Press A to sort the array using Bubble Sort. Press A + B to generate new random numbers for the array.

```blocks
let temp = 0
let row = 0
let list: number[] = []
let counter = 0
let column = 0
let index = 0
input.onButtonPressed(Button.AB, () => {
    for (let index = 0; index <= 4; index++) {
        list[index] = Math.randomRange(0, 5) + 1
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

### Selection Sort
Take the first student on the left and consider that person’s number the smallest number you have found so far. If the next person in line has a number that is smaller than that number, then make that person’s number your new smallest number and continue in this way until you reach the end of the line of students. Then, move the person with the smallest number all the way to the left. Then start over from the second person in line. Keep going, finding the smallest number each time, and making that person the rightmost person in the sorted line of students.
 
#### In pseudocode:
1. Find the smallest unsorted value in the array.
2. Swap that value with the first unsorted value in the array.
3. Repeat steps 1 and 2 while the number of unsorted items is greater than zero.

![Selection Sort Animation](/static/courses/csintro/arrays/selection-sort.gif)

#### In MakeCode:

**Note:** The inner loop gets smaller as the sorting algorithm runs because the number of unsorted items decreases as you go. The index that the inner loop starts at needs to change as the number of sorted items increases, which is why we have to use a separate counter (item) and compute j every time through the inner loop.

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
        list[index] = Math.randomRange(0, 5) + 1
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
Take the first student on the left and consider that person sorted. Next, take the next student and compare him to the first student in the sorted section. If he is greater than the first student, then place him to the right of the student in the sorted section. Otherwise, place him to the left of the student in the sorted section. Continue down the line, considering each student in turn and then moving from left to right along the students in the sorted section until you find the proper place for each student to go, shifting the other students to the right to make room.
 
#### In pseudocode:
1. For each element in the unsorted section of the list, compare it against each element in the sorted section of the list until you find its proper place.
2. Shift the other elements in the sorted list to the right to make room.
3. Insert the element into its proper place in the sorted list.

![Insertion Sort Animation](/static/courses/csintro/arrays/insertion-sort.gif)

#### In MakeCode:

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
        list[index] = Math.randomRange(0, 5) + 1
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
