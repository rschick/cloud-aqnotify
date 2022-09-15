import { data, params } from "@serverless/cloud";
import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";

import { sendAqhiNotification } from "./notify";

type AqData = {
  aqhi: number;
  code: string;
  nameEn: string;
  nameFr: string;
};

async function getAirQualityData(code): Promise<AqData> {
  const response = await fetch(
    `http://dd.weather.gc.ca/air_quality/aqhi/pyr/observation/realtime/xml/AQ_OBS_${code}_CURRENT.xml`,
    {}
  );

  if (!response.ok) {
    throw new Error(
      `Failed to get AQHI data: ${response.status} ${response.statusText}`
    );
  }

  const text = await response.text();

  try {
    const result = await parseStringPromise(text);
    return {
      code: result.conditionAirQuality.region[0]._,
      nameEn: result.conditionAirQuality.region[0].$.nameEn,
      nameFr: result.conditionAirQuality.region[0].$.nameFr,
      aqhi: Number.parseFloat(
        result.conditionAirQuality.airQualityHealthIndex[0]
      ),
    };
  } catch (error) {
    throw new Error(`Failed to parse AQHI data: ${error.message}`);
  }
}

export async function getCurrent(code): Promise<AqData | undefined> {
  const result = await data.get<AqData>(`region_${code}`);
  return result;
}

export async function update(code) {
  const existing = await getCurrent(code);
  const current = await getAirQualityData(code);

  console.log("got data:", { code, existing, current });

  if (!existing || existing.aqhi !== current.aqhi) {
    await data.set(`region_${code}`, current);

    if (current.aqhi >= 3) {
      await sendAqhiNotification(current);
    }
  }
}
