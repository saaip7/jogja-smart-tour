"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.azureAIService = exports.AzureAIService = void 0;
const openai_1 = require("openai");
class AzureAIService {
    constructor() {
        const endpoint = process.env.AZURE_AI_ENDPOINT || "";
        const apiKey = process.env.AZURE_AI_KEY || "";
        const apiVersion = "2024-05-01-preview";
        this.deploymentName =
            process.env.AZURE_OPENAI_DEPLOYMENT_NAME || "DeepSeek-R1";
        console.log(`Initializing Azure OpenAI with endpoint: ${endpoint}`);
        console.log(`Using deployment: ${this.deploymentName}`);
        this.client = new openai_1.AzureOpenAI({
            apiKey,
            endpoint,
            apiVersion,
            deployment: this.deploymentName,
        });
    }
    generateItinerary(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Updated prompt with full destination details.
                const promptText = `
      Generate a travel itinerary for a trip to Yogyakarta with the following details:
      
      Title: ${prompt.title}
      Preferences: ${prompt.preferences}
      Budget: ${prompt.budget} IDR
      Date: ${prompt.date}
      Trip Types: ${prompt.tripTypes.join(", ")}
      Duration: ${prompt.duration} days
      
      Your task is to create a detailed itinerary that includes:
      
      1. A list of at least 2 or 3 unique destinations each day.
         For each destination, provide:
           - nama_destinasi
           - lokasi
           - kategori
           - harga_tiket
           - rating
           - urutan_hari (which day)
           - latitude (for Yogyakarta area, between -7.75 and -7.85)
           - longitude (for Yogyakarta area, between 110.3 and 110.5)
      
      2. Estimated costs for transportation, accommodation, food, and entrance tickets
      
      IMPORTANT: You must respond with ONLY a valid JSON object having exactly this structure:
      
      {
        "destinations": [
          {
            "nama_destinasi": string,
            "lokasi": string,
            "kategori": string,
            "harga_tiket": number,
            "rating": number,
            "urutan_hari": number,
            "latitude": number,
            "longitude": number
          },
          ... (more destinations, at least 2 or 3 per day)
        ],
        "estimatedCosts": {
          "transportasi": number,
          "akomodasi": number,
          "makan": number,
          "tiket_wisata": number,
          "total_biaya": number
        }
      }
      
      Use realistic GPS coordinates for actual locations in Yogyakarta. Be precise with these coordinates.
      
      DO NOT include any explanatory text before or after the JSON.
      DO NOT use markdown code blocks.
      DO NOT include the word "json" anywhere in your response.
      ONLY RETURN THE RAW JSON OBJECT.
      `;
                console.log("Sending request to Azure OpenAI...");
                const response = yield this.client.chat.completions.create({
                    messages: [
                        {
                            role: "system",
                            content: "You are an AI assistant that creates travel itineraries in Yogyakarta, Indonesia. You MUST respond with valid JSON only. No explanatory text, no markdown formatting. Just a pure JSON object. You have extensive knowledge of Yogyakarta's attractions, including their exact GPS coordinates. For landmarks like Borobudur Temple, use (-7.6079, 110.2038); for Prambanan Temple, use (-7.7520, 110.4914); for Malioboro Street, use (-7.7925, 110.3669); for Yogyakarta Palace, use (-7.8052, 110.3640). For beaches, mountains, and other attractions, use accurate coordinates within their respective areas.",
                        },
                        { role: "user", content: promptText },
                    ],
                    model: this.deploymentName,
                    max_tokens: 3000,
                    temperature: 0.3,
                    response_format: { type: "json_object" },
                });
                const responseText = response.choices[0].message.content;
                console.log("Raw AI response:", (responseText === null || responseText === void 0 ? void 0 : responseText.substring(0, 100)) + "...");
                if (!responseText) {
                    throw new Error("Empty response received from AI");
                }
                try {
                    const parsedResponse = JSON.parse(responseText.trim());
                    console.log("Successfully parsed JSON directly");
                    return parsedResponse;
                }
                catch (jsonError) {
                    console.log("Failed to parse direct JSON, trying substring extraction");
                    try {
                        let jsonStart = responseText.indexOf("{");
                        let jsonEnd = responseText.lastIndexOf("}");
                        if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) {
                            const markdownMatch = responseText.match(/```(?:json)?([\s\S]*?)```/);
                            if (markdownMatch && markdownMatch[1]) {
                                const extractedJson = markdownMatch[1].trim();
                                console.log("Extracted JSON from markdown block:", extractedJson.substring(0, 100) + "...");
                                const parsedFromMarkdown = JSON.parse(extractedJson);
                                return parsedFromMarkdown;
                            }
                            throw new Error("No valid JSON structure found in response");
                        }
                        const jsonResponse = responseText.substring(jsonStart, jsonEnd + 1);
                        console.log("Extracted JSON:", jsonResponse.substring(0, 100) + "...");
                        const parsedResponse = JSON.parse(jsonResponse);
                        return parsedResponse;
                    }
                    catch (extractError) {
                        console.error("Raw response content:", responseText);
                        throw new Error(`Failed to parse JSON response from AI: ${extractError instanceof Error ? extractError.message : String(extractError)}`);
                    }
                }
            }
            catch (error) {
                console.error("Error calling Azure AI:", error);
                if (typeof error === "object" && error !== null && "response" in error) {
                    const errorWithResponse = error;
                    console.error("Response error details:", errorWithResponse.response.data);
                }
                throw new Error(`Failed to generate itinerary with AI: ${error instanceof Error ? error.message : String(error)}`);
            }
        });
    }
}
exports.AzureAIService = AzureAIService;
exports.azureAIService = new AzureAIService();
