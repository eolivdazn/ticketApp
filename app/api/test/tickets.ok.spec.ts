import superfest from "supertest";
import auth from "./util/auth";

const request = superfest(process.env.API_URL!);
let token: string;
describe("Tickets request with auth", () => {
  beforeAll(async () => {
    token = await auth();
    // console.log(token)
  });
  
// __Host-next-auth.csrf-token=79c99db5bf48fdabb5784c90d93e0b672c752842d373911492e71fbc96f8285b%7C1276aa625cfbade1f14e3f73d7cca623b20dca38f45648db05ddcb355cb81a94; 
// __Secure-next-auth.callback-url=https%3A%2F%2Fticket-app-sooty.vercel.app%2F; 
// __Secure-next-auth.session-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..n47_omXgMx2wyAUO.vArdCDol56dCmXFnechGroK_NTqtNOVek9WNG6DzvYrYfX4UbrurgQqoDgtAAzUkDpfmgjpHR9sFkFLvVGoS4oFJ2iCPv-o5ZIgeKN50RaG7bsj8DDt2t8MNcn64TCvePn9yCbIvU3LP_V-ZkVC41n0N1BjkH4vh7CM3I9A.g1fUoNqKdyEgTNhJ61ljjg'"
  it.only(`POST /tickets`, async () => {
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
