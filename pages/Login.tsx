import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion } from 'framer-motion';
import { Key, Lock, User } from 'lucide-react';

export const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      navigate('/');
    } else {
      setError('Thông tin đăng nhập không chính xác. Vui lòng thử lại.');
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-8 relative overflow-hidden">
            {/* Decorative Top */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-800 via-amber-500 to-red-800"></div>

            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-red-900 rounded-full flex items-center justify-center text-amber-50 mx-auto mb-4 shadow-lg">
                    <Key size={24} />
                </div>
                <h2 className="text-2xl font-serif font-bold text-stone-800">Cổng Đăng Nhập</h2>
                <p className="text-stone-500 text-sm mt-1">Dành cho Giáo viên và Ban Cán Sự Lớp</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Tên đăng nhập</label>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        <input 
                            type="text" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-red-900/20 focus:border-red-900 outline-none transition-all"
                            placeholder="Nhập username..."
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Mật khẩu</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-red-900/20 focus:border-red-900 outline-none transition-all"
                            placeholder="Nhập mật khẩu..."
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                        {error}
                    </div>
                )}

                <button 
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-red-900 to-red-800 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-red-900/30 transition-all transform hover:-translate-y-0.5"
                >
                    Truy Cập Hệ Thống
                </button>
            </form>
            
            <div className="mt-6 text-center text-xs text-stone-400">
                Phát triển bởi 10CSU Tech Team
            </div>
        </div>
      </motion.div>
    </div>
  );
};
