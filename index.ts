import { api, schedule, params } from "@ampt/cloud";

import { getCurrent, update } from "./lib/data";

// Look up location here: http://www4.nrcan.gc.ca/search-place-names/search
// See also:
// https://www.nrcan.gc.ca/earth-sciences/geography/geographical-names-board-canada/about-canadian-geographical-names-database/9180
// https://dd.weather.gc.ca/air_quality/doc/AQHI_XML_File_List.xml

// code is the "Key" from the CGNDB result
const code = params.LOCATION_CGNDB_KEY || "JCVCJ"; // Squamish test

api.get("/api/current", async (req, res) => {
  const data = await getCurrent(code);
  if (!data) {
    res.status(404).end();
    return;
  }
  res.set("cache-control", "max-age=600, must-revalidate").json(data);
});

api.post("/api/update", async (req, res) => {
  await update(code);
  res.status(204).end();
});

schedule.every("1 hour", async () => {
  await update(code);
});
