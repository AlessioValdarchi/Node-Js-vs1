import supertest from "supertest";
import app from "./appExpress";
import { prismaMock } from "./lib/prisma/client.mock";
const req = supertest(app);

test("GET /serieaA", async () => {
    const serieA = [
        {
            id: 1,
            name: "Lazio",
            description: null,
            point: 24,
            goalScored: 23,
            createdAt: "2022-10-17T13:43:40.095Z",
            updatedAt: "2022-10-17T13:44:14.295Z",
        },
        {
            id: 2,
            name: "Inter",
            description: null,
            point: 20,
            goalScored: 15,
            createdAt: "2022-10-17T13:45:03.800Z",
            updatedAt: "2022-10-17T13:45:26.535Z",
        },
    ];
    //@ts-ignore
    prismaMock.serieA.findMany.mockResolvedValue(serieA);

    const resp = await req
        .get("/serieA")
        .expect(200)
        .expect("content-type", /application\/json/);

    expect(resp.body).toEqual(serieA);
});
describe("POST /serieA", () => {
    test("Valid request", async () => {
        const serieA = {
            name: "Lazio",
            description: null,
            point: 24,
            goalScored: 23,
        };
        const resp = await req
            .post("/serieA")
            .send(serieA)
            .expect(201)
            .expect("content-type", /application\/json/);

        expect(resp.body).toEqual(serieA);
    });
    test("Invalid request", async () => {
        const serieA = {
            description: null,
            point: 24,
            goalScored: 23,
        };
        const resp = await req
            .post("/serieA")
            .send(serieA)
            .expect(422)
            .expect("content-type", /application\/json/);

        expect(resp.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
});
