import express from "express";
import "express-async-errors";
//import fetch from "node-fetch";

import {
    validate,
    validationErrorMiddleware,
    serieASchema,
    serieAData,
} from "./lib/validation";
import prisma from "./lib/prisma/client";
const app = express();
app.use(express.json());

app.get("/serieA", async (request, response) => {
    const serieA = await prisma.serieA.findMany();

    response.json(serieA);
});
app.post(
    "/serieA",
    validate({ body: serieASchema }),
    async (request, response) => {
        const serieAData: serieAData = request.body;
        const serieA = await prisma.serieA.create({
            data: serieAData,
        });
        response.status(201).json(serieA);
    }
);
// app.get("/frasi", async (req, res) => {
//     const response = await fetch("http://numbersapi.com/random/math");
//     const frase = await response.text();
//     console.log(frase);

//     res.end(frase);
// });
app.use(validationErrorMiddleware);
export default app;
