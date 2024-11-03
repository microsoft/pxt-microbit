# Code Evaluation Tool

## Overview

The [Teacher Tool]( https://microbit.makecode.com/beta--eval) is a mechanism for constructing a checklist of requirements for an assignment and running that list automatically against projects in quick succession. This allows teachers to build a checklist, then easily evaluate any number of projects based on that checklist. Projects are evaluated one at a time, but with auto-run enabled, you can update the loaded project by providing a new share link, at which point the rules will automatically be re-run on the new project.

## Teacher Tool Features

### Creating, Editing, and Running a Checklist

#### 1. Creating a new checklist

Create a new checklist using the **New Checklist** card. If there is already an "in progress" checklist, a warning will appear asking if it is okay to overwrite it.

![New Checklist](/static/teachertool/new-rubric.png)

![New Checklist from menu](/static/teachertool/new-rubric-from-menu.png)

#### 2. Naming a checklist

The checklist is given a name.

![Checklist name](/static/teachertool/checklist-name.png)

#### 3. Add Criteria

One or more **_criteria_** are added from the catalog using the **Add Criteria** button.
      
![Add Criteria](/static/teachertool/add-criteria.png)

Some criteria (like `[block] used [count] times`) can be added multiple times, others (like `Read a GPIO pin` can only be added once).

![Criteria items](/static/teachertool/criteria-items.png)

#### 4. Fill in Parameters

Parameters for the criteria item are filled in for a criteria item.

### ~ tip

#### Parameter types

From a technical perspective, criteria parameters have these types:

- **Numeric** parameters have a small input and only allow number inputs.
- **String** parameters can have medium and long sized inputs.
- **Block** parameters should open a block-picker modal.
- **Empty** parameters appear in an error state until they have values.

### ~

Here a block is selected and used 3 times:

![Criteria parameters 1](/static/teachertool/parameters-1.png)

Parameter options are displayed and then selected.

![Criteria parameters 2](/static/teachertool/parameters-2.png)
      
![Criteria parameters 3](/static/teachertool/parameters-3.png)

#### 5. Remove Criteria

A criteria item is removed using the **trash** button.

![Remove Criteria](/static/teachertool/remove-criteria.png)

#### 6. Load a project

A project into the project view by pasting in a share link or share ID.

![A loaded project](/static/teachertool/loaded-project.png)

The project will load in read-only mode with the project title appearing at the top of the project view.
   
![Project validation](/static/teachertool/validate-me.png)
      
#### 7. Run the checklist

With a project loaded, the checklist can run. The results are shown after clicking the **Run** button.

![Run checklist](/static/teachertool/run-checklist-button.png)

The results view lists each criteria with its outcome.

![Checklist execution](/static/teachertool/checklist-execution.png)

**Note**: the **Run** Button is disabled without loaded project.

### Editing Results

#### 1. Add feedback and notes

Feedback and notes are added using the **Add Notes** button. The feedback box should resize to fit its content as notes are added. The original feedback remains even if you re-run the rules using the **Run** button.

![Editing results](/static/teachertool/editing-results-1.png)

![Editing results](/static/teachertool/editing-results-2.png)

![Editing results](/static/teachertool/editing-results-3.png)

#### 2. Edit outcomes

An outcome is edited using the provided dropdown.
      
![Edit outcome](/static/teachertool/edit-outcome-1.png)

The new selected outcome.

![Edit outcome](/static/teachertool/edit-outcome-2.png)
      
### Result Clearing and Auto-Run

#### 1. Toggling Auto-run

Auto-run is toggled either **on** or **off** using the button in the menu.
      
![Auto-run button](/static/teachertool/autorun-button.png)

#### 2. Auto-run disabled

If auto-run is **disabled**, a result's outcome (i.e. "Looks good", "Needs work", etc...) is set to "Not started" automatically if any of any of the following conditions are met:
   
- It is newly added (defaults to the "Not Started" state).
- A parameter in a rule is changed (only the affected rule enters the "Not Started" state).
- The loaded project changes (all rules are be set to "Not started").

#### 3. Auto-run enabled

If auto-run is **enabled**, any rules that enter the "Not started" state due to the conditions listed above are immediately and automatically re-run with their results updated.

### Loading/Importing/Exporting Checklists

#### 1. Pre-built checklists

There are pre-built checklists are available from on home page. If a selected checklist is already in-progress, an overwrite confirmation prompt is given.
      
![Pre-built checklists](/static/teachertool/prebuilt-rubrics.png)
      
#### 2. Export a checklist

A checklist is exported using the vertical "..." menu near the "auto-run" button.

![Export checklist](/static/teachertool/export-checklist.png)

This will download a json file for the checklist.

![Checklist download](/static/teachertool/checklist-download.png)

#### 3. Import a checklist

User can import a checklist from a file using the same "..." menu, or from the card on the welcome page.

![Import checklist card](/static/teachertool/import-checklist-card.png)

![Import checklist menu](/static/teachertool/import-checklist-menu.png)

Checklist file is selected using "Browse" or dropped directly into the popup. An overwrite confirmation prompted if there is currently an in-progress checklist.

![Import checklist drag in](/static/teachertool/import-checklist-dragdrop-1.png)

![Import checklist drop off](/static/teachertool/import-checklist-dragdrop-2.png)
      
### Other

If the page is refreshed (or if the browser closes/re-opens), the current checklist preserved.

Use the print button to create a version of the results with the outcomes and feedback visible (the other UI elements are hidden).
      
![Print button](/static/teachertool/print-button.png)

The checklist-view/project-view splitter can be resized. It can also be reset to 50/50 split with double-click.

![View splitter button](/static/teachertool/view-splitter.png)

Slide the splitter to widen the view of the criteria and results.

![Split view resize](/static/teachertool/split-resize.png)
