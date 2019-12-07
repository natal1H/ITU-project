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
    var category = getCategoryId(groupEl);
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
    var taskName = taskForm["task-name"].value;   
    
    var taskDue = taskForm["task-due"].value;
    var taskEstimatedTime = taskForm["task-estimated-time"].value;
    var taskTarification = taskForm["task-tarification"].value;
    var taskDescription = event.target.getElementsByClassName("task-optional")[0].getElementsByClassName("task-description")[0].value;
    var taskPriority = taskForm["task-priority"].value;

    var tasks = JSON.parse(localStorage.getItem('storeTasks'));

    var newTask = {
        id: tasks.length,
        name: taskName,
        category: taskCategory,
        description: taskDescription,
        timeElapsed: 0,
        timeEstimated: taskEstimatedTime, // h
        due: taskDue,
        priority: taskPriority,
        tarification: taskTarification,
        status: "paused",
    };
    tasks.push(newTask);
    localStorage.setItem('storeTasks', JSON.stringify(tasks));
    // Redraw groups and tasks
    displayCategories();
    displayTasks();
}

function getCategory(categoryId) {
    var categories = JSON.parse(localStorage.getItem('storeCategories'));
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].id == categoryId) {
            return categories[i];
        }
    }
    return null;
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

function removeCategory(categoryName) {
    var categories = JSON.parse(localStorage.getItem("storeCategories"))
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].name == categoryName) {
            // Remove this one
            categories = categories.slice(0, i).concat(categories.slice(i + 1, categories.length))
            break;
        }
    }
    localStorage.setItem('storeCategories', JSON.stringify(categories));
}

function lowerCategoryIds(removedId) {
    var categories = JSON.parse(localStorage.getItem("storeCategories"))
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].id > removedId) {
            categories[i].id--;
        }
    }
    localStorage.setItem('storeCategories', JSON.stringify(categories)); 
}

function lowerTaskCategoryIds(removedId) {
    var tasks = JSON.parse(localStorage.getItem("storeTasks"))
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].category > removedId) {
            tasks[i].category--;
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

function removeGroupClick() {
    var groupEl = findAncestorWithClass(event.target, "group");
    var categoryName = groupEl.getElementsByTagName("h2")[0].innerHTML;
    var categoryId = getCategoryId(groupEl);

    // Get tasks in that category
    var tasks = JSON.parse(localStorage.getItem('storeTasks'));
    
    var tasksInCategory = [];
    for (var i = 0; i < tasks.length; i++) {
        console.log(i);
        if (tasks[i].category == categoryId) {
            tasksInCategory.push(tasks[i]);
        }
    }    

    if (tasksInCategory.length > 0) {
        // Tasks in the category, ask if really delete
        var r = confirm("Group is not empty. Are you sure you want to remove it?");
        if (r == true) {
            // Remove all tasks that were in the category
            for (var i = 0; i < tasksInCategory.length; i++) {
                removeTask(tasksInCategory[i]);
            }
            removeCategory(categoryName);
            lowerCategoryIds(categoryId);
            lowerTaskCategoryIds(categoryId);
        }
    }
    else {
        // Remove group immediately
        removeCategory(categoryName);
        lowerCategoryIds(categoryId);
        lowerTaskCategoryIds(categoryId);
    }

    // Redraw display
    displayCategories();
    displayTasks();
}

function taskDoubleClick() {
    // First, get task and category from local storage
    var groupEl = findAncestorWithClass(event.target, "group");
    var categoryId = getCategoryId(groupEl);
    var taskEl = findAncestorWithClass(event.target, "task");
    var taskObj = getTask(taskEl, categoryId);
    var categoryObj = getCategory(categoryId);

    console.log(taskObj);
    console.log(categoryObj);
    localStorage.setItem('storeClickedTask', JSON.stringify(taskObj));
    localStorage.setItem('storeClickedCategory', JSON.stringify(categoryObj));
    console.log(JSON.parse(localStorage.getItem("storeClickedTask")));
    console.log(JSON.parse(localStorage.getItem("storeClickedCategory")));

    displayDialog(taskObj, categoryObj);
}

function updateTask(taskNew) {
    var tasks = JSON.parse(localStorage.getItem("storeTasks"));
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id == taskNew.id) {
            // Update this task
            tasks[i].name = taskNew.name;
            tasks[i].category = taskNew.category;
            tasks[i].description = taskNew.description;
            tasks[i].timeElapsed = taskNew.timeElapsed;
            tasks[i].timeEstimated = taskNew.timeEstimated;
            tasks[i].due = taskNew.due;
            tasks[i].priority = taskNew.priority;
            tasks[i].tarification = taskNew.tarification;
            tasks[i].status = taskNew.status;
            tasks[i].finished = taskNew.finished;
        }
    }
    localStorage.setItem('storeTasks', JSON.stringify(tasks));    
    console.log("Task updated")
}

function resetTimeClick() {
    console.log("Refresh time clicked.");

    // Get clicked task
    var task = JSON.parse(localStorage.getItem("storeClickedTask"));
    task.timeElapsed = 0;
    updateTask(task);

    // Redraw elapsed time
    document.getElementById("elapsed-p").innerHTML = "Elapsed time: " + secondsToTimeFormat(task.timeElapsed);
}

function dialogSaveSubmit() {
    var task = JSON.parse(localStorage.getItem("storeClickedTask"));

    // Get all the input from dialog
    var dialogForm = document.forms["dialog-form"];
    task.name = dialogForm["dialog-name"].value;
    task.description = dialogForm.getElementsByTagName("textarea")[0].innerHTML;
    task.due = dialogForm["dialog-due"].value;
    task.timeEstimated = dialogForm["dialog-time-estimated"].value;
    task.tarification = dialogForm["dialog-tarification"].value;
    task.priority = dialogForm["dialog-priority"].value;

    // Update task
    updateTask(task);
}

