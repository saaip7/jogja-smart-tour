import * as Papa from "papaparse";
import { Attraction } from ".././utils/attractions.utils";
export const loadAttractionData = async (): Promise<Attraction[]> => {
  try {
    const response = await fetch("/data/raw_data.csv");
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log(
            "Data loaded successfully:",
            results.data.length,
            "attractions"
          );
          resolve(results.data as Attraction[]);
        },
        error: (error: Error) => {
          console.error("Error parsing CSV:", error);
          reject(error);
        },
      });
    });
  } catch (error) {
    console.error("Error fetching CSV file:", error);
    return [];
  }
};
