"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
//import fetch from "node-fetch";
const client_1 = __importDefault(require("./lib/prisma/client"));
const validation_1 = require("./lib/validation");
const multer_1 = require("./lib/middleware/multer");
const upload = (0, multer_1.initMulterMiddleware)();
const corsOptions = {
    origin: "http://localhost:8080",
};
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)(corsOptions));
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
app.put("/serieA/:id(\\d+)", (0, validation_1.validate)({ body: validation_1.serieASchema }), async (request, response, next) => {
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
app.delete("/serieA/:id(\\d+)", async (request, response, next) => {
    const serieAid = Number(request.params.id);
    try {
        await client_1.default.serieA.delete({
            where: { id: serieAid },
        });
        response.status(204).end();
    }
    catch (error) {
        response.status(404);
        next(`can not DELETE /serieA/${serieAid}`);
    }
});
app.post("/serieA/:id(\\d+)/photo", upload.single("photo"), async (request, response, next) => {
    if (!request.file) {
        response.status(400);
        return next("no file uploaded");
    }
    const photoFilename = request.file.filename;
    response.status(201).json({ photoFilename });
});
// app.get("/frasi", async (req, res) => {
//     const response = await fetch("http://numbersapi.com/random/math");
//     const frase = await response.text();
//     console.log(frase);
//     res.end(frase);
// });
app.use(validation_1.validationErrorMiddleware);
exports.default = app;
