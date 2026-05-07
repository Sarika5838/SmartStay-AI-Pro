import { Link } from 'react-router-dom';
import { Bot, Home, Map, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 text-primary-600 font-bold text-xl">
        <Bot size={28} className="text-primary-500" />
        <span>SmartStay AI</span>
      </Link>
      
      <div className="flex items-center gap-6 text-slate-600 font-medium">
        <Link to="/" className="hover:text-primary-500 transition-colors flex items-center gap-1">
          <Home size={18} /> Home
        </Link>
        <Link to="/chat" className="hover:text-primary-500 transition-colors flex items-center gap-1">
          <Bot size={18} /> Concierge
        </Link>
        <Link to="/explore" className="hover:text-primary-500 transition-colors flex items-center gap-1">
          <Map size={18} /> Explore
        </Link>
        <Link to="/auth" className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
          <User size={18} /> Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
