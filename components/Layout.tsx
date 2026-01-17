import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { TOOLS } from '../constants';

const AuthModal: React.FC<{ isOpen: boolean, onClose: () => void }> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    formData.append("form_type", isLogin ? "Login Attempt" : "Sign Up Attempt");
    
    try {
      await fetch("https://formspree.io/f/xojjjbob", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      });
      onClose();
      alert(isLogin ? "Logged in successfully (Demo Mode)" : "Account created successfully (Demo Mode)");
    } catch (err) {
      alert("Connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-fade-in">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 text-white rounded-3xl flex items-center justify-center mx-auto mb-4 text-2xl font-black">E</div>
          <h3 className="text-2xl font-black text-slate-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h3>
          <p className="text-slate-500 text-sm mt-2">Join EuroTools to save your progress and access pro features.</p>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && <input name="full_name" type="text" placeholder="Full Name" className="w-full p-4 border border-slate-100 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" required />}
          <input name="email" type="email" placeholder="Email Address" className="w-full p-4 border border-slate-100 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" required />
          <input name="password" type="password" placeholder="Password" className="w-full p-4 border border-slate-100 bg-slate-50 rounded-2xl focus:ring-2 focus:ring-indigo-600 outline-none" required />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:bg-indigo-300"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-6 text-center text-sm font-bold text-slate-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <button onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 ml-1 hover:underline">{isLogin ? 'Sign up free' : 'Login instead'}</button>
        </div>
      </div>
    </div>
  );
};

const SearchBar: React.FC<{ className?: string, onSelect?: () => void }> = ({ className = "", onSelect }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const filteredTools = TOOLS.filter(t => 
    t.name.toLowerCase().includes(query.toLowerCase()) || 
    t.category.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 5);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={searchRef}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all"
          placeholder="Search tools..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
      </div>
      {isOpen && query.length > 0 && (
        <div className="absolute mt-2 w-full bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
          {filteredTools.length > 0 ? (
            filteredTools.map(tool => (
              <button
                key={tool.id}
                onClick={() => {
                  navigate(tool.path);
                  setQuery('');
                  setIsOpen(false);
                  if (onSelect) onSelect();
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center space-x-3 transition-colors border-b last:border-0 border-gray-50"
              >
                <span className="text-gray-400">{tool.icon}</span>
                <div>
                  <div className="text-sm font-bold text-gray-900">{tool.name}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-tighter">{tool.category}</div>
                </div>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 italic">No tools found...</div>
          )}
        </div>
      )}
    </div>
  );
};

const Header: React.FC = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isToolsExpanded, setIsToolsExpanded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
    setIsToolsExpanded(false);
  }, [pathname]);

  const categories = Array.from(new Set(TOOLS.map(t => t.category)));

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
              <span className="text-2xl font-black bg-indigo-600 text-white w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-xl shadow-indigo-200 shadow-lg">E</span>
              <span className="text-lg sm:text-xl font-black tracking-tight hidden xs:block">EuroTools</span>
            </Link>
            
            <SearchBar className="hidden md:flex flex-1 max-w-md mx-8" />

            <div className="flex items-center space-x-1 md:space-x-4">
              <button 
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
                className="md:hidden p-2 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
                aria-label="Toggle search"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              <nav className="hidden lg:flex space-x-6 text-sm font-bold items-center pr-4 border-r border-gray-100 mr-4">
                <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">Home</Link>
                <Link to="/blog" className="text-gray-600 hover:text-indigo-600 transition-colors">Blog</Link>
                <button onClick={() => setIsAuthOpen(true)} className="text-gray-600 hover:text-indigo-600 transition-colors">Sign In</button>
              </nav>

              <Link to="/contact" className="hidden sm:flex text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-full hover:bg-indigo-100 transition-colors">Contact</Link>

              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none transition-all"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <div className={`md:hidden absolute w-full bg-white px-4 py-3 border-b border-gray-100 transition-all duration-200 transform ${isMobileSearchOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'}`}>
          <SearchBar onSelect={() => setIsMobileSearchOpen(false)} />
        </div>

        {/* Mobile Navigation Drawer */}
        <div className={`lg:hidden fixed inset-0 z-40 transition-all duration-300 pointer-events-none ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className={`absolute right-0 top-0 h-full w-full max-w-[300px] bg-white shadow-2xl transition-transform duration-300 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col h-full">
              <div className="p-6 flex justify-between items-center border-b border-gray-50">
                <span className="text-xl font-black tracking-tight text-gray-900">EuroTools</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-lg text-gray-400 hover:text-gray-600">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <Link to="/" className="flex items-center p-3 rounded-xl font-black text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition-all">Home</Link>
                <div className="space-y-2">
                  <button 
                    onClick={() => setIsToolsExpanded(!isToolsExpanded)}
                    className="w-full flex items-center justify-between p-3 rounded-xl font-black text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                  >
                    <span>Tools</span>
                    <svg className={`w-4 h-4 transform transition-transform ${isToolsExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                  </button>
                  {isToolsExpanded && (
                    <div className="pl-4 space-y-2 animate-fade-in">
                      {categories.map(cat => (
                        <div key={cat} className="mb-2">
                          <span className="text-[10px] font-black uppercase text-gray-400 block mb-1">{cat}</span>
                          <div className="grid grid-cols-1 gap-1">
                            {TOOLS.filter(t => t.category === cat).map(t => (
                              <Link key={t.id} to={t.path} className="block py-1 text-xs font-bold text-gray-600 hover:text-indigo-600">{t.name}</Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Link to="/blog" className="flex items-center p-3 rounded-xl font-black text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition-all">Blog</Link>
                <button onClick={() => {setIsMobileMenuOpen(false); setIsAuthOpen(true);}} className="w-full flex items-center p-3 rounded-xl font-black text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition-all">Sign In</button>
              </div>
              <div className="p-6 border-t border-gray-50">
                <Link to="/contact" className="block w-full text-center py-4 bg-indigo-600 text-white rounded-xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-100">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-slate-900 text-white mt-20">
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="text-2xl font-black tracking-tight">EuroTools<span className="text-indigo-500">.</span></Link>
          <p className="mt-4 text-slate-400 text-sm max-w-sm mx-auto md:mx-0 leading-relaxed">
            Leading the way in secure, browser-side file processing. EuroTools provides enterprise-grade utilities for free, respecting your privacy and time. 
          </p>
        </div>
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Resources</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/blog" className="text-slate-300 hover:text-white">Blog & Articles</Link></li>
            <li><Link to="/about" className="text-slate-300 hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="text-slate-300 hover:text-white">Contact Support</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Legal</h3>
          <ul className="space-y-3 text-sm">
            <li><Link to="/privacy" className="text-slate-300 hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-slate-300 hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-slate-500">&copy; 2024 EuroTools. Privacy First. No Signup Required.</p>
        <div className="flex space-x-6 text-xs text-slate-500">
           <span className="flex items-center"><span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span> Secure Hosted</span>
           <span>v5.0.0-ULTRA</span>
        </div>
      </div>
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="min-h-screen flex flex-col bg-slate-50">
    <Header />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);