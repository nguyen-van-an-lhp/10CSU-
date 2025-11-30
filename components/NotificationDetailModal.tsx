
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, Shield } from 'lucide-react';
import { Notification } from '../types';

interface Props {
  notification: Notification | null;
  onClose: () => void;
}

export const NotificationDetailModal: React.FC<Props> = ({ notification, onClose }) => {
  if (!notification) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-stone-900/80 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 30 }}
          className="relative bg-[#fffefc] w-full max-w-5xl h-[90vh] rounded-xl shadow-2xl overflow-hidden flex flex-col border border-stone-200"
        >
          {/* Paper Texture Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-40 pointer-events-none mix-blend-multiply"></div>
          
          {/* Decorative Header Bar */}
          <div className="h-2 bg-gradient-to-r from-red-900 via-amber-500 to-red-900 shrink-0 relative z-10"></div>

          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2 bg-stone-100/80 hover:bg-red-50 text-stone-500 hover:text-red-900 rounded-full transition shadow-sm border border-stone-200"
          >
            <X size={24} />
          </button>

          <div className="flex-grow overflow-y-auto relative z-10">
              <div className="max-w-3xl mx-auto px-8 py-12 md:py-16">
                  
                  {/* Header Content */}
                  <div className="text-center mb-12">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-red-900 rounded-full text-amber-50 mb-6 shadow-lg border-4 border-double border-amber-500/30">
                          <Shield size={32} />
                      </div>
                      
                      <div className="flex justify-center gap-3 mb-4">
                        <span className={`text-xs font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border ${notification.isPinned ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-stone-50 text-stone-600 border-stone-200'}`}>
                            {notification.category === 'general' ? 'Thông Báo Chung' : 
                             notification.category === 'discipline' ? 'Quy Định & Kỷ Luật' :
                             notification.category === 'academic' ? 'Học Vụ' : notification.category}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-5xl font-serif font-bold text-stone-900 leading-tight mb-6">
                        {notification.title}
                      </h2>
                      
                      <div className="flex items-center justify-center gap-6 text-sm text-stone-500 font-medium border-y border-stone-200 py-3 mx-auto max-w-lg">
                          <div className="flex items-center gap-2">
                             <Calendar size={16} className="text-red-800" />
                             {notification.date}
                          </div>
                          <div className="w-px h-4 bg-stone-300"></div>
                          <div className="flex items-center gap-2">
                             <User size={16} className="text-red-800" />
                             {notification.authorName}
                             <span className="text-xs bg-stone-100 px-1.5 py-0.5 rounded capitalize text-stone-400">{notification.authorRole}</span>
                          </div>
                      </div>
                  </div>

                  {/* Body Content */}
                  <div className="prose prose-lg prose-stone prose-headings:font-serif prose-headings:text-red-900 prose-p:text-stone-700 prose-li:text-stone-700 mx-auto font-serif">
                     <div dangerouslySetInnerHTML={{ __html: notification.fullContent || notification.content }} />
                  </div>

                  {/* Signature Area (Visual Flair) */}
                  <div className="mt-16 pt-8 border-t border-stone-200 flex justify-end">
                      <div className="text-center">
                          <p className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-4">Người Đăng</p>
                          <p className="font-serif font-bold text-xl text-stone-800 italic">{notification.authorName}</p>
                          <p className="text-xs text-stone-400 mt-1 capitalize">{notification.authorRole === 'admin' ? 'Giáo Viên Chủ Nhiệm' : notification.authorRole}</p>
                      </div>
                  </div>
              </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
