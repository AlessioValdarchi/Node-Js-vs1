"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serieASchema = void 0;
const typebox_1 = require("@sinclair/typebox");
exports.serieASchema = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    description: typebox_1.Type.Optional(typebox_1.Type.String()),
    point: typebox_1.Type.Integer(),
    goalScored: typebox_1.Type.Integer(),
}, { additionalProperties: false });
