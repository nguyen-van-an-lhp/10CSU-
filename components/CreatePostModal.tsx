import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { PostCategory } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { addNotification, canPost } = useData();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<PostCategory>('general');

  // Determine available categories based on role
  const getAvailableCategories = (): PostCategory[] => {
    if (!user) return [];
    const allCats: PostCategory[] = ['general', 'academic', 'discipline', 'movement', 'fee'];
    return allCats.filter(cat => canPost(user, cat));
  };

  const categories = getAvailableCategories();

  // If user has no permissions or not logged in, shouldn't be here, but handle safely
  if (!user || categories.length === 0) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification({
      title,
      content,
      authorName: user.displayName,
      authorUsername: user.username,
      authorRole: user.role,
      category,
      isPinned: user.role === 'admin' // Only GVCN posts are auto-pinned
    });
    // Reset and close
    setTitle('');
    setContent('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            <div className="bg-red-900 px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-serif font-bold text-lg">Tạo Thông Báo Mới</h3>
              <button onClick={onClose} className="hover:bg-red-800 p-1 rounded transition"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tiêu đề</label>
                <input 
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900/20 focus:border-red-900 outline-none transition"
                  placeholder="Nhập tiêu đề ngắn gọn..."
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Danh mục</label>
                <select 
                  value={category}
                  onChange={e => setCategory(e.target.value as PostCategory)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900/20 outline-none bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="capitalize">
                      {cat === 'general' ? 'Chung' : 
                       cat === 'academic' ? 'Học Tập' : 
                       cat === 'discipline' ? 'Kỷ Luật/Nề Nếp' : 
                       cat === 'movement' ? 'Phong Trào' : 'Tài Chính'}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Nội dung</label>
                <textarea 
                  required
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-900/20 focus:border-red-900 outline-none transition resize-none"
                  placeholder="Nội dung chi tiết..."
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button 
                  type="submit"
                  className="flex items-center gap-2 bg-red-900 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-800 hover:shadow-lg transition transform hover:-translate-y-0.5"
                >
                  <Send size={16} /> Đăng Bài
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};