function deleteTaskClick() {
    var task = JSON.parse(localStorage.getItem("storeClickedTask"));
    // Remove this task
    removeTask(task);
    // Close modal dialog
    closeModal();
    // Redraw screen
    displayCategories();
    displayTasks();
}

// Displaying model
function displayCategories() {
    var categories = JSON.parse(localStorage.getItem('storeCategories'));
    var htmlOutput = "";
    for (var i = 0; i < categories.length; i++) {
        htmlOutput += `
        <div class="group">
          <span><h2>${categories[i].name}</h2>

          <i class="fa fa-close group-remove" onclick="removeGroupClick()"></i></span>

          <div class="all-tasks"></div>
        </div>
        `;
    }
    htmlOutput += `
    <div id="group-add-new" onclick="groupAddNewClick()">
      <h2><span class="fas fa-plus"></span> Add group</h2>
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
        // priority
        var priorityColor;
        if (task.priority == "no-priority") priorityColor = 'style="background-color:#ebecf0"';
        else if (task.priority == "low") priorityColor = 'style="background-color:#ccffcc"';
        else if (task.priority == "medium") priorityColor = 'style="background-color:#ffffcc"';
        else if (task.priority == "high") priorityColor = 'style="background-color:#ff9999"';

        allTasksDiv.innerHTML += `
        <div class="task" ${priorityColor} ondblclick="taskDoubleClick()" onmouseenter="taskMouseEnter()" onmouseleave="taskMouseLeave()">
          <div class="task-header">
            <h3>${task.name}</h3>
            <i class="fa fa-play" onclick="playIconClicked()"></i>
            <i class="fa fa-pause" style="display:none" onclick="pauseIconClicked()"></i>
          </div>

          <p class="elapsed-time">Time elapsed: ${secondsToTimeFormat(task.timeElapsed)}</p>
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
          <p><span class="fas fa-plus"></span> Add task</p>
        </div>
  
        <div class="task-add-form" style="display:none">
          <form name="task-form" onsubmit="taskAddNewSubmit()">
            <input type="text" class="task-name" name="task-name" placeholder="Task name..." required><br>
                  
            <div class="task-expand" onclick="taskAddExpand()">Advanced <i class="fa fa-angle-down"></i></div>
                    
            <div class="task-optional" style="display:none;">
              <hr style="margin: 5px 0 10px 0">
              Due: <input type="date" class="task-due" name="task-due"><br>
              Estimated time: <input type="number" class="estimated-time" name="task-estimated-time"><br>
              Tarification: <input type="number" class="tarification" name="task-tarification" step="0.01"><br>
              Priority:
              <ul class="radion-buttons">
                <li><input type="radio" class="task-none" name="task-priority" value="no-priority"> None</li>
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

function displayDialog(taskObj, categoryObj) {
    // Priority display preparation
    var noneChecked = "", lowChecked = "", mediumChecked = "", highChecked = "";
    if (taskObj.priority == "no-priority") noneChecked = "checked";
    if (taskObj.priority == "low") lowChecked = "checked";
    if (taskObj.priority == "medium") mediumChecked = "checked";
    if (taskObj.priority == "high") highChecked = "checked";

    document.getElementById("myModal").getElementsByClassName("modal-body")[0].innerHTML = `
    <form name="dialog-form" onsubmit="dialogSaveSubmit()">
      <p style="margin:5px 0 3px 0">Name:</p>
      <input name="dialog-name" type="text" value="${taskObj.name}"><br>
      <p style="margin:3px 0 3px 0">Description:</p>
      <textarea>${taskObj.description}</textarea><br>
      <p style="margin:0px 0 3px 0">Due:</p>
      <input name="dialog-due" type="date" value="${moment(taskObj.due).format("YYYY-MM-DD")}"><br>
      <p style="margin:3px 0 3px 0">Estimated time:</p>
      <input name="dialog-time-estimated" type="number" value="${taskObj.timeEstimated}"><br>
      <p id="elapsed-p" style="margin:3px 0 3px 0">Elapsed time: ${secondsToTimeFormat(taskObj.timeElapsed)}</p> 
      <p style="margin:3px 0 3px 0">Tarification:</p>
      <input name="dialog-tarification" type="number" step="0.01" value="${taskObj.tarification}"><br>
      <p style="margin:3px 0 3px 0">Priority:</p>
      <ul class="radion-buttons">
        <li><input name="dialog-priority" type="radio" value="no-prioriy" ${noneChecked}> None</li>
        <li><input name="dialog-priority" type="radio" value="low" ${lowChecked}> Low</li>
        <li><input name="dialog-priority" type="radio" value="medium" ${mediumChecked}> Medium</li>
        <li><input name="dialog-priority" type="radio" value="high" ${highChecked}> High</li>
      </ul>
      <button type="button" onclick="resetTimeClick()">Reset time</button><br><br>

      <input type="submit" value="Save changes">
      <i class="fa fa-trash" style="float:right;margin:5px 30px 0 0;" onclick="deleteTaskClick()"></i>
    </form>
    `

    // Get the modal
    var modal = document.getElementById("myModal");

    modal.style.display = "block";
}

function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
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

function secondsToTimeFormat(seconds) {
    var hours   = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds - (hours * 3600)) / 60);
    var seconds = seconds - (hours * 3600) - (minutes * 60);

    if (hours   < 10) 
        hours   = "0" + hours;
    if (minutes < 10) 
        minutes = "0" + minutes;
    if (seconds < 10) 
        seconds = "0" + seconds;
    return hours + ':' + minutes + ':'+ seconds;
}
