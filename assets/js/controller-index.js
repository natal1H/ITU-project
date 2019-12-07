// Login page functions
/**
 * Redirect to page with tasks
 */
function redirect() {
    window.location.replace("tasks.html");
    return false;
}

/**
 * Hide login form, show register form
 */
function createAccountClick() {
    document.getElementsByClassName("register-form")[0].style.display = "block";
    document.getElementsByClassName("login-form")[0].style.display = "none";
}

/**
 * Hide register form, show login form
 */
function signInClick() {
    document.getElementsByClassName("register-form")[0].style.display = "none";
    document.getElementsByClassName("login-form")[0].style.display = "block";
}
