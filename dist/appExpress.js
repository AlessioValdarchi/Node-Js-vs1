"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
//import fetch from "node-fetch";
const validation_1 = require("./lib/validation");
const client_1 = __importDefault(require("./lib/prisma/client"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/serieA", async (request, response) => {
    const serieA = await client_1.default.serieA.findMany();
    response.json(serieA);
});
app.get("/serieA/:id(\\d+)", async (request, response, next) => {
    const serieAID = Number(request.params.id);
    const serieA = await client_1.default.serieA.findUnique({
        where: { id: serieAID },
    });
    if (!serieA) {
        response.status(404);
        return next(`can not get /serieA/${serieAID}`);
    }
    response.json(serieA);
});
app.post("/serieA/:id(\\d+)", (0, validation_1.validate)({ body: validation_1.serieASchema }), async (request, response) => {
    const serieAData = request.body;
    const serieA = await client_1.default.serieA.create({
        data: serieAData,
    });
    response.status(201).json(serieA);
});
app.put("/serieA", (0, validation_1.validate)({ body: validation_1.serieASchema }), async (request, response, next) => {
    const serieAid = Number(request.params.id);
    const serieAData = request.body;
    try {
        const serieA = await client_1.default.serieA.update({
            where: { id: serieAid },
            data: serieAData,
        });
        response.status(200).json(serieA);
    }
    catch (error) {
        response.status(404);
        next(`can not PUT /serieA/${serieAid}`);
    }
});
// app.get("/frasi", async (req, res) => {
//     const response = await fetch("http://numbersapi.com/random/math");
//     const frase = await response.text();
//     console.log(frase);
//     res.end(frase);
// });
app.use(validation_1.validationErrorMiddleware);
exports.default = app;
