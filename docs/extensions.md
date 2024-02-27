# Extensions

Extensions are functional code modules that are installed from outside the MakeCode editor and plug new blocks into the **Toolbox**. These blocks are created by other authors or organizations to do things from simplifying coding tasks to working with hardware devices.

### ~ reminder

#### Extensions were known as "Packages"

**Extensions** were previously called **Packages** in MakeCode.

### ~

## Adding an extension to a project

You can add an extension by going to **Toolbox** and clicking on the **Extensions** category.

![Extensions Toolbox category](/static/extensions/toolbox-category.png)

This will open a window giving you a place to search for extensions. Also, a selection of recommended extensions is shown for you to choose from.

![Extensions Window](/static/extensions/extensions-window.gif)

When you select an extension, you should see the new extension category appear in the Toolbox of your project.

![New added extension in Toolbox](/static/extensions/new-extension.png)

The Toolbox category will contain the extension's blocks, ready for you to use in your project's code.

![Blocks in the added extension](/static/extensions/extension-blocks.png)

### ~ hint

#### Extension gallery

For a list of extensions within categories, browse the [Extension Gallery](/extensions/extension-gallery).

### ~

## Removing an extension from a project

To remove an extension from a project, click on the Language toggle to move the project into **JavaScript** or **Python** view. Then expand the **Explorer** view under the micro:bit simulator. Click on the **Delete** button next to the extension you would like to remove.

![File Explorer](/static/extensions/file-explorer.png)

## What extensions are loaded in my project?

To determine which extensions your project is currently using, you can simply open the project in MakeCode and look at the Toolbox to see the custom categories that are displayed. If you need more information, such as the repository path or version of the extension, open the project in MakeCode and select **Project Settings** from the **Settings** menu in the top right corner of the screen.

![Settings menu](/static/extensions/settings-menu.png)

**Select Edit Settings As text** button.

![Edit settings button](/static/extensions/edit-settings-button.png)

The project settings will appear as text and you can see the extensions used in your project. They are listed under `"dependencies"`:

```
"dependencies": {
    "core": "*",
    "radio": "*",
    "microphone": "*",
    "maqueen": "github.com:dfrobot/pxt-maqueen#v1.7.2"
},
```

The extensions with just a path of `"*"` are those included by default with the editor. Others are external and have a repository path, possibly with a version specified.

## Custom extensions

The [Build Your Own Extension](https://makecode.com/extensions/getting-started) manual is available for advanced users who want to publish their own extension. 
