import { api, schedule, params } from "@serverless/cloud";

import { getCurrent, update } from "./lib/data";

// Look up location here: http://www4.nrcan.gc.ca/search-place-names/search
// See also:
// https://www.nrcan.gc.ca/earth-sciences/geography/geographical-names-board-canada/about-canadian-geographical-names-database/9180
// https://dd.weather.gc.ca/air_quality/doc/AQHI_XML_File_List.xml

// code is the "Key" from the CGNDB result
const code = params.LOCATION_CGNDB_KEY || "JCVCJ"; // Squamish

api.get("/health", async (req, res) => {
  res.json({ status: "ok" });
});

api.get("/error", async (req, res) => {
  throw new Error("Error!");
});

api.get("/slow", { timeout: 50 }, async (_req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  res.status(200).send("should not reach here");
});

api.get("/await", async (_req, res) => {
  new Promise((resolve) => setTimeout(resolve, 1000)).then(() => {
    console.log("done");
  });
  res.status(200).type("text").send("OK");
});

api.get("/current", async (req, res) => {
  const data = await getCurrent(code);
  console.log("got data:", data);
  res.json(data);
});

schedule.every("1 hour", async () => {
  await update(code);
});
