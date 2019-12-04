var categories = [{id: 0, name: "Uncategorized"}, {id: 1, name: "School"}];

var tasks = [
    {
        id: 0,
        name: "Buy train ticket",
        category: 0,
        description: "Buy train ticket to go home",
        timeElapsed: 0,
        timeEstimated: 1, // h
        due: new Date(2019, 12, 24),
        priority: 0, // None
        tarification: 0.0
    },
    {
        id: 1,
        name: "Design website",
        category: 1,
        description: "Design website for ITU project",
        timeElapsed: 0,
        timeEstimated: 3, // h
        due: new Date(2019, 12, 8),
        priority: 2, // None
        tarification: 0.0
    },
]

localStorage.setItem('storeCategories', JSON.stringify(categories));
localStorage.setItem('storeTasks', JSON.stringify(tasks));