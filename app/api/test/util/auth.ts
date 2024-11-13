import superfest from "supertest";

export default async function auth() {

    const request = superfest("http://localhost:3000/api");
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
  .send(`csrfToken=${csrfToken}&username=${username}&password=${password}`);

expect(response.status).toBe(302);
return response.headers["set-cookie"][0];

}
 



