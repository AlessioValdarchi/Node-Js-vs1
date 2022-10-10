"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const appExpress_1 = __importDefault(require("./appExpress"));
const port = 3000;
appExpress_1.default.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
});
