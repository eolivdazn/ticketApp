import superfest from "supertest";

const request = superfest("http://localhost:3000/api");
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
  // beforeAll(() => {
  //   const csrfToken =
  //     "38e95149452364e3ea8e3663ab2881725a5d9f52c0b161760f6958ea07c16337";
  //   const callbackUrl = "http://localhost:3000/";
  //   const username = "eterra1";
  //   const password = "123";
  //   it("should authenticate the user", async () => {
  //     const response = await request
  //       .post("/auth/callback/password")
  //       .set("Content-Type", "application/x-www-form-urlencoded")
  //       .set(
  //         "Cookie",
  //         `next-auth.csrf-token=${csrfToken}|9ae09dbacb0d0b9807cdb1dac918626285dcb27f348b48b27148913b1af405f1; next-auth.callback-url=${encodeURIComponent(
  //           callbackUrl
  //         )}`
  //       )
  //       .send(
  //         `csrfToken=${csrfToken}&username=${username}&password=${password}`
  //       );

  //     const regex = /next-auth\.session-token=([^;]+)/;
  //     expect(response.status).toBe(302); // or whatever status you expect
  //     token = response.headers["set-cookie"][0].match(regex);
  //     expect(response.headers["set-cookie"][0]).toMatch(regex);
  //     if (token) console.log(token[1]);
  //   });
  // });

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
    // {
    //   data: {
    //     title: "test",
    //     description: "test",
    //     status: "test",
    //     priority: "LOW",
    //   },
    //   message:
    //     "Invalid enum value. Expected 'STARTED' | 'OPEN' | 'CLOSED', received 'test'",
    //   testCase: "schema validation status",
    // },
  ];
  wrongPayload.forEach((el) =>
    it.only(`POST /tickets ${el.testCase}`, async () => {
      const response = await request
        .post("/tickets")
        .set(
          "Cookie",
          "next-auth.csrf-token=38e95149452364e3ea8e3663ab2881725a5d9f52c0b161760f6958ea07c16337%7C9ae09dbacb0d0b9807cdb1dac918626285dcb27f348b48b27148913b1af405f1; next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000%2F; next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..MxXY0fvkYDxca2Ch.yEE36kv2fXOvyLSkEEQuneNvunh6WlskFJTwyWfVqOJcPOlRmJTgCt2iMeJldZnkuQ-tORdsfZQ6e_jOrsuHI9bWMzVzRFJbsTuxf4dv3DkbCyujx8j3pMinGc5Nr_49tPUgUmRKxRMBSr64x5D87ZPPgEM6fW168rg.Nzt-gjs1iz_BkIIlHufKkw; next-auth.callback-url=http%3A%2F%2Flocalhost%3A3000; next-auth.csrf-token=1dc572038fd82eae00728a6c665967bc7888584c4dee243c30ce7cd3be4e4cd2%7C9d3ef743a7a02084ddf6ce7e633d10489f23ab79efa335d39f4b3201d113aaf1"
        )
        .set("Accept", "application/json, text/plain, */*")
        .set("Content-Type", "application/json")
        .send(el.data);
      expect(response.status).toBe(400);
      expect(response.text).toContain(el.message);
      console.log(response);
    })
  );
});
