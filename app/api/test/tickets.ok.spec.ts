import superfest from "supertest";
import auth from "./util/auth";

const request = superfest("http://localhost:3000/api");
let token: string;
describe("POST REQUESTS with auth", () => {
  beforeAll(async () => {
    token = await auth();
  });

  it(`POST /tickets`, async () => {
    const response = await request
      .post("/tickets")
      .set("Cookie", token)
      .set("Accept", "application/json, text/plain, */*")
      .set("Content-Type", "application/json")
      .send({
        title: "test",
        description: "test",
        status: "STARTED",
        priority: "HIGH",
      });
    expect(response.status).toBe(201);
  });
  it(`PATCH /tickets`, async () => {
    const response = await request
      .post("/tickets")
      .set("Cookie", token)
      .set("Accept", "application/json, text/plain, */*")
      .set("Content-Type", "application/json")
      .send({
        title: "test",
        description: "test",
        status: "STARTED",
        priority: "HIGH",
      });
    expect(response.status).toBe(201);
  });
});
