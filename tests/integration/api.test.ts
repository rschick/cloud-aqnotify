import { api, data } from "@serverless/cloud";

test("returns current data", async () => {
  // await data.seed("data.json", false);
  const { body, status } = await api.get("/current").invoke();
  expect(status).toBe(200);
  expect(body).toEqual(
    expect.objectContaining({
      nameEn: "Squamish",
      nameFr: "Squamish",
      aqhi: expect.any(String),
      code: expect.any(String),
    })
  );
});
