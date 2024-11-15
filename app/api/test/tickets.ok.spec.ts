import superfest from "supertest";
import auth from "./util/auth";

const request = superfest(process.env.API_URL!);
let token: string;
describe("Tickets request with auth", () => {
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
        title: "Post test",
        description: "test",
        status: "STARTED",
        priority: "HIGH",
      });
    expect(response.status).toBe(201);
  });
  it(`PATCH /tickets`, async () => {
    const response = await request
      .patch("/tickets/1")
      .set("Cookie", token)
      .set("Accept", "application/json, text/plain, */*")
      .set("Content-Type", "application/json")
      .send({
        title: "Patch test",
        description: "test",
        status: "STARTED",
        priority: "HIGH",
      });
    expect(response.status).toBe(200);
  });
});
