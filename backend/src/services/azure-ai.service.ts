import { AzureOpenAI } from "openai";

export interface ItineraryPrompt {
  title: string;
  preferences: string;
  budget: number;
  date: string;
  tripTypes: string[];
  duration: number;
}

export interface GeneratedDestination {
  destinasi_id: number;
  urutan_hari: number;
}

export interface GeneratedItinerary {
  destinations: GeneratedDestination[];
  estimatedCosts: {
    transportasi: number;
    akomodasi: number;
    makan: number;
    tiket_wisata: number;
    total_biaya: number;
  };
}

export class AzureAIService {
  private client: AzureOpenAI;
  private deploymentName: string;

  constructor() {
    // Ensure to use only the base URL without any paths or query parameters
    const endpoint = process.env.AZURE_AI_ENDPOINT || "";
    const apiKey = process.env.AZURE_AI_KEY || "";

    // Use the specific API version for DeepSeek models
    const apiVersion = "2024-05-01-preview";

    this.deploymentName =
      process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "DeepSeek-R1";

    console.log(`Initializing Azure OpenAI with endpoint: ${endpoint}`);
    console.log(`Using deployment: ${this.deploymentName}`);

    this.client = new AzureOpenAI({
      apiKey,
      endpoint,
      apiVersion,
      deployment: this.deploymentName,
    });
  }

  async generateItinerary(
    prompt: ItineraryPrompt
  ): Promise<GeneratedItinerary> {
    try {
      // Format the prompt for the AI with stricter JSON formatting instructions
      const promptText = `
Generate a travel itinerary for a trip to Yogyakarta with the following details:
Title: ${prompt.title}
Preferences: ${prompt.preferences}
Budget: ${prompt.budget} IDR
Date: ${prompt.date}
Trip Types: ${prompt.tripTypes.join(", ")}
Duration: ${prompt.duration} days

Your task is to create a detailed itinerary that includes:
1. A list of destinations to visit on each day
2. Estimated costs for transportation, accommodation, food, and entrance tickets

IMPORTANT: You must respond with ONLY a valid JSON object having exactly this structure:
{
  "destinations": [
    {"destinasi_id": number, "urutan_hari": number},
    ...more destinations
  ],
  "estimatedCosts": {
    "transportasi": number,
    "akomodasi": number,
    "makan": number,
    "tiket_wisata": number,
    "total_biaya": number
  }
}

DO NOT include any explanatory text before or after the JSON.
DO NOT use markdown code blocks.
DO NOT include the word "json" anywhere in your response.
ONLY RETURN THE RAW JSON OBJECT.

Use the following destination IDs from our Yogyakarta tourism database:
1: Malioboro Street - Shopping district
2: Keraton (Sultan's Palace) - Historical site
3: Taman Sari Water Castle - Historical site
4: Borobudur Temple - UNESCO World Heritage Site
5: Prambanan Temple - UNESCO World Heritage Site
6: Parangtritis Beach - Nature/Beach
7: Mount Merapi - Nature/Mountain
8: Kaliurang - Mountain resort area
9: Ullen Sentalu Museum - Cultural museum
10: Goa Pindul - Cave tubing
11: Jomblang Cave - Nature/Adventure
12: Timang Beach - Scenic beach with gondola
13: Yogyakarta Fortress Museum - Historical site
14: Alun-Alun Kidul - City square/park
15: Gudeg Restaurants (Various) - Local cuisine
`;

      console.log("Sending request to Azure OpenAI...");

      // Define the output schema for structured response
      const response = await this.client.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant that creates travel itineraries in Yogyakarta, Indonesia. You MUST respond with valid JSON only. No explanatory text, no markdown formatting. Just a pure JSON object.",
          },
          { role: "user", content: promptText },
        ],
        model: this.deploymentName,
        max_tokens: 3000,
        temperature: 0.3, // Lower temperature for more deterministic output
        response_format: { type: "json_object" },
      });

      // Parse the response
      const responseText = response.choices[0].message.content;

      // Log raw response for debugging
      console.log("Raw AI response:", responseText?.substring(0, 100) + "...");

      if (!responseText) {
        throw new Error("Empty response received from AI");
      }

      try {
        // Try direct parsing first
        const parsedResponse = JSON.parse(
          responseText.trim()
        ) as GeneratedItinerary;
        console.log("Successfully parsed JSON directly");
        return parsedResponse;
      } catch (jsonError) {
        console.log("Failed to parse direct JSON, trying substring extraction");

        try {
          // More robust extraction approach
          // Find the first opening brace and last closing brace
          let jsonStart = responseText.indexOf("{");
          let jsonEnd = responseText.lastIndexOf("}");

          if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
            // If we can't find valid JSON brackets, try another approach
            // Look for content that may have markdown code blocks
            const markdownMatch = responseText.match(
              /```(?:json)?([\s\S]*?)```/
            );
            if (markdownMatch && markdownMatch[1]) {
              const extractedJson = markdownMatch[1].trim();
              console.log(
                "Extracted JSON from markdown block:",
                extractedJson.substring(0, 100) + "..."
              );
              const parsedFromMarkdown = JSON.parse(
                extractedJson
              ) as GeneratedItinerary;
              return parsedFromMarkdown;
            }

            throw new Error("No valid JSON structure found in response");
          }

          const jsonResponse = responseText.substring(jsonStart, jsonEnd + 1);
          console.log(
            "Extracted JSON:",
            jsonResponse.substring(0, 100) + "..."
          );

          const parsedResponse = JSON.parse(jsonResponse) as GeneratedItinerary;
          return parsedResponse;
        } catch (extractError) {
          console.error("Raw response content:", responseText);
          throw new Error(
            `Failed to parse JSON response from AI: ${extractError instanceof Error ? extractError.message : String(extractError)}`
          );
        }
      }
    } catch (error: unknown) {
      console.error("Error calling Azure AI:", error);
      // Enhanced error logging
      if (typeof error === "object" && error !== null && "response" in error) {
        const errorWithResponse = error as { response: { data: unknown } };
        console.error(
          "Response error details:",
          errorWithResponse.response.data
        );
      }
      throw new Error(
        `Failed to generate itinerary with AI: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
}

export const azureAIService = new AzureAIService();
