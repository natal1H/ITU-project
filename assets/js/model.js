var categories = [{id: 1, name: "Uncategorized"}, {id: 2, name: "School"}];

var tasks = [
    {
        id: 1,
        name: "Buy train ticket",
        category: 1,
        description: "Buy train ticket to go home",
        timeElapsed: 0,
        due: new Date(2019, 12, 24),
        priority: 0, // None
        tarification: 0.0
    },
    {
        id: 2,
        name: "Design website",
        category: 2,
        description: "Design website for ITU project",
        timeElapsed: 0,
        due: new Date(2019, 12, 8),
        priority: 2, // None
        tarification: 0.0
    },
]

localStorage.setItem('storeCategories', JSON.stringify(categories));
localStorage.setItem('storeTasks', JSON.stringify(tasks));