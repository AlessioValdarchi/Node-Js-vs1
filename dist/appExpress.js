"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("express-async-errors");
const node_fetch_1 = __importDefault(require("node-fetch"));
const app = (0, express_1.default)();
app.get("/serieA", (request, response) => {
    response.json([
        {
            name: "Lazio",
        },
        { name: "Inter" },
    ]);
});
app.get("/frasi", async () => {
    const response = await (0, node_fetch_1.default)("http://numbersapi.com/random/math");
    const frase = await response.text();
    const splitfrase = frase.split(" ");
    const splittext = splitfrase[0];
    console.log(splittext);
});
exports.default = app;
