# Activity: Installing a program

**micro:bit activity:** Installing a Microsoft MakeCode Program on the micro:bit

**Objective:** Learn how to download programs from the MakeCode tool.

**Overview:** Students will create a simple program in Microsoft MakeCode and download it to their micro:bit using a USB cable.

For this activity, students will each need a micro:bit, a micro-USB cable, a computer, and a battery pack.

![micro:bit kit](/static/courses/csintro/making/microbit-kit.jpg)

Open a browser window to [makecode.com](https://makecode.com), and select the micro:bit code editor

![micro:bit card icon](/static/courses/csintro/making/microbit-card-icon.png)

Create this program by dragging out blocks from the ``||basic:Basic||`` Toolbox category. Put the ``||basic:show icon||`` and ``||basic:pause||`` blocks in the ``||basic:forever||`` loop. Type in `5000` for the time in each ``||basic:pause||``. Set one icon to a ``Happy`` face and the other to a ``Sad`` face. It shows a repeating series of faces:


```blocks
basic.forever(() => {
   basic.showIcon(IconNames.Happy)
   basic.pause(5000)
   basic.showIcon(IconNames.Sad)
   basic.pause(5000)
})
```

At the bottom of of the editor, name the project as "Happy Sad Face" and click on the disk icon to save the project.

![Save file](/static/courses/csintro/making/happy-sad-file.jpg)

Now, click on **Home** to go back to the home screen.

At  the right of **My Projects** on the home screen, click on the **Import** button and then click on **Import File** in the import dialog. Select the file that you just saved to your computer in the previous step.

![Import button](/static/courses/csintro/making/import-button.png)

![Import file](/static/courses/csintro/making/import-file.png)

The program should again look like the following in MakeCode:

```blocks
basic.forever(() => {
   basic.showIcon(IconNames.Happy)
   basic.pause(5000)
   basic.showIcon(IconNames.Sad)
   basic.pause(5000)
})
```

## Tour of Microsoft MakeCode

* **Simulator**	 - on the left side of the screen, you will see a virtual micro:bit that will show what your program will look like running on a micro:bit. This is helpful for debugging, and instant feedback on program execution.
* **Toolbox** - in the middle of the screen, there are a number of different categories, each containing a number of blocks that can be dragged into the programming workspace on the right. 
* **Workspace** - on the right side of the screen is the Programming Workspace where you will create your program.  Programs are constructed by snapping blocks together in this area.

![IDE tour](/static/courses/csintro/making/ide-tour.png)

The features highlighted here are:

1. Go to the **Home Screen** to start a new project or open an existing project
2. **Simulator** shows what your program will look like when running on a @boardname@
3. **Hide** or **Show** the simulator pane
4. Program in either **Blocks** or **JavaScript**
5. Programming **Workspace** where you will build you program
6. Blocks **Toolbox**
7. **Download** your program to the @boardname@
8. Name your project and **Save** it on your computer

The color of the blocks identifies their category. All of the blocks that make up the program above come from the **Basic** Toolbox category, which is light blue.

## Downloading a MakeCode program to the micro:bit

To download the file to your micro:bit, you must connect it to your computer’s USB port using a micro-USB cable. The micro:bit will draw power from your computer through the USB connection, or you can connect an optional battery pack so it can function even after it is unplugged from the computer. Once plugged in, the micro:bit shows up on your computer like a USB flash drive.

![USB connection](/static/courses/csintro/making/microbit-usb.jpg)

Click the purple Download button in the lower left of the MakeCode screen. This will download the file to your computer, to the location where your browser is set to save downloads.

![Download button](/static/courses/csintro/making/download-button.png)

To move the program to your micro:bit, drag the downloaded "microbit-xxxx.hex" file to the MICROBIT drive, as if you were copying a file to a flash drive. The program will copy over, and it will begin running on the micro:bit immediately.

![micro:bit drive](/static/courses/csintro/making/microbit-drive.jpg)

The micro:bit will hold one program at a time. It is not necessary to delete files off the micro:bit before you copy another onto the micro:bit; a new file will just replace the old one.

For the next project, your students should attach the battery pack (it takes 2 AAA batteries) to the micro:bit using the white connector. That way they can build it into their design without having to connect it to the computer.

![Battery pack](/static/courses/csintro/making/battery-pack.jpg)
