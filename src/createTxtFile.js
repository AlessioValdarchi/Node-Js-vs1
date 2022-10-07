const fs = require("fs");
let data = "this file contain: players list";
fs.writeFile("player.txt", data, (error) => {
    if (error) {
        console.error(error);
    }
    console.log(data);
});
