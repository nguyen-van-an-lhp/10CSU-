
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Calendar, Flag } from 'lucide-react';
import { useData } from '../contexts/DataContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TimelineModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { addTimelineEvent } = useData();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'upcoming' | 'current' | 'completed'>('upcoming');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTimelineEvent({ title, date, description, status });
    setTitle('');
    setDate('');
    setDescription('');
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
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            <div className="bg-stone-800 px-6 py-4 flex justify-between items-center text-white">
              <h3 className="font-serif font-bold text-lg">Thêm Mốc Thời Gian</h3>
              <button onClick={onClose} className="hover:bg-stone-700 p-1 rounded transition"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Sự kiện</label>
                <div className="relative">
                    <Flag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500/20 outline-none"
                    placeholder="Tên sự kiện..."
                    />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Thời gian</label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500/20 outline-none"
                    placeholder="DD/MM/YYYY"
                    />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Trạng thái</label>
                <select 
                    value={status}
                    onChange={e => setStatus(e.target.value as any)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none bg-white"
                >
                    <option value="upcoming">Sắp diễn ra</option>
                    <option value="current">Đang diễn ra</option>
                    <option value="completed">Đã hoàn thành</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Mô tả chi tiết</label>
                <textarea 
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-stone-500/20 outline-none resize-none"
                  placeholder="Nội dung sự kiện..."
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button 
                  type="submit"
                  className="flex items-center gap-2 bg-stone-800 text-white px-6 py-2 rounded-lg font-bold hover:bg-stone-700 hover:shadow-lg transition transform hover:-translate-y-0.5"
                >
                  <Save size={16} /> Lưu Mốc Thời Gian
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
