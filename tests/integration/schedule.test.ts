import { schedule } from "@serverless/cloud";

test("retrieves latest data", async () => {
  await schedule.every("1 hour").invoke();
});
