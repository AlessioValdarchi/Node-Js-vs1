"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = __importDefault(require("../lib/prisma/client"));
const multer_1 = require("../lib/middleware/multer");
const serieA_1 = require("../lib/middleware/validation/serieA");
const validation_1 = require("../lib/middleware/validation");
const upload = (0, multer_1.initMulterMiddleware)();
const router = express_1.default.Router();
router.get("/", async (request, response) => {
    const serieA = await client_1.default.serieA.findMany();
    response.json(serieA);
});
router.get("/:id(\\d+)", async (request, response, next) => {
    const serieAId = Number(request.params.id);
    const serieA = await client_1.default.serieA.findUnique({
        where: { id: serieAId },
    });
    if (!serieA) {
        response.status(404);
        return next(`Cannot GET /planets/${serieAId}`);
    }
    response.json(serieA);
});
router.post("/", (0, validation_1.validate)({ body: serieA_1.serieASchema }), async (request, response) => {
    const serieAData = request.body;
    const serieA = await client_1.default.serieA.create({
        data: serieAData,
    });
    response.status(201).json(serieA);
});
router.put("/:id(\\d+)", (0, validation_1.validate)({ body: serieA_1.serieASchema }), async (request, response, next) => {
    const serieAData = request.body;
    const serieAId = Number(request.params.id);
    try {
        const serieA = await client_1.default.serieA.update({
            where: { id: serieAId },
            data: serieAData,
        });
        response.json(serieA);
    }
    catch (e) {
        response.status(404);
        next(`Cannot PUT /planets/${serieAId}`);
    }
});
router.delete("/:id(\\d+)", async (request, response, next) => {
    const serieAId = Number(request.params.id);
    try {
        await client_1.default.serieA.delete({
            where: { id: serieAId },
        });
        response.status(204).end();
    }
    catch (e) {
        response.status(404);
        next(`Cannot DELETE /planets/${serieAId}`);
    }
});
router.post("/:id(\\d+)/photo", upload.single("photo"), async (request, response, next) => {
    if (!request.file) {
        response.status(400);
        return next("No photo uploaded");
    }
    const photoFilename = request.file.filename;
    const serieAId = Number(request.params.id);
    try {
        await client_1.default.serieA.update({
            where: { id: serieAId },
            data: { photoFilename },
        });
        response.status(201).json({ photoFilename });
    }
    catch (e) {
        response.status(404);
        next(`Cannot POST /planets/${serieAId}/photo`);
    }
});
router.use("/photo", express_1.default.static("uploads/"));
exports.default = router;
