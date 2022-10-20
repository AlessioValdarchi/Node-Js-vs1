import { Static, Type } from "@sinclair/typebox";
import { type } from "os";

export const serieASchema = Type.Object(
    {
        name: Type.String(),
        description: Type.Optional(Type.String()),
        point: Type.Integer(),
        goalScored: Type.Integer(),
    },
    { additionalProperties: false }
);

export type serieAData = Static<typeof serieASchema>;
