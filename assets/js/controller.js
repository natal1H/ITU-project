function groupAddNewClick() {
    console.log("groupAddNewClick() by " + event.target);
   
    // Get div element
    var hideElement = event.target;
    if (hideElement.nodeName != "DIV")
        // Clicked on heading, get parent div
        hideElement = hideElement.parentElement;

    // Hide clicked div element, show div with forms
    var showElement = document.getElementById("group-add-form");
    console.log(hideElement);
    console.log(showElement)
    replace(hideElement, showElement)
}

function groupAddNewSubmit() {
    console.log("groupAddNewSubmit() by " + event.target.nodeName);
}

function taskMouseEnter() {
    // Get the div element if hovering over something else
    var taskElement = event.target;
    if (taskElement.className != "task") {
        // Hovered over other element in div
        taskElement = findAncestorWithClass(taskElement, "task")
    }
    // Change display of icon "DONE"   
    var checkDueElement = taskElement.getElementsByClassName('check-due')[0];
    var checkIcon = checkDueElement.getElementsByClassName('fa fa-check')[0];
    changeVisibility(checkIcon, "inline-block");
}

function taskMouseLeave() {
    // Get the div element if hovering over something else
    var taskElement = event.target;
    if (taskElement.className != "task") {
        // Hovered over other element in div
        taskElement = findAncestorWithClass(taskElement, "task")
    }
    // Change display of icon "DONE"   
    var checkDueElement = taskElement.getElementsByClassName('check-due')[0];
    var checkIcon = checkDueElement.getElementsByClassName('fa fa-check')[0];
    changeVisibility(checkIcon, "none");
}

function playIconClicked() {
    console.log("Play icon clicked -> change to pause");
    var playIcon = event.target;
    var pauseIcon = playIcon.parentElement.getElementsByClassName('fa fa-pause')[0];
    replace(playIcon, pauseIcon);
}

function pauseIconClicked() {
    console.log("Pause icon clicked -> change to play");
    var pauseIcon = event.target;
    var playIcon = pauseIcon.parentElement.getElementsByClassName('fa fa-play')[0];
    replace(pauseIcon, playIcon);
}

function checkIconClicked() {
    console.log("Check icon clicked.");
}

function taskAddExpand() {
    var srcElement = event.target;
    if (srcElement.className != "task-expand") 
        srcElement = srcElement.parentElement;
    var formElement = srcElement.parentElement.getElementsByClassName("task-optional")[0];

    if (srcElement.innerHTML == 'Advanced <i class="fa fa-angle-down" aria-hidden="true"></i>') {
        // Expand
        srcElement.innerHTML = 'Advanced <i class="fa fa-angle-up"></i>';
        changeVisibility(formElement, "block");
    }
    else {
        // Close
        srcElement.innerHTML = 'Advanced <i class="fa fa-angle-down"></i>';
        changeVisibility(formElement, "none");
    }
}

function taskAddNewClick() {
    var srcElement = event.target;
    if (srcElement.className != "task-add-new")
        srcElement = findAncestorWithClass(srcElement, "task-add-new");

    // Close all open add task forms
    var addTaskForms = document.getElementsByClassName("task-add-form");
    for (var i = 0; i < addTaskForms.length; i++) {
        if (addTaskForms[i].style.display == "block") {
            // Close this one
            var buttonAdd = addTaskForms[i].parentElement.getElementsByClassName("task-add-new")[0];
            replace(addTaskForms[i], buttonAdd);
        }
    }

    var formElement = srcElement.parentElement.getElementsByClassName("task-add-form")[0];
    // Hide button to add, display form
    replace(srcElement, formElement);
}

function taskAddNewSubmit() {
    // TODO
}

// Displaying model
function displayCategories() {
    var categories = JSON.parse(localStorage.getItem('storeCategories'));
    var htmlOutput = "";
    for (var i = 0; i < categories.length; i++) {
        htmlOutput += `
        <div class="group">
          <h2>${categories[i].name}</h2>

          <div class="all-tasks"></div>
        </div>
        `;
    }
    htmlOutput += `
    <div id="group-add-new" onclick="groupAddNewClick()">
      <h2>Add new group</h2>
    </div>

    <div id="group-add-form" style="display:none">
      <form>
        <input type="text" name="group-name" placeholder="Group name..."><br>
        <button onclick="groupAddNewSubmit()">Add</button> 
      </form>
    </div>
    `;
    document.getElementsByClassName("row")[0].innerHTML= htmlOutput;
}

function displayTasks() {
    var categoryElements = document.getElementsByClassName("group");
    // Clear all tasks already displayed first
    for (var i = 0; i < categoryElements.length; i++)
        categoryElements[i].getElementsByClassName("all-tasks")[0].innerHTML = "";

    var tasks = JSON.parse(localStorage.getItem('storeTasks'));
    for (var i = 0; i < tasks.length; i++) {
        // display task
        var task = tasks[i];
        var allTasksDiv = categoryElements[task.id].getElementsByClassName("all-tasks")[0];
        allTasksDiv.innerHTML += `
        <div class="task" onmouseenter="taskMouseEnter()" onmouseleave="taskMouseLeave()">
          <div class="task-header">
            <h3>${task.name}</h3>
            <i class="fa fa-play" onclick="playIconClicked()"></i>
            <i class="fa fa-pause" style="display:none" onclick="pauseIconClicked()"></i>
          </div>

          <p class="elapsed-time">Time elapsed: ${task.timeElapsed}</p>
          <p class="check-due">
          </span><span class="due-date">Due: ${task.due}</span>
          <span class="fa fa-check" style="display:none;float:right" onclick="checkIconClicked()"></span>
          </p>
        </div>
        `;
    }

    // Add to each column add new task button
    for (var i = 0; i < categoryElements.length; i++) {
        categoryElements[i].getElementsByClassName("all-tasks")[0].innerHTML += `
        <div class="task-add-new" onclick="taskAddNewClick()">
          <p><span class="fas fa-plus"></span> Add new task</p>
        </div>
  
        <div class="task-add-form" style="display:none">
          <form>
            <input type="text" name="task-name" placeholder="Task name..."><br>
                  
            <div class="task-expand" onclick="taskAddExpand()">Advanced <i class="fa fa-angle-down"></i></div>
                    
              <div class="task-optional" style="display:none;">
                <hr style="margin: 5px 0 10px 0">
                Due: <input type="date" name="task-due"><br>
                Estimated time: <input type="number" class="estimated-time" name="task-estimated-time" min="1" max="5"><br>
                Tarification: <input type="number" class="tarification" name="task-tarification" step="0.01"><br>
                Priority:
                <ul class="radion-buttons">
                  <li><input type="radio" name="task-priority" value="low"> Low</li>
                  <li><input type="radio" name="task-priority" value="medium"> Medium</li>
                  <li><input type="radio" name="task-priority" value="high"> High</li>
                </ul>
                <br><br><br>
  
                <textarea placeholder="Task description..."></textarea><br>
              </div>
  
            <button onclick="taskAddNewSubmit()">Add</button>
          </form> 
        </div>
        `;
    }

}

// Helpful functions
function replace(hide, show) {
    hide.style.display="none";
    show.style.display="block";
}

function changeVisibility(element, visibility) {
    element.style.display = visibility;
}

function findAncestorWithClass(el, sel) {
    while ((el = el.parentElement) && !(el.className == sel));
    return el;
}
