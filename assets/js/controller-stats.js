// Stats page functions
/**
 * Show content with general statistics, hide others
 */
function generalStatsClick() {
    document.getElementsByClassName("general-content")[0].style.display = "inline-block";
    document.getElementsByClassName("graphs-content")[0].style.display = "none";
    document.getElementsByClassName("tarification-content")[0].style.display = "none";
}

/**
 * Show content with graphs, hide others
 */
function graphsStatsClick() {
    document.getElementsByClassName("general-content")[0].style.display = "none";
    document.getElementsByClassName("graphs-content")[0].style.display = "inline-block";
    document.getElementsByClassName("tarification-content")[0].style.display = "none";
}

/**
 * Show content with tarification statistics, hide others
 */
function tarificationStatsClick() {
    document.getElementsByClassName("general-content")[0].style.display = "none";
    document.getElementsByClassName("graphs-content")[0].style.display = "none";
    document.getElementsByClassName("tarification-content")[0].style.display = "inline-block";
}
