import request from "supertest";
import auth from "./util/auth";
const csrfToken =
  "38e95149452364e3ea8e3663ab2881725a5d9f52c0b161760f6958ea07c16337";
const callbackUrl = process.env.API_URL!;
const username = process.env.USERNAME!;
const password = process.env.PASSWROD!;;

describe("POST /api/auth", () => {
  it("should authenticate the user", async () => {
    await auth()
  });
});
