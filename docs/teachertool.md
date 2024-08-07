# Teacher Tool

## Overview

The teacher tool is a mechanism for constructing a checklist of requirements and running that list automatically against projects in quick succession. This allows teachers to build a checklist, then easily evaluate any number of projects based on that checklist. Projects must be evaluated one at a time, but with auto-run enabled, you can update the loaded project by providing a new share link, at which point the rules will automatically be re-run on the new project.

You can access the beta version of the teacher tool here: https://microbit.makecode.com/beta--eval

## Tool Features

### Creating, Editing, and Running a Checklist

#### 1. Creating a new rubric

A user can create a new rubric using the "New Rubric" card (or from the "..." action menu). If there is already an "in progress" checklist, a warning will appear asking if it is okay to overwrite it.

![New Rubric](/static/teachertool/new-rubric.png)

![New Rubric from menu](/static/teachertool/new-rubric-from-menu.png)

#### 2. Naming a checklist

User can give the checklist a name

![Checklist name](/static/teachertool/checklist-name.png)

#### 3. Add Criteria

User can add criteria from the catalog using the "Add Criteria" button. Some criteria (like `[block] used [count] times`) can be added multiple times, others (like `Read a GPIO pin` can only be added once)
      
![Add Criteria](/static/teachertool/add-criteria.png)

![Criteria items](/static/teachertool/criteria-items.png)

#### 4. Remove Criteria

User can remove criteria using the trash button

![Remove Criteria](/static/teachertool/remove-criteria.png)

#### 5. Fill in Parameters

User can fill in parameters:

- Numeric parameters have a small input and only allow number inputs
- String parameters can have medium and long sized inputs
- Block parameters should open a block-picker modal
- Empty parameters appear in an error state until they have values
      
![image](/static/teachertool/parameters-1.png)

![image](/static/teachertool/parameters-2.png)
      
![image](/static/teachertool/parameters-3.png)

6. User can load a project into the project view by pasting in a share link or share id

- The project should load in read-only mode
- The project title should appear at the top of the project view
   
![A loaded project](/static/teachertool/loaded-project.png)

![Project validation](/static/teachertool/validate-me.png)
      
7. With a project loaded, user can run the checklist and see results by clicking the "Run" button
   - Button is disabled without loaded project

![image](https://github.com/microsoft/pxt-microbit/assets/69657545/d4a2eb67-0939-46e9-9294-3b8a6acdf560)

![image](https://github.com/microsoft/pxt-microbit/assets/69657545/1086249b-9dae-479b-8a6e-60901dbd06fd)

### Editing Results

1. User can add feedback/notes using the "Add Notes" button
   - The feedback box should resize to fit its content
   - Feedback is persisted if the user re-runs the rules using the "Run" button
   - <details>
      <summary>Screenshots</summary>
      
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/b79d44ef-b326-48c7-b3b5-9e24e3d3f632)
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/f07b6d4c-4ff5-46d3-9256-7c2eb2585032)
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/a7d2211a-d4b3-4bf8-b913-2aa820c62060)

      </details>
4. User can edit an outcome using the provided dropdown
   - <details>
      <summary>Screenshots</summary>
      
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/fcf045db-a6e1-47be-84ff-b11ced6d25da)
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/c8b7bc02-2183-4b7d-8626-e2e8e2019d7a)
      
      </details>

### Result Clearing and Auto-Run

1. If auto-run is **disabled**, a result's outcome (i.e. "Looks good", "Needs work", etc...) should be set to "Not started" automatically when any of any of the following conditions are met:
   - It is newly added (should default to the "Not Started" state)
   - A parameter in a rule is changed (only the affected rule should enter the "Not Started" state)
   - The loaded project changes (all rules should be set to "Not started")
   
2. Auto-run can be toggled on/off using the button in the menu.
   - <details>
      <summary>Screenshots</summary>
      
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/6a240966-e01c-4d1a-984d-38942bac5ede)
      
      </details>
3. If auto-run is **enabled**, any rules that enter the "Not started" state from the above conditions should immediately and automatically get re-run and have their results updated.

### Loading/Importing/Exporting Checklists

1. User can open pre-built rubrics from the home page
   - Will ask for overwrite confirmation if the user already has an in-progress checklist.
   - <details>
      <summary>Screenshots</summary>
      
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/f5362525-55f6-4823-82f5-4a9e237c9b06)
      
      </details>
2. User can export a checklist from the vertical "..." menu near the "auto-run" button. This will download a json file.
   - <details>
      <summary>Screenshots</summary>
      
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/7718d1f3-1f17-4750-851a-41e24021f156)
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/517838b7-27e9-4f60-bf17-8d720c179537)

      </details>
3. User can import a rubric from a file using the same "..." menu, or from the card on the welcome page.
   - Rubric file can be selected via "Browse" or dropped directly into the popup
   - Will ask for overwrite confirmation if the user already has an in-progress checklist.
   - <details>
      <summary>Screenshots</summary>
      
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/f016b728-9165-4717-a7de-c9e496208602)
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/61c94e3c-d9b2-4dfc-90a2-696139da3e20)
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/4b33a8cc-0f33-411c-8bf4-144e3d72933d)
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/35a76e51-4600-4c07-a72c-8b631aa7959f)

      </details>
      
### Other

- If user refreshes the page (or closes/re-opens the browser), their checklist should be preserved.
- User can click the print button to create a version of the results with the outcome and feedback visible, but other UI elements hidden (currently broken).
   - <details>
      <summary>Screenshots</summary>
      
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/ba576cb1-94d3-4f44-b513-b8c389fb9a30)

      </details>
- The checklist-view/project-view splitter can be resized. It can also be reset to 50/50 split with double-click.
   - <details>
      <summary>Screenshots</summary>
      
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/7954c412-6e16-4280-b205-f887c0cebbe9)
      ![image](https://github.com/microsoft/pxt-microbit/assets/69657545/42194fcc-6413-4b35-8c7b-fcfb506e99da)

      </details>