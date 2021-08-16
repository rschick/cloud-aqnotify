// @ts-ignore
import { api } from "@serverless/cloud";

test("returns current data", async () => {
  const result = await api.get("/current").invoke();
  console.log(result);
});
