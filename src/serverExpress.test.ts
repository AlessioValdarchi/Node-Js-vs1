import supertest from "supertest";
import app from "./appExpress";

const req = supertest(app);

test("GET /serieaA", async () => {
    const resp = await req
        .get("/serieA")
        .expect(200)
        .expect("content-type", /application\/json/);

    expect(resp.body).toEqual([{ name: "Lazio" }, { name: "Inter" }]);
});
