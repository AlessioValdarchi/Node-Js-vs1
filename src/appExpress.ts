import express from "express";
import "express-async-errors";

const app = express();

app.get("/serieA", (request, response) => {
    response.json([
        {
            name: "Lazio",
        },
        { name: "Inter" },
    ]);
});

export default app;
