# Create and Use Libraries

Libraries are scripts with functions that you can use in other scripts.

### @parent javascript/language

Libraries are scripts with functions that you can use in other scripts. For example, `game` is a library of game-related functions that you can use in your scripts.

Benefits of using libraries:

* **reuse code** between scripts
* **collaborate** with other people on a project by combining scripts into a library

### Add a library

To add a library to a script:

1. Open a script in the [Touch Develop editor](/js/editor) and then click `script` (in the upper-right corner).

2. Click `+` **add new**.

3. Click `library`.

4. Choose the library you want to use or search for a library (such as `game`).

Once you've added a library to your script, you can use any of the library's non-private [functions](/js/function). Here's how:

* on the [Code Keyboard](/js/editor) click the button with the library's name (for example, `@boardname@` and `@boardname@ game` are library buttons). The functions in the library have a button on the Code Keyboard.

### Create a library

Creating and publishing a script as a library is easy. Here's how:

1. Open a script in the [Touch Develop editor](/js/editor), and then click `script`.

2. Click the script name to open the script properties.

3. Mark the `this script is a library` check box.

4. Click `script`.

5. Click `publish`.

Once a script is marked as a _library_ and published, it's immediately available to other people.

### Visibility

The following library items are not accessible by other scripts:

* data (global variables)
* functions marked as `private`

If you want to access global library variables from other scripts, you need to create [functions](/js/function) that pass values in and out of the library script.

### Library and function documentation

Be sure to document the purpose of your functions and libraries. Add a [comment](/js/comment) at the beginning of a library to describe the purpose of the library.

Use [comments](/js/comment) at the beginning of your [functions](/js/function) to describe the function's purpose. Comment text shows in the help area of the Code Keyboard when you insert the function.

### See also

[functions](/js/function), [Touch Develop Documentation](/js/contents)

