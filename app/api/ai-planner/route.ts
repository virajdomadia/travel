
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini
// In real app, put GEMINI_API_KEY in .env.local
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "YOUR_API_KEY");

export async function POST(request: Request) {
    try {
        const { message, history } = await request.json();

        // If no API key, return a sophisticated mock to ensure functionality for the demo
        if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "YOUR_API_KEY") {
            // Mock logic based on keywords
            const lowerMsg = message.toLowerCase();

            await new Promise(r => setTimeout(r, 2000)); // Simulate thinking

            if (lowerMsg.includes("kyoto") || lowerMsg.includes("japan")) {
                return NextResponse.json({
                    response: "I've crafted a 5-day zen journey through Kyoto focusing on culture and cuisine.",
                    isItinerary: true,
                    itinerary: {
                        days: [
                            { day: 1, title: "Arrival & Gion District", activities: ["Check into Ryokan", "Evening walk in Gion Geisha District", "Kaiseki Dinner"] },
                            { day: 2, title: "Temple Run", activities: ["Kinkaku-ji (Golden Pavilion)", "Ryoan-ji Zen Garden", "Bamboo Grove walk"] },
                            { day: 3, title: "Cultural Deep Dive", activities: ["Tea Ceremony experience", "Nishiki Market food tour", "Fushimi Inari Shrine at sunset"] },
                            { day: 4, title: "Day Trip to Nara", activities: ["Train to Nara Park", "Feed the bowing deer", "Todai-ji Temple"] },
                            { day: 5, title: "Modern Kyoto", activities: ["Kyoto Tower", "Shopping in Shijo Dori", "Departure"] }
                        ]
                    }
                });
            } else if (lowerMsg.includes("swiss") || lowerMsg.includes("europe") || lowerMsg.includes("alps")) {
                return NextResponse.json({
                    response: "A breathtaking Alpine adventure awaits. Here is your Swiss itinerary.",
                    isItinerary: true,
                    itinerary: {
                        days: [
                            { day: 1, title: "Zurich Arrival", activities: ["Land in Zurich", "Train to Interlaken", "Lake Brienz Boat Tour"] },
                            { day: 2, title: "Top of Europe", activities: ["Jungfraujoch Railway", "Ice Palace Tour", "Fondue Dinner"] },
                            { day: 3, title: "Adventure Day", activities: ["Paragliding over Interlaken", "Hiking in Grindelwald", "Spa relaxation"] },
                        ]
                    }
                });
            } else {
                return NextResponse.json({
                    response: "I can definitely help with that! To build the perfect itinerary, could you specify your preferred destination directly? For example, ask for a 'trip to Tokyo' or 'vacation in Paris'.",
                    isItinerary: false
                });
            }
        }

        // Real Gemini Logic (Enabled if Key exists)
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
            You are an expert travel agent. 
            User Request: ${message}
            
            If the user is asking for a plan/itinerary, return valid JSON **ONLY** with this structure:
            {
                "response": "Short friendly text introduction",
                "isItinerary": true,
                "itinerary": {
                    "days": [
                        { "day": 1, "title": "Day Title", "activities": ["Activity 1", "Activity 2"] }
                    ]
                }
            }

            If it's just a chat/question, return valid JSON with:
            {
                "response": "Your answer here",
                "isItinerary": false
            }

            Do not wrap in markdown code blocks. Just raw JSON.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean cleanup if model returns markdown
        const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return NextResponse.json(JSON.parse(cleanJson));

    } catch (error) {
        console.error("AI Planner Error:", error);
        // Fallback mock
        return NextResponse.json({
            response: "I'm processing your request but encountered a hiccup. Could you try asking again specifically about Japan or Switzerland for my demo database?",
            isItinerary: false
        });
    }
}
