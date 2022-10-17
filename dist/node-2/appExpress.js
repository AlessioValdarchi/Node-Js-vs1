"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
//import fetch from "node-fetch";
const client_1 = __importDefault(require("../lib/prisma/client"));
const app = (0, express_1.default)();
app.get("/serieA", async (request, response) => {
    const serieA = await client_1.default.serieA.findMany();
    response.json(serieA);
});
// app.get("/frasi", async (req, res) => {
//     const response = await fetch("http://numbersapi.com/random/math");
//     const frase = await response.text();
//     console.log(frase);
//     res.end(frase);
// });
exports.default = app;
