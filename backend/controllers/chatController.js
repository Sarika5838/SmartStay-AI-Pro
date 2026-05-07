import initGemini from '../config/gemini.js';
import Hotel from '../models/Hotel.js';
import { searchHotels } from '../services/hotelService.js';

// Define the tool for Gemini
const hotelSearchTool = {
  name: "search_hotels",
  description: "Search for hotels in a specific location with optional dates and guest details. Use this when the user asks to find or book a hotel.",
  parameters: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "The city or destination the user wants to stay in."
      },
      checkIn: {
        type: "string",
        description: "Check-in date if provided (YYYY-MM-DD)"
      },
      checkOut: {
        type: "string",
        description: "Check-out date if provided (YYYY-MM-DD)"
      },
      guests: {
        type: "integer",
        description: "Number of guests"
      },
      rooms: {
        type: "integer",
        description: "Number of rooms"
      }
    },
    required: ["location"]
  }
};

export const handleChat = async (req, res) => {
  const { message, history } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const genAI = initGemini();
  if (!genAI) {
    return res.status(500).json({ error: 'Gemini AI is not configured on the server.' });
  }

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      tools: [{ functionDeclarations: [hotelSearchTool] }]
    });

    const systemPrompt = `You are "SmartStay AI Pro", a premium, professional, and intelligent hotel booking assistant and travel concierge. 
    Your job is to help users find hotels, plan their trips, provide local recommendations, and answer questions about bookings.
    Be polite, concise, and helpful. 
    
    CRITICAL INSTRUCTION:
    If you decide to call the search_hotels function and receive results back from the system, you MUST append a JSON block at the VERY END of your response containing those exact hotel results so our UI can render them. 
    Format the JSON block EXACTLY like this with no markdown code blocks around the tags:
    
    [HOTEL_CARDS]
    [
      {
        "id": "...",
        "name": "...",
        "location": "...",
        "rating": 4.5,
        "price": 250,
        "roomType": "...",
        "imageUrl": "...",
        "bookingUrl": "..."
      }
    ]
    [/HOTEL_CARDS]

    If the user asks about something unrelated to travel, hotels, or bookings, politely steer the conversation back to travel.`;

    const formattedHistory = history ? history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.parts[0].text }],
    })) : [];

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }]
        },
        {
          role: 'model',
          parts: [{ text: 'Understood. I am SmartStay AI Pro.' }]
        },
        ...formattedHistory
      ]
    });

    // Send the user message
    const result = await chat.sendMessage([{ text: message }]);
    
    // Check if Gemini wants to call a function
    const functionCalls = result.response.functionCalls();
    
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      
      if (call.name === 'search_hotels') {
        const { location, checkIn, checkOut, guests, rooms } = call.args;
        
        console.log(`[ChatController] Gemini requested hotel search for: ${location}`);
        
        // Execute our service
        const hotelsData = await searchHotels(location, checkIn, checkOut, guests, rooms);
        
        // Return the function result back to Gemini so it can generate the final answer
        const functionResponseResult = await chat.sendMessage([{
          functionResponse: {
            name: 'search_hotels',
            response: { hotels: hotelsData }
          }
        }]);
        
        const finalText = functionResponseResult.response.text();
        return res.json({ reply: finalText });
      }
    }

    // Normal text response
    const text = result.response.text();
    res.json({ reply: text });

  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Fallback if Gemini fails but the user asked for hotels
    if (message.toLowerCase().includes('hotel') || message.toLowerCase().includes('book') || message.toLowerCase().includes('stay')) {
      const cityMatch = message.match(/in\s+([a-zA-Z\s]+)/i);
      const city = cityMatch ? cityMatch[1].trim() : 'Paris';
      
      try {
        const hotelsData = await searchHotels(city, null, null, 2, 1);
        const fallbackText = `I'm currently experiencing high demand and my AI brain is rate-limited, but I found these amazing hotels in ${city} for you:\n\n[HOTEL_CARDS]\n${JSON.stringify(hotelsData)}\n[/HOTEL_CARDS]`;
        return res.json({ reply: fallbackText });
      } catch (err) {
        console.error('Fallback hotel search failed:', err);
      }
    }

    res.status(500).json({ error: 'An error occurred while communicating with the AI.' });
  }
};
