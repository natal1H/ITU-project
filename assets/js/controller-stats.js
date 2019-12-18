/**
 * ITU project 
 * Author: Matej Novák (xnovak2f)
 */

// Stats page functions
function getNOfLateTasks() {
    var tasks = JSON.parse(localStorage.getItem("storeTasks"));
    var x = 0;
      for (i = 0; i < tasks.length; i++){
          if (tasks[i].due < moment().format("YYYY-MM-DD")){
              x++;
          }
      }
      if (x > 0) {
          document.getElementsByClassName("NOfLate")[0].innerHTML =  `<span style="font-weight:bold;color: red">${x}</span>`
      }
      else {
          document.getElementsByClassName("NOfLate")[0].innerHTML = `<span style="font-weight:bold;color: green">0</span>`
      }
}

function getByPriority(which){
    var tasks = JSON.parse(localStorage.getItem("store"+which));
    var priorities = JSON.parse(localStorage.getItem("storePriorities"));
    var dict = {};
    var ret = "";
    for (i = 0; i < tasks.length; i++){
        dict[tasks[i].priority] = (dict[tasks[i].priority] || 0) + 1;
    }
    for (var key in dict){
        ret += `<li>${key}: <span style="font-weight:bold">${dict[key]}</span></li>`;
    }
    return ret;
}
function getPriority(which, what) {
    var tasks = JSON.parse(localStorage.getItem("store"+which));
    document.getElementsByClassName("total"+which+"Priority")[0].innerHTML =  `
        <p>
          ${what} by priority:
          <ul>
            ${getByPriority(which)}
          </ul>
        </p>
    `
}
function getByGroup(which){
    var tasks = JSON.parse(localStorage.getItem("store"+which));
    var categories = JSON.parse(localStorage.getItem("storeCategories"));
    var dict = {};
    var ret = "";
    for (i = 0; i < tasks.length; i++){
        dict[tasks[i].category] = (dict[tasks[i].category] || 0) + 1;
    }
    for (var key in dict){
        ret += `<li>${categories[key].name}: <span style="font-weight:bold">${dict[key]}</span></li>`;
    }
    return ret;
}

function getTotal(which, what) {
    var tasks = JSON.parse(localStorage.getItem("store"+which));
  document.getElementsByClassName("total"+which)[0].innerHTML =  `
     <p style="font-weight:bold;">Total: ${tasks.length}</p>
        <p>
          ${what} by groups:
          <ul>
            ${getByGroup(which)}
          </ul>
        </p>
    `
}

function getTarifByGroup(){
    var tasksT = JSON.parse(localStorage.getItem("storeTasks"));
    var tasksD = JSON.parse(localStorage.getItem("storeDone"));
    var categories = JSON.parse(localStorage.getItem("storeCategories"));
    var dict = {};
    var ret = "";
    for (i = 0; i < tasksT.length; i++){
        dict[tasksT[i].category] = +(dict[tasksT[i].category] || 0) + +(tasksT[i].tarification*tasksT[i].timeElapsed / (60*60));
    }
    for (j = 0; j < tasksD.length; j++){
        dict[tasksD[j].category] = +(dict[tasksD[j].category] || 0) + +(tasksD[j].tarification*tasksD[j].timeElapsed / (60*60));
    }
    for (var key in dict){
        ret += `<li>${categories[key].name}: <span style="font-weight:bold">${Math.round(dict[key] * 100)/100} €</span></li>`;
    }
    return ret;
}

function tarifTotal() {
    var tasksT = JSON.parse(localStorage.getItem("storeTasks"));
    var tasksD = JSON.parse(localStorage.getItem("storeDone"));
    var hoursWorked = 0.0;
    var Total = 0.0;
    for (i = 0; i < tasksT.length; i++){
        if (tasksT[i].tarification > 0.009){
        Total += (tasksT[i].timeElapsed / (60*60)) * tasksT[i].tarification;
        hoursWorked += (tasksT[i].timeElapsed / (60*60));
        }
    }
    for (j = 0; j < tasksD.length; j++){
        if (tasksD[j].tarification > 0.009){
        Total += (tasksD[j].timeElapsed / (60*60)) * tasksD[j].tarification;
        hoursWorked += (tasksD[j].timeElapsed /(60*60));
        }
    }
  document.getElementsByClassName("tarifTotal")[0].innerHTML =  `
     <p style="font-weight:bold;">Total: ${Math.round(Total * 100)/100} €/h</p>
        <p>
          Tarification by groups:
          <ul>
            ${getTarifByGroup()}
          </ul>
        </p>
        <p style="font-weight:bold;">Average €/h of work: ${Math.round((Total/hoursWorked) * 100)/100} €/h</p>
    `
}

function createPieChart() {
	    var tasks = JSON.parse(localStorage.getItem("storeTasks"));
	    var categories = JSON.parse(localStorage.getItem("storeCategories"));
	    var groupTimeLabels = [];
	    var timeData = [];
	    var tarifData = new Array(categories.length).fill(0);
	    for (i = 0; i < categories.length; i++){
		groupTimeLabels.push(categories[i].name);
	    }
  for (j = 0; j < tasks.length; j++){

	  if((!isNaN(parseFloat(tasks[j].tarification))) &&
	  (document.getElementsByClassName("from")[0].value <= tasks[j].due ||
	  document.getElementsByClassName("from")[0].value == 0) &&
	  (document.getElementsByClassName("to")[0].value >= tasks[j].due ||
	  document.getElementsByClassName("to")[0].value == 0)
	  ){
        tarifData[tasks[j].category] = +(tarifData[tasks[j].category] || 0) + +(tasks[j].tarification);
	  }
  }


	    var ctx = document.getElementById('myChart').getContext('2d');
	    var chart = new Chart(ctx, {
	    	type: 'pie',
    		data: {
        		labels: groupTimeLabels,
        		datasets: [{
            			label: 'My First dataset',
            			backgroundColor: ['rgb(200, 100, 150)','rgb(150, 200, 100)' ,'rgb(100, 150, 200)','rgb(100, 200, 150)','rgb(150, 100, 200)','rgb(200, 150, 100)'],
            			borderColor: 'white',
            			data: tarifData
        		}]
    		},
    		options: {responsive: true, maintainAspectRatio: false}
	});
}

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
