"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const appExpress_1 = __importDefault(require("./appExpress"));
const port = process.env.PORT;
appExpress_1.default.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
