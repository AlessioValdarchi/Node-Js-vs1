import express from "express";
import "express-async-errors";
//import fetch from "node-fetch";
import prisma from "./lib/prisma/client";
const app = express();

app.get("/serieA", async (request, response) => {
    const serieA = await prisma.serieA.findMany();

    response.json(serieA);
});

// app.get("/frasi", async (req, res) => {
//     const response = await fetch("http://numbersapi.com/random/math");
//     const frase = await response.text();
//     console.log(frase);

//     res.end(frase);
// });

export default app;
