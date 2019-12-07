var user = {login: "xlogin00", password: "12345", email: "login@mail.com"};

var categories = [{id: 0, name: "Uncategorized"}, {id: 1, name: "School"}];

var tasks = [
    {
        id: 0,
        name: "Buy train ticket",
        category: 0,
        description: "Buy train ticket to go home",
        timeElapsed: 0,
        timeEstimated: 1, // h
        due: new Date(Date.UTC(2019, 12, 24)),
        priority: "no-priority",
        tarification: 0.0,
        status: "paused",
        finished: undefined,
    },
    {
        id: 1,
        name: "Present the project",
        category: 1,
        description: "Present the project for ITU",
        timeElapsed: 0,
        timeEstimated: 2, // h
        due: new Date(Date.UTC(2019, 12, 19)),
        priority: "high",
        tarification: 0.0,
        status: "paused",
        finished: undefined,
    },
]

var done = new Array();

if (localStorage.getItem("storeCategories") === null)
    localStorage.setItem('storeCategories', JSON.stringify(categories));
if (localStorage.getItem("storeTasks") === null)
    localStorage.setItem('storeTasks', JSON.stringify(tasks));
if (localStorage.getItem("storeDone") === null)
    localStorage.setItem('storeDone', JSON.stringify(done));
if (localStorage.getItem("storeUser") === null)
    localStorage.setItem('storeUser', JSON.stringify(user));
    