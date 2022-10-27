import express from "express";
import prisma from "../lib/prisma/client";
import cors from "cors";
import { validationErrorMiddleware } from "../lib/middleware/validation";
import { initMulterMiddleware } from "../lib/middleware/multer";
import { serieASchema } from "../lib/middleware/validation/serieA";
import { serieA } from "@prisma/client";
import { validate } from "../lib/middleware/validation";
import { checkAuthorization } from "../lib/middleware/passport";

const upload = initMulterMiddleware();

const router = express.Router();

router.get("/", async (request, response) => {
    const serieA = await prisma.serieA.findMany();

    response.json(serieA);
});

router.get("/:id(\\d+)", async (request, response, next) => {
    const serieAId = Number(request.params.id);

    const serieA = await prisma.serieA.findUnique({
        where: { id: serieAId },
    });

    if (!serieA) {
        response.status(404);
        return next(`Cannot GET /planets/${serieAId}`);
    }

    response.json(serieA);
});

router.post(
    "/",
    checkAuthorization,
    validate({ body: serieASchema }),
    async (request, response) => {
        const serieAData: serieA = request.body;
        const username = request.user?.username as string;

        const serieA = await prisma.serieA.create({
            data: { ...serieAData, createdBy: username, updatedBy: username },
        });

        response.status(201).json(serieA);
    }
);

router.put(
    "/:id(\\d+)",
    checkAuthorization,
    validate({ body: serieASchema }),
    async (request, response, next) => {
        const serieAData: serieA = request.body;
        const serieAId = Number(request.params.id);
        const username = request.user?.username as string;

        try {
            const serieA = await prisma.serieA.update({
                where: { id: serieAId },
                data: { ...serieAData, updatedBy: username },
            });

            response.json(serieA);
        } catch (e) {
            response.status(404);
            next(`Cannot PUT /planets/${serieAId}`);
        }
    }
);

router.delete(
    "/:id(\\d+)",
    checkAuthorization,
    async (request, response, next) => {
        const serieAId = Number(request.params.id);

        try {
            await prisma.serieA.delete({
                where: { id: serieAId },
            });

            response.status(204).end();
        } catch (e) {
            response.status(404);
            next(`Cannot DELETE /planets/${serieAId}`);
        }
    }
);

router.post(
    "/:id(\\d+)/photo",
    checkAuthorization,
    upload.single("photo"),
    async (request, response, next) => {
        if (!request.file) {
            response.status(400);
            return next("No photo uploaded");
        }

        const photoFilename = request.file.filename;

        const serieAId = Number(request.params.id);

        try {
            await prisma.serieA.update({
                where: { id: serieAId },
                data: { photoFilename },
            });

            response.status(201).json({ photoFilename });
        } catch (e) {
            response.status(404);
            next(`Cannot POST /planets/${serieAId}/photo`);
        }
    }
);

router.use("/photo", express.static("uploads/"));

export default router;
