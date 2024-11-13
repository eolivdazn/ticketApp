import superfest from "supertest";

const request = superfest("http://localhost:3000/api");
let token: string
describe("POST REQUESTS Wihtout autht", () => {
  it("POST /tickets", async () => {
    const response = await request.post("/tickets");
    expect(response.status).toBe(401);
  });
  it("PATCH /tickets", async () => {
    const response = await request.patch("/tickets");
    expect(response.status).toBe(405);
  });
});

describe("POST REQUESTS with auth", () => {
  beforeAll(async () => {
    const csrfToken =
      "38e95149452364e3ea8e3663ab2881725a5d9f52c0b161760f6958ea07c16337";
    const callbackUrl = "http://localhost:3000/";
    const username = "eterra1";
    const password = "123";
      const response = await request
        .post("/auth/callback/password")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set(
          "Cookie",
          `next-auth.csrf-token=${csrfToken}|9ae09dbacb0d0b9807cdb1dac918626285dcb27f348b48b27148913b1af405f1; next-auth.callback-url=${encodeURIComponent(
            callbackUrl
          )}`
        )
        .send(
          `csrfToken=${csrfToken}&username=${username}&password=${password}`
        );

      expect(response.status).toBe(302);
      token = response.headers["set-cookie"][0]
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
      expect(response.status).toBe(400);
      expect(response.text).toContain(el.message);
      console.log(response);
    })
  );
});
