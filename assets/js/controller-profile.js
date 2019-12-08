/**
 * ITU project 
 * Author: Martina Chripková (xchrip01)
 */
function displayUserInfo() {
    var user = JSON.parse(localStorage.getItem("storeUser"));

    document.getElementsByClassName("user")[0].innerHTML = `
    <h2>${user.login}</h2>
    <h4>${user.email}</h4>
    `
}