import express from "express";
import "express-async-errors";
import cors from "cors";
//import fetch from "node-fetch";
import prisma from "./lib/prisma/client";
import {
    validate,
    validationErrorMiddleware,
    serieASchema,
    serieAData,
} from "./lib/validation";

const corsOptions = {
    origin: "http://localhost:8080",
};
const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.get("/serieA", async (request, response) => {
    const serieA = await prisma.serieA.findMany();

    response.json(serieA);
});

app.get("/serieA/:id(\\d+)", async (request, response, next) => {
    const serieAID = Number(request.params.id);
    const serieA = await prisma.serieA.findUnique({
        where: { id: serieAID },
    });
    if (!serieA) {
        response.status(404);
        return next(`can not get /serieA/${serieAID}`);
    }
    response.json(serieA);
});

app.post(
    "/serieA/:id(\\d+)",
    validate({ body: serieASchema }),
    async (request, response) => {
        const serieAData: serieAData = request.body;
        const serieA = await prisma.serieA.create({
            data: serieAData,
        });
        response.status(201).json(serieA);
    }
);

app.put(
    "/serieA/:id(\\d+)",
    validate({ body: serieASchema }),
    async (request, response, next) => {
        const serieAid = Number(request.params.id);
        const serieAData: serieAData = request.body;
        try {
            const serieA = await prisma.serieA.update({
                where: { id: serieAid },
                data: serieAData,
            });
            response.status(200).json(serieA);
        } catch (error) {
            response.status(404);
            next(`can not PUT /serieA/${serieAid}`);
        }
    }
);

app.delete("/serieA/:id(\\d+)", async (request, response, next) => {
    const serieAid = Number(request.params.id);
    try {
        await prisma.serieA.delete({
            where: { id: serieAid },
        });
        response.status(204).end();
    } catch (error) {
        response.status(404);
        next(`can not DELETE /serieA/${serieAid}`);
    }
});
// app.get("/frasi", async (req, res) => {
//     const response = await fetch("http://numbersapi.com/random/math");
//     const frase = await response.text();
//     console.log(frase);

//     res.end(frase);
// });
app.use(validationErrorMiddleware);
export default app;
