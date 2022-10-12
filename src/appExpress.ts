import express from "express";
import "express-async-errors";
import fetch from "node-fetch";
const app = express();

app.get("/serieA", (request, response) => {
    response.json([
        {
            name: "Lazio",
        },
        { name: "Inter" },
    ]);
});

app.get("/frasi", async () => {
    const response = await fetch("http://numbersapi.com/random/math");
    const frase = await response.text();
    const splitfrase = frase.split(" ");
    const splittext = splitfrase[0];

    console.log(splittext);
});

export default app;
