function groupAddNewClick() {   
    // Get div element
    var hideElement = event.target;
    if (hideElement.nodeName != "DIV")
        // Clicked on heading, get parent div
        hideElement = hideElement.parentElement;

    // Hide clicked div element, show div with forms
    var showElement = document.getElementById("group-add-form");
    replace(hideElement, showElement)
}

function groupAddNewSubmit() {
    var categoryName = document.forms["group-form"]["group-name"].value;
    var categories = JSON.parse(localStorage.getItem('storeCategories'));
    var newCategory = {id: categories.length, name: categoryName};
    categories.push(newCategory);
    localStorage.setItem('storeCategories', JSON.stringify(categories));
    // Redraw groups and tasks
    displayCategories();
    displayTasks();
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
    var playIcon = event.target;
    var pauseIcon = playIcon.parentElement.getElementsByClassName('fa fa-pause')[0];
    replace(playIcon, pauseIcon);
}

function pauseIconClicked() {
    var pauseIcon = event.target;
    var playIcon = pauseIcon.parentElement.getElementsByClassName('fa fa-play')[0];
    replace(pauseIcon, playIcon);
}

function checkIconClicked() {
    console.log("Check icon clicked.");
    var taskEl = findAncestorWithClass(event.target, "task");
    var groupEl = findAncestorWithClass(taskEl, "group");
    var category = getCategoryId(groupEl, category);
    var task = getTask(taskEl, category);

    console.log(event.target);
    console.log("Task to remove:")
    console.log(task);

    // Remove task from task
    removeTask(task);

    console.log("Tasks after removal");
    var tasks = JSON.parse(localStorage.getItem("storeTasks"));
    console.log(tasks)

    // Change task attributes
    task.status = "done";
    task.category = -1;
    task.finished = moment().toDate().getTime();

    // Add to done
    var done = JSON.parse(localStorage.getItem("storeDone"));
    done.push(task);
    localStorage.setItem('storeDone', JSON.stringify(done));

    // Remove html - redraw categories and tasks
    displayCategories();
    displayTasks();

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
    // Get task category
    var groupEl = findAncestorWithClass(event.target, "group");
    var taskCategory = getCategoryId(groupEl);
    var taskForm = getTaskForm(taskCategory);

    //var taskName = document.forms["task-form"]["task-name"].value;
    var taskName = taskForm.getElementsByClassName("task-name")[0].value;   
    
    var taskDue = taskForm.getElementsByClassName("task-due")[0].value;
    var taskEstimatedTime = taskForm.getElementsByClassName("estimated-time").value;
    var taskTarification = taskForm.getElementsByClassName("tarification").value;
    var taskDescription = event.target.getElementsByClassName("task-optional")[0].getElementsByClassName("task-description")[0].value;
    
    // Priority - TODO
    //var taskPriority = document.forms["task-form"]["task-priority"].value;

    var tasks = JSON.parse(localStorage.getItem('storeTasks'));

    var newTask = {
        id: tasks.length,
        name: taskName,
        category: taskCategory,
        description: taskDescription,
        timeElapsed: 0,
        timeEstimated: taskEstimatedTime, // h
        due: "",
        priority: "no-priority", // TODO - temp
        tarification: taskTarification,
        status: "paused",
    };
    tasks.push(newTask);
    localStorage.setItem('storeTasks', JSON.stringify(tasks));
    // Redraw groups and tasks
    displayCategories();
    displayTasks();
}

function getCategoryId(groupEl) {
    var heading = groupEl.getElementsByTagName("h2")[0].innerHTML;
    var categories = JSON.parse(localStorage.getItem('storeCategories'));
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].name == heading) {
            return categories[i].id;
        }
    }
    return -1;
}

function getTask(taskEl, taskCategory) {
    var heading = taskEl.getElementsByTagName("h3")[0].innerHTML;
    var tasks = JSON.parse(localStorage.getItem('storeTasks'));
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].name == heading && tasks[i].category == taskCategory) {
            return tasks[i];
        }
    }
    return none;
}

