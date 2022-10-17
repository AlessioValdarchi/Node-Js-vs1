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

app.get("/frasi", async (req, res) => {
    const response = await fetch("http://numbersapi.com/random/math");
    const frase = await response.text();
    console.log(frase);

    res.end(frase);
});

export default app;
