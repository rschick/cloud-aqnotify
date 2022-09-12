import { api, schedule, params } from "@serverless/cloud";
import pino from "pino";

import { getCurrent, update } from "./lib/data";
import { sendAqhiNotification } from "./lib/notify";

// Look up location here: http://www4.nrcan.gc.ca/search-place-names/search
// See also:
// https://www.nrcan.gc.ca/earth-sciences/geography/geographical-names-board-canada/about-canadian-geographical-names-database/9180
// https://dd.weather.gc.ca/air_quality/doc/AQHI_XML_File_List.xml

// code is the "Key" from the CGNDB result
const code = params.LOCATION_CGNDB_KEY || "JCVCJ"; // Squamish test

const logger = pino({ level: params.LOG_LEVEL || "trace" });

api.get("/api/health", async (req, res) => {
  logger.info("hello");
  logger.info({ _aws: { value: "something" } }, "embedded metrics");
  console.log("hello");
  res.json({ status: "ok" });
});

api.get("/api/error", async (req, res) => {
  throw new Error("Error!");
});

api.get("/api/slow", { timeout: 50 }, async (_req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  res.status(200).send("should not reach here");
});

api.get("/api/await", async (_req, res) => {
  new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
    console.log("done");
  });
  res.status(200).type("text").send("OK");
});

api.get("/api/current", async (req, res) => {
  const data = await getCurrent(code);
  if (!data) {
    res.status(404).end();
    return;
  }
  res.json(data);
});

api.post("/api/update", async (req, res) => {
  await update(code);
  res.status(204).end();
});

api.post("/api/notify", async (req, res) => {
  const current = await getCurrent(code);

  await sendAqhiNotification(params.NOTIFICATION_EMAIL, current);

  res.status(204).end();
});

schedule.every("1 hour", async () => {
  await update(code);
});
