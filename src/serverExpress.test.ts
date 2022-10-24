import supertest from "supertest";
import app from "./appExpress";
import { prismaMock } from "./lib/prisma/client.mock";
const req = supertest(app);

describe("GET /serieA", () => {
    test("Valid request", async () => {
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
});

describe("GET /serieA/:id", () => {
    test("Valid request", async () => {
        const serieA = {
            id: 1,
            name: "Lazio",
            description: null,
            point: 24,
            goalScored: 23,
            createdAt: "2022-10-17T13:43:40.095Z",
            updatedAt: "2022-10-17T13:44:14.295Z",
        };

        //@ts-ignore
        prismaMock.serieA.findUnique.mockResolvedValue(serieA);

        const resp = await req
            .get("/serieA/1")
            .expect(200)
            .expect("content-type", /application\/json/);

        expect(resp.body).toEqual(serieA);
    });
    test("does not exist", async () => {
        //@ts-ignore
        prismaMock.serieA.findUnique.mockResolvedValue(null);
        const response = await req
            .get("/serieA/23")
            .expect(404)
            .expect("content-type", /text\/html/);

        expect(response.text).toContain("CAN NOT GET/serieA/23");
    });

    test("invalid serieA ID", async () => {
        //@ts-ignore
        prismaMock.serieA.findUnique.mockResolvedValue(null);
        const response = await req
            .get("/serieA/asdf")
            .expect(404)
            .expect("content-type", /text\/html/);

        expect(response.text).toContain("cannot GET /serieA/asdf");
    });
});

describe("POST /serieA", () => {
    test("Valid request", async () => {
        const serieA = {
            id: 3,
            name: "Lazio",
            description: null,
            point: 24,
            goalScored: 23,
            createdAt: "2022-10-20T21:20:24.308Z",
            updatedAt: "2022-10-20T21:20:24.308Z",
        };

        //@ts-ignore
        prismaMock.serieA.create.mockResolvedValue(serieA);

        const resp = await req
            .post("/serieA")
            .send({
                name: "Lazio",
                point: 24,
                goalScored: 23,
            })
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

describe("PUT /serieA", () => {
    test("Valid request", async () => {
        const serieA = {
            id: 3,
            name: "Lazio",
            description: "best team ever",
            point: 24,
            goalScored: 23,
            createdAt: "2022-10-20T21:20:24.308Z",
            updatedAt: "2022-10-20T21:20:24.308Z",
        };

        //@ts-ignore
        prismaMock.serieA.update.mockResolvedValue(serieA);

        const resp = await req
            .put("/serieA/3")
            .send({
                name: "Lazio",
                description: "best team ever",
                point: 24,
                goalScored: 23,
            })
            .expect(200)
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
            .put("/serieA/23")
            .send(serieA)
            .expect(422)
            .expect("content-type", /application\/json/);

        expect(resp.body).toEqual({
            errors: {
                body: expect.any(Array),
            },
        });
    });
    test("does not exist", async () => {
        //@ts-ignore
        prismaMock.serieA.update.mockRejectedValue(new Error("error"));
        const response = await req
            .put("/serieA/23")
            .send({
                name: "Lazio",
                description: "best team ever",
                point: 24,
                goalScored: 23,
            })
            .expect(404)
            .expect("content-type", /text\/html/);

        expect(response.text).toContain("CAN NOT PUT/serieA/23");
    });

    test("invalid serieA ID", async () => {
        const response = await req
            .put("/serieA/asdf")
            .send({
                name: "Lazio",
                description: "best team ever",
                point: 24,
                goalScored: 23,
            })
            .expect(404)
            .expect("content-type", /text\/html/);

        expect(response.text).toContain("cannot PUT /serieA/asdf");
    });
});

describe("DELETE /serieA/:id", () => {
    test("Valid request", async () => {
        const resp = await req.delete("/serieA/1").expect(204);

        expect(resp.text).toEqual("");
    });
    test("does not exist", async () => {
        //@ts-ignore
        prismaMock.serieA.delete.mockRejectedValue(new Error("error"));
        const response = await req
            .delete("/serieA/23")
            .expect(404)
            .expect("content-type", /text\/html/);

        expect(response.text).toContain("CAN NOT DELETE/serieA/23");
    });

    test("invalid serieA ID", async () => {
        const response = await req
            .delete("/serieA/asdf")
            .expect(404)
            .expect("content-type", /text\/html/);

        expect(response.text).toContain("cannot DELETE /serieA/asdf");
    });
});
