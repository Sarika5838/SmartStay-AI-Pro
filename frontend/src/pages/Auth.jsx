import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, LogIn, Lock, Mail, User as UserIcon } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth';
      const payload = isLogin ? { email: formData.email, password: formData.password } : formData;

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Something went wrong');
      }

      // Store user data in local storage
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 relative overflow-hidden px-4">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-200 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200 rounded-full blur-[120px] opacity-60 pointer-events-none" />
      
      <div className="w-full max-w-md bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white p-8 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-slate-500">
            {isLogin ? 'Sign in to continue your journey' : 'Join us and start booking your perfect stay'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <UserIcon size={18} />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>
          )}

          <div className="relative">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Mail size={18} />
              </div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary-600/30 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : isLogin ? (
              <><LogIn size={20} /> Sign In</>
            ) : (
              <><UserPlus size={20} /> Sign Up</>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-slate-600 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-primary-600 font-bold hover:underline"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
