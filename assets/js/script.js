function groupAddNewClick() {
    console.log("groupAddNewClick() by " + event.target);
   
    // Get div element
    var hideElement = event.target;
    if (hideElement.nodeName != "DIV") {
        // Clicked on heading, get parent div
        hideElement = hideElement.parentElement;
    }

    // Hide clicked div element, show div with forms
    var showElement = document.getElementById("group-add-form");
    console.log(hideElement);
    console.log(showElement)
    replace(hideElement, showElement)
}

function groupAddNewSubmit() {
    console.log("groupAddNewSubmit() by " + event.target.nodeName);
}

function replace(hide, show) {
    hide.style.display="none";
    show.style.display="block";
}