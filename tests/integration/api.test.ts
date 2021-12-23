import { api } from "@serverless/cloud";

test("returns current data", async () => {
  const { body } = await api.get("/current").invoke();
  expect(body).toEqual(
    expect.objectContaining({
      nameEn: "Squamish",
      nameFr: "Squamish",
      aqhi: expect.any(String),
      code: expect.any(String),
    })
  );
});
