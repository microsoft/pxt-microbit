# Introduction

Any collector of coins, fossils, or baseball cards knows that at some point you need to have a way to organize everything so you can find things.  For example, a rock collector might have a tray of specimens numbered like this:

![Rock collection is an array](/static/courses/csintro/arrays/rock-collection.png)

Every rock in the collection needs its own storage space, and a unique address so you can find it later.
 
As your MakeCode programs get more and more complicated, and require more variables to keep track of things, you will want to find a way to store and organize all of your data.  MakeCode provides a special category for just this purpose, called an Array.
 
* Arrays can store numbers, strings (words), or sprites. They can also store musical notes. 
* Every spot in an array can be identified by its index, which is a number that corresponds to its location in the array. The first slot in an array is index 0, just like our rock collection above. 
* The length of an array refers to the total number of items in the array, and the index of the last element in an array is always one less than its length (because the array numbering starts at zero.)
 
In MakeCode, you can create an array by assigning it to a variable.  The Array blocks can be found under the Advanced Toolbox menu.

![Arrays block menu](/static/courses/csintro/arrays/arrays-menu.png)

```blocks
let list = [4, 2, 5, 1, 3]
```

The code above creates an empty array called list, then fills it with five numbers, indexed from 0 to 4. The index of the first value (4) is 0. The index of the second value (2) is 1. The index of the last value (3) is 4. 
 
You can get items out of the array by specifying its index like this:

```blocks
let list = [4, 2, 5, 1, 3]

input.onButtonPressed(Button.A, () => {
    basic.showNumber(list[0])
})
``` 
The code above takes the first element in the array (the value at index 0) and shows it on the screen.
 
There are lots of other blocks in the Arrays Toolbox drawer. The next few Activities will introduce you to them. 
 
## Discussion

* Ask your students if any of them collects anything. What is it? Comic books, cards, coins, stamps, books, etc.
* How big is the collection? 
* How is it organized? 
* Are the items sorted in any way? 
* How would you go about finding a particular item in the collection?
 
In the discussion, see if you can explore the following array vocabulary words in the context of kids’ personal collections.
* Length: the total number of items in the collection
* Sort: Items in the collection are ordered by a particular attribute (e.g., date, price, name)
* Index: A unique address or location in the collection
* Type: The type of item being stored in the collection
 
## References

Once you start saving lots of different values in an array, you will probably want to have some way to sort those values. Many languages already implement a sorting algorithm that students can call upon as needed. However, understanding how those different sorting algorithms work is an important part of computer science, and as students go on to further study they will learn other algorithms, as well as their relative efficiency. 

There are some good array sorting videos:
* Visually displays a number of different types of sorts: https://www.youtube.com/watch?v=kPRA0W1kECg
* Bubble-sort with Hungarian folk dance: https://youtu.be/lyZQPjUT5B4
* Select-sort with Gypsy folk dance: https://youtu.be/Ns4TPTC8whw
* Insert-sort with Romanian folk dance: https://youtu.be/ROalU379l3U