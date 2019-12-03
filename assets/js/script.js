function groupAddNewClick() {
    console.log("groupAddNewClick() by " + event.target.nodeName);
   
    // Get div element
    var groupAddElement = event.target;
    if (groupAddElement.nodeName != "DIV") {
        // Clicked on heading, get parent div
        groupAddElement = groupAddElement.parentElement;
    }

    // Change the html inside div
    groupAddElement.innerHTML = `
    <form>
    <input type="text" name="group-add-new-name" placeholder="Group name..."><br>
    <button onclick="groupAddNewSubmit()">Add</button> 
    </form>
    `;
}

function groupAddNewSubmit() {
    console.log("groupAddNewSubmit() by " + event.target.nodeName);
}