import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, User as UserIcon, LogOut, ChevronDown, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const LINKS = [
  { to: "/", label: "Phong Sử Quán" },
  { to: "/intro", label: "Giới Thiệu" },
  { to: "/activities", label: "Hoạt Động" },
  { to: "/academics", label: "Học Tập" },
  { to: "/school", label: "Lịch Trình" },
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-sm border-b border-stone-200/60 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Brand */}
          <NavLink to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="w-10 h-10 bg-red-900 rounded-lg flex items-center justify-center text-amber-50 font-serif font-bold text-xl shadow-lg shadow-red-900/20 border border-amber-500/20 group-hover:scale-105 transition-transform">
              S
            </div>
            <div className="flex flex-col">
               <h1 className="font-serif font-bold text-stone-900 text-lg tracking-wide leading-none group-hover:text-red-900 transition-colors">PHONG SỬ QUÁN</h1>
               <p className="text-[10px] uppercase tracking-[0.25em] text-amber-700/80 font-bold mt-1">10CSU • 2025-2028</p>
            </div>
          </NavLink>
          
          {/* Desktop Links */}
          <div className="hidden xl:flex items-center space-x-1 bg-stone-100/50 p-1.5 rounded-xl border border-stone-200/50">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-red-900 bg-white shadow-sm"
                      : "text-stone-500 hover:text-stone-900 hover:bg-stone-200/50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* User & Mobile Toggle */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-3 pl-1 pr-3 py-1 rounded-full bg-white border border-stone-200 shadow-sm hover:shadow-md transition">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-800 to-red-900 flex items-center justify-center text-white text-xs font-bold">
                      {user.displayName.charAt(0)}
                  </div>
                  <div className="text-left hidden sm:block">
                      <div className="text-xs font-bold text-stone-800 leading-none mb-0.5">{user.displayName}</div>
                      <div className="text-[10px] text-stone-400 font-medium capitalize leading-none">{user.role}</div>
                  </div>
                  <ChevronDown size={14} className="text-stone-400" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-stone-100 overflow-hidden hidden group-hover:block animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-black/5">
                  <div className="px-4 py-3 bg-stone-50 border-b border-stone-100">
                     <p className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-1">Đang đăng nhập</p>
                     <p className="text-sm font-bold text-stone-800">{user.username}</p>
                  </div>
                  {user.role === 'admin' && (
                      <div className="px-4 py-2 bg-amber-50/50 border-b border-amber-100 flex items-center gap-2 text-amber-800 text-xs font-bold">
                          <Shield size={12} /> Quyền Quản Trị Viên
                      </div>
                  )}
                  <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-sm text-red-700 hover:bg-red-50 transition flex items-center gap-2 font-medium">
                    <LogOut size={16} /> Đăng xuất hệ thống
                  </button>
                </div>
              </div>
            ) : (
              <NavLink to="/login" className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-xl bg-stone-900 text-white text-sm font-bold hover:bg-red-900 hover:shadow-lg hover:shadow-red-900/20 transition-all transform hover:-translate-y-0.5">
                <UserIcon size={16} /> Đăng Nhập
              </NavLink>
            )}

            <div className="xl:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-stone-600 hover:bg-stone-100 transition focus:outline-none"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-t border-stone-100 overflow-hidden shadow-xl"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-4 rounded-xl text-base font-bold transition-colors ${
                      isActive
                        ? "bg-red-50 text-red-900"
                        : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {!user && (
                 <NavLink to="/login" onClick={() => setIsOpen(false)} className="block w-full text-center mt-6 px-4 py-4 rounded-xl bg-stone-900 text-white font-bold">
                    Đăng Nhập
                 </NavLink>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};