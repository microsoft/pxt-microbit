# @extends

## #create

In the ``||variables:Variables||`` category of the **Toolbox** you can create new variable:

![Create a new string variable](/static/blocks/variables/string.gif)

Here's how to create a string variable using the Toolbox:

1. Click ``||variables:Variables||`` in the Toolbox.
2. Click on **Make a Variable...**.
3. Choose a name for your variable, type it in, and click **Ok**.
4. Drag the new ``||variables:set||`` block into your code.
5. Click on the ``||text:Text||`` drawer in the Toolbox and find the ``||text:" "||`` block.
6. Drag the ``||text:" "||`` block into the value slot in of your variable ``||variables:set||`` block.

## Characters you use in strings #custom

### ~ hint

#### Character sets

The available characters to use for a language is called the _character set_. Each character in the set has a number code to match it with.
To display characters on the [LED screen](/device/screen), the @boardname@, uses the "ASCII" character codes of `32` to `126`; letters, digits, punctuation marks, and a few symbols. All other character codes appear as a `?` on the LED screen.

### ~