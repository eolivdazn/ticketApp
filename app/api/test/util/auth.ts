import superfest from "supertest";

export default async function auth() {
  const request = superfest(process.env.API_URL!);
  const csrfToken = process.env.CSRFTOKEN!;
  const token = process.env.TOKEN!;
  const callbackUrl = process.env.API_URL!;
  const username = process.env.USERNAME!;
  const password = process.env.PASSWROD!;
  const cookie = process.env.COOKIE!;

  const response = await request
    .post("/auth/callback/password")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .set(
        "Cookie",
        `${cookie}${encodeURIComponent(
          callbackUrl
        )}`
      )
    .send(`csrfToken=${csrfToken}&username=${username}&password=${password}`);

  const regex = /next-auth\.session-token=([^;]+)/;
  console.log(response.headers["set-cookie"]);

  expect(response.status).toBe(302);
  expect(response.headers["set-cookie"][0]).toMatch(regex);
  return response.headers["set-cookie"][0];
}