function removeTask(task) {
    var tasks = JSON.parse(localStorage.getItem('storeTasks'));
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].name == task.name && tasks[i].category == task.category) {
            // This task will be removed
            tasks = tasks.slice(0, i).concat(tasks.slice(i + 1, tasks.length))
            break;
        }
    }
    localStorage.setItem('storeTasks', JSON.stringify(tasks));
}

function getTaskForm(columnNum) {
    var groupEl = document.getElementsByClassName("group")[columnNum];
    var taskFormEl = groupEl.getElementsByClassName("task-add-form")[0].getElementsByTagName("form")[0];
    return taskFormEl;
}

function closeGroupAddForm() {
    var groupFormEl = event.target.parentElement.parentElement;
    var groupAddEl = document.getElementById("group-add-new");
    replace(groupFormEl, groupAddEl);
}

function closeTaskAddForm() {
    var taskFormEl = findAncestorWithClass(event.target, "task-add-form");
    var taskAddEl = taskFormEl.parentElement.getElementsByClassName("task-add-new")[0];
    replace(taskFormEl, taskAddEl);
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
      <h2><span class="fas fa-plus"></span> Add new group</h2>
    </div>

    <div id="group-add-form" style="display:none">
      <form name="group-form" onsubmit="groupAddNewSubmit()">
        <input type="text" name="group-name" placeholder="Group name..." required><br>
        <input type="submit" value="Add">     
        <i class="fa fa-close" id="group-close-form" onclick="closeGroupAddForm()"></i> 
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
        var allTasksDiv = categoryElements[task.category].getElementsByClassName("all-tasks")[0];
        var dueDate;
        if (task.due == "")
            dueDate = "";
        else
            dueDate = moment(task.due).format("D.M.YYYY");

        allTasksDiv.innerHTML += `
        <div class="task" onmouseenter="taskMouseEnter()" onmouseleave="taskMouseLeave()">
          <div class="task-header">
            <h3>${task.name}</h3>
            <i class="fa fa-play" onclick="playIconClicked()"></i>
            <i class="fa fa-pause" style="display:none" onclick="pauseIconClicked()"></i>
          </div>

          <p class="elapsed-time">Time elapsed: ${task.timeElapsed}</p>
          <p class="check-due">
          </span><span class="due-date">Due: ${dueDate}</span>
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
          <form name="task-form" onsubmit="taskAddNewSubmit()">
            <input type="text" class="task-name" name="task-name" placeholder="Task name..." required><br>
                  
            <div class="task-expand" onclick="taskAddExpand()">Advanced <i class="fa fa-angle-down"></i></div>
                    
            <div class="task-optional" style="display:none;">
              <hr style="margin: 5px 0 10px 0">
              Due: <input type="date" class="task-due" name="task-due"><br>
              Estimated time: <input type="number" class="estimated-time" name="task-estimated-time" min="1" max="5"><br>
              Tarification: <input type="number" class="tarification" name="task-tarification" step="0.01"><br>
              Priority:
              <ul class="radion-buttons">
                <li><input type="radio" class="task-low" name="task-priority" value="low"> Low</li>
                <li><input type="radio" class="task-medium" name="task-priority" value="medium"> Medium</li>
                <li><input type="radio" class="task-high" name="task-priority" value="high"> High</li>
              </ul>
              <br><br><br>
  
              <textarea class="task-description" placeholder="Task description..."></textarea><br>
            </div>
  
            <input type="submit" value="Add">
            <i class="fa fa-close task-close-form" onclick="closeTaskAddForm()"></i> 
          </form> 
        </div>
        `;
    }

}

// Login page functions
function redirect() {
    window.location.replace("tasks.html");
    return false;
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

function remove(array, element) {
    const index = array.indexOf(element);
    array.splice(index, 1);
}
