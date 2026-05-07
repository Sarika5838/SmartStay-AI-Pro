import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Loader2, Sparkles, MapPin, Star, Bed } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Hotel Card Component
const HotelCard = ({ hotel, onBook }) => {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden min-w-[280px] max-w-[320px] shrink-0 group hover:shadow-md transition-shadow">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={hotel.imageUrl} 
          alt={hotel.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80";
          }}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-sm font-bold text-slate-800 flex items-center gap-1 shadow-sm">
          <Star size={14} className="text-yellow-500 fill-yellow-500" />
          {hotel.rating}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1 truncate">{hotel.name}</h3>
        <div className="flex items-center gap-1 text-slate-500 text-sm mb-3">
          <MapPin size={14} />
          <span className="truncate">{hotel.location}</span>
        </div>
        <div className="flex items-center gap-2 text-slate-600 text-sm mb-4 bg-slate-50 p-2 rounded-lg">
          <Bed size={16} className="text-primary-500" />
          <span className="truncate">{hotel.roomType}</span>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <div>
            <span className="text-xs text-slate-500 uppercase font-semibold">Per night</span>
            <div className="text-xl font-extrabold text-primary-600">${hotel.price}</div>
          </div>
          <button 
            onClick={() => onBook(hotel)}
            className="px-4 py-2 bg-slate-900 hover:bg-primary-600 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Hello! I am SmartStay AI Pro. How can I assist you with your travel plans today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const parseMessageData = (rawText) => {
    let text = rawText;
    let hotels = [];
    
    // Look for [HOTEL_CARDS]...[/HOTEL_CARDS] tag
    const hotelMatch = text.match(/\[HOTEL_CARDS\]([\s\S]*?)\[\/HOTEL_CARDS\]/);
    if (hotelMatch) {
      try {
        hotels = JSON.parse(hotelMatch[1].trim());
        // Remove the JSON block from the text
        text = text.replace(hotelMatch[0], '').trim();
      } catch (e) {
        console.error("Failed to parse hotel cards JSON", e);
      }
    }
    
    return { text, hotels };
  };

  const handleSend = async (overrideText = null) => {
    const textToSend = overrideText || input;
    if (!textToSend.trim()) return;

    const userMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    if (!overrideText) setInput('');
    setIsLoading(true);

    try {
      // Format history for backend (strip out UI-specific stuff like hotel cards if we wanted, but here we just send text)
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const res = await axios.post('http://localhost:5000/api/chat', {
        message: textToSend,
        history: history
      });

      const parsedData = parseMessageData(res.data.reply);
      const aiMessage = { 
        role: 'model', 
        text: parsedData.text,
        hotels: parsedData.hotels.length > 0 ? parsedData.hotels : undefined
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'model', text: 'Sorry, I encountered an error connecting to my servers. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

 const handleBookHotel = (hotel) => {
  setMessages(prev => [
    ...prev,
    {
      role: "assistant",
      text: `✅ Booking confirmed for ${hotel.name} in ${hotel.location}`
    }
  ]);

  handleSend(`User booked ${hotel.name}`);
};

  return (
    <div className="flex-1 flex bg-slate-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
      
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full glass shadow-2xl m-4 sm:m-8 rounded-2xl overflow-hidden relative z-10 border border-white/60">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
              <Bot size={24} />
            </div>
            <div>
              <h2 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                SmartStay AI Pro <Sparkles size={16} className="text-yellow-500" />
              </h2>
              <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> Online
              </p>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col gap-4 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.role === 'user' ? 'bg-slate-800 text-white' : 'bg-primary-500 text-white'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`rounded-2xl px-5 py-3 shadow-sm ${msg.role === 'user' ? 'bg-slate-800 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'}`}>
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  </div>
                </div>
                
                {/* Render Hotel Cards if present */}
                {msg.hotels && msg.hotels.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex gap-4 overflow-x-auto pb-4 pt-2 pl-12 pr-4 w-full"
                    style={{ scrollbarWidth: 'none' }}
                  >
                    {msg.hotels.map((hotel, idx) => (
                      <HotelCard key={idx} hotel={hotel} onBook={handleBookHotel} />
                    ))}
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center flex-shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm flex items-center gap-2">
                <Loader2 size={18} className="animate-spin text-primary-500" />
                <span className="text-slate-500 text-sm font-medium">SmartStay is thinking...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 z-20">
          <div className="relative max-w-3xl mx-auto flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 shadow-inner">
            <textarea
              className="flex-1 bg-transparent border-none outline-none resize-none max-h-32 min-h-[44px] py-3 px-4 text-slate-700"
              placeholder="Ask me to find a hotel in Paris, or about your upcoming trip..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              rows={1}
            />
            <button
              onClick={() => handleSend(null)}
              disabled={!input.trim() || isLoading}
              className="w-11 h-11 rounded-xl bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors flex-shrink-0 shadow-md"
            >
              <Send size={18} />
            </button>
          </div>
          <div className="text-center mt-3">
            <span className="text-[10px] text-slate-400 font-medium">AI Concierge can make mistakes. Please verify important information.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
