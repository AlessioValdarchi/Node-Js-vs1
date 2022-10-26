import express from "express";
import "express-async-errors";

import { validationErrorMiddleware } from "./lib/middleware/validation";

import planetsRoute from "./route/serieA";
import { initCorsMiddleware } from "./lib/middleware/cors";
const app = express();

app.use(express.json());

app.use(initCorsMiddleware());
app.use("/serieA", planetsRoute);

app.use(validationErrorMiddleware);

export default app;
