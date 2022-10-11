const { table } = require("console");

const surprisingFact = "The bumblebee bat is the world's smallest mammal";
// console.log(surprisingFact);
// console.info("SurprisingFact: %s", surprisingFact);

const familyTree = [
    {
        name: "Person 1",
        children: [
            {
                name: "Person 2",
                children: [
                    {
                        name: "Person 3",
                        children: [
                            {
                                name: "Person 4",
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

//console.log(JSON.stringify(familyTree));
//console.dir(familyTree, { depth: null });

function importantTask() {
    console.count("Counting");
}

importantTask();
importantTask();
importantTask();
importantTask();
console.countReset("Counting");
importantTask();
importantTask();
