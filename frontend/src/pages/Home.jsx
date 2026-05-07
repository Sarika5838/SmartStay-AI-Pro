import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, MapPin, Calendar, Users } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-50">
      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      
      <div className="flex-1 max-w-7xl w-full mx-auto px-6 py-12 flex flex-col items-center justify-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 text-primary-600 font-medium text-sm">
            <Bot size={16} /> Meet Your AI Concierge
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Redefining Luxury Travel with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-600">Smart AI</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Experience the future of hotel booking. Let our intelligent concierge find, compare, and book your perfect stay through a natural conversation.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/chat" className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-semibold shadow-lg shadow-primary-500/30 transition-all flex items-center justify-center gap-2 text-lg">
              <Bot size={22} /> Start Planning
            </Link>
          </div>
        </motion.div>

        {/* Mock Search Bar for visual effect */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 w-full max-w-4xl glass rounded-2xl p-4 flex flex-col md:flex-row items-center gap-4 shadow-xl border border-white/50"
        >
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/50 rounded-xl w-full">
            <MapPin className="text-slate-400" />
            <div className="flex flex-col w-full">
              <span className="text-xs font-semibold text-slate-500 uppercase">Location</span>
              <input type="text" placeholder="Where are you going?" className="bg-transparent border-none outline-none text-slate-800 font-medium w-full" />
            </div>
          </div>
          <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/50 rounded-xl w-full">
            <Calendar className="text-slate-400" />
            <div className="flex flex-col w-full">
              <span className="text-xs font-semibold text-slate-500 uppercase">Dates</span>
              <input type="text" placeholder="Add dates" className="bg-transparent border-none outline-none text-slate-800 font-medium w-full" />
            </div>
          </div>
          <div className="w-px h-12 bg-slate-200 hidden md:block"></div>
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-white/50 rounded-xl w-full">
            <Users className="text-slate-400" />
            <div className="flex flex-col w-full">
              <span className="text-xs font-semibold text-slate-500 uppercase">Guests</span>
              <input type="text" placeholder="1 room, 2 adults" className="bg-transparent border-none outline-none text-slate-800 font-medium w-full" />
            </div>
          </div>
          <button 
            onClick={() => navigate('/chat')}
            className="w-full md:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold transition-all">
            Search
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
