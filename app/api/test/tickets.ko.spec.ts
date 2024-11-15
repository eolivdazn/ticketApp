import superfest from "supertest";
import auth from "./util/auth";

const request = superfest(process.env.API_URL!);
let token: string
describe("POST request wihtout auth", () => {
  it("POST /tickets", async () => {
    const response = await request.post("/tickets");
    expect(response.status).toBe(401);
  });
  it("PATCH /tickets", async () => {
    const response = await request.patch("/tickets");
    expect(response.status).toBe(405);
  });
});

describe("POST request with auth", () => {
  beforeAll(async () => {
    token = await auth()
  });

  const wrongPayload = [
    {
      data: {
        title: "test",
        description: "test",
        status: "STARTED",
        priority: "test",
      },
      message:
        "Invalid enum value. Expected 'LOW' | 'HIGH' | 'MEDIUM', received 'test'",
      testCase: "schema validation priority",
    },
    {
      data: {
        title: "test",
        description: "test",
        status: "test",
        priority: "LOW",
      },
      message:
        "Invalid enum value. Expected 'STARTED' | 'OPEN' | 'CLOSED', received 'test'",
      testCase: "schema validation status",
    },
  ];
  wrongPayload.forEach((el) =>
    it(`POST /tickets ${el.testCase}`, async () => {
      const response = await request
        .post("/tickets")
        .set("Cookie",token)
        .set("Accept", "application/json, text/plain, */*")
        .set("Content-Type", "application/json")
        .send(el.data);
      expect(response.status).toBe( 400 );
      expect(response.text).toContain(el.message);
    })
  );
});
