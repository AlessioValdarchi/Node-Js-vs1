import express from "express";
import "express-async-errors";

import { validationErrorMiddleware } from "./lib/middleware/validation";

import planetsRoute from "./route/serieA";
import { initCorsMiddleware } from "./lib/middleware/cors";
import { initSessionMiddleware } from "./lib/middleware/session";
import { passport } from "./lib/middleware/passport";

import authRoutes from "./route/auth";
const app = express();
app.use(initSessionMiddleware());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());

app.use(initCorsMiddleware());
app.use("/serieA", planetsRoute);
app.use("/auth", authRoutes);
app.use(validationErrorMiddleware);

export default app;
