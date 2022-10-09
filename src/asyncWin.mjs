import * as fs from "node:fs/promises";
function luckyDraw(player) {
    return new Promise((resolve, reject) => {
        const win = Boolean(Math.round(Math.random()));

        process.nextTick(() => {
            if (win) {
                resolve(`${player} won a prize in the draw!`);
            } else {
                reject(new Error(`${player} lost the draw.`));
            }
        });
    });
}
async function getResult(...person) {
    try {
        let players = await luckyDraw(...person);
        console.log(players);
    } catch (error) {
        console.error(error);
    }
}

const personPlayer = ["tina", "jorge", "julien"];
personPlayer.forEach((p) => {
    getResult(p);
});
