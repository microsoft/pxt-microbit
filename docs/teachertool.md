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

![Run checklist](/static/teachertool/run-checklist-button.png)

![Checklist execution](/static/teachertool/checklist-execution.png)

### Editing Results

1. User can add feedback/notes using the "Add Notes" button

- The feedback box should resize to fit its content
- Feedback is persisted if the user re-runs the rules using the "Run" button

![Editing results](/static/teachertool/editing-results-1.png)

![Editing results](/static/teachertool/editing-results-2.png)

![Editing results](/static/teachertool/editing-results-3.png)

4. User can edit an outcome using the provided dropdown
      
![Edit outcome](/static/teachertool/edit-outcome-1.png)

![Edit outcome](/static/teachertool/edit-outcome-2.png)
      
### Result Clearing and Auto-Run

1. If auto-run is **disabled**, a result's outcome (i.e. "Looks good", "Needs work", etc...) should be set to "Not started" automatically when any of any of the following conditions are met:
   
- It is newly added (should default to the "Not Started" state)
- A parameter in a rule is changed (only the affected rule should enter the "Not Started" state)
- The loaded project changes (all rules should be set to "Not started")
   
2. Auto-run can be toggled on/off using the button in the menu.
      
![Auto-run button](/static/teachertool/autorun-button.png)
      
3. If auto-run is **enabled**, any rules that enter the "Not started" state from the above conditions should immediately and automatically get re-run and have their results updated.

### Loading/Importing/Exporting Checklists

1. User can open pre-built rubrics from the home page

- Will ask for overwrite confirmation if the user already has an in-progress checklist.
      
![Pre-built rubrics](/static/teachertool/prebuilt-rubrics.png)
      
2. User can export a checklist from the vertical "..." menu near the "auto-run" button. This will download a json file.
      
![Export checklist](/static/teachertool/export-checklist.png)

![Checklist download](/static/teachertool/checklist-download.png)

3. User can import a rubric from a file using the same "..." menu, or from the card on the welcome page.

- Rubric file can be selected via "Browse" or dropped directly into the popup
- Will ask for overwrite confirmation if the user already has an in-progress checklist.

![Import checklist card](/static/teachertool/import-checklist-card.png)

![Import checklist menu](/static/teachertool/import-checklist-menu.png)

![Import checklist drag in](/static/teachertool/import-checklist-dragdrop-1.png)

![Import checklist drop off](/static/teachertool/import-checklist-dragdrop-2.png)
      
### Other

- If user refreshes the page (or closes/re-opens the browser), their checklist should be preserved.
- User can click the print button to create a version of the results with the outcome and feedback visible, but other UI elements hidden (currently broken).
      
![Print button](/static/teachertool/print-button.png)

- The checklist-view/project-view splitter can be resized. It can also be reset to 50/50 split with double-click.

![View splitter button](/static/teachertool/view-splitter.png)

![Split view resize](/static/teachertool/split-resize.png)
