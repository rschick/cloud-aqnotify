import { params } from "@ampt/sdk";
import { data } from "@ampt/data";

const code = params("LOCATION_CGNDB_KEY") || "JCVCJ"; // Squamish test

async function main() {
  console.log("Updating", code);
  await data.set(`region_${code}`, {
    code,
    nameEn: "Squamish",
    nameFr: "Squamish",
    aqhi: 2.0,
  });
}

main();
