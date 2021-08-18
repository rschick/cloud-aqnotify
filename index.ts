// @ts-ignore
import { api, schedule } from "@serverless/cloud";
import { getCurrent, update } from "./lib/data";

const code = "JCVCJ";

api.get("/current", async (req, res) => {
  const data = await getCurrent(code);
  res.json(data);
});

schedule.every("1 hour", async () => {
  await update(code);
});
