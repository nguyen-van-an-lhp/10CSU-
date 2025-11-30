
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, User, ImageIcon } from 'lucide-react';
import { Activity } from '../types';

interface Props {
  activity: Activity | null;
  onClose: () => void;
}

export const ActivityDetailModal: React.FC<Props> = ({ activity, onClose }) => {
  if (!activity) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-stone-950/90 backdrop-blur-xl"
          onClick={onClose}
        />
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-white w-full md:w-[95vw] h-full md:h-[95vh] md:rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-50 p-2.5 bg-white/10 hover:bg-white/30 text-white rounded-full transition backdrop-blur-md border border-white/20 shadow-lg"
          >
            <X size={24} />
          </button>

          <div className="overflow-y-auto h-full bg-[#fbfaf8]">
             {/* Hero Section */}
             <div className="h-[50vh] md:h-[60vh] w-full relative shrink-0">
                <img src={activity.image} className="w-full h-full object-cover" alt={activity.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-4 mb-4 opacity-90 text-sm font-bold uppercase tracking-wider">
                            <span className="bg-red-700 px-3 py-1 rounded text-white shadow-sm">{activity.date}</span>
                            <span className="flex items-center gap-2"><User size={14} className="text-amber-400"/> {activity.authorName}</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight shadow-black drop-shadow-lg text-white mb-4">
                            {activity.title}
                        </h1>
                        <p className="text-lg md:text-xl text-stone-200 font-light max-w-3xl leading-relaxed">
                            {activity.summary}
                        </p>
                    </div>
                </div>
             </div>

             {/* Content Container */}
             <div className="max-w-5xl mx-auto px-6 md:px-16 py-12">
                
                {/* Article Body */}
                <div className="prose prose-xl prose-stone prose-headings:font-serif prose-headings:text-red-900 prose-p:text-stone-700 prose-img:rounded-xl prose-img:shadow-lg prose-a:text-red-700 max-w-none">
                     <div dangerouslySetInnerHTML={{ __html: activity.fullContent }} />
                </div>

                {/* Gallery Section */}
                {activity.gallery && activity.gallery.length > 0 && (
                    <div className="mt-16 pt-12 border-t border-stone-200">
                        <h3 className="flex items-center gap-3 text-2xl font-serif font-bold text-stone-800 mb-8">
                            <ImageIcon className="text-amber-600" /> Thư viện ảnh
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {activity.gallery.map((imgUrl, idx) => (
                                <motion.div 
                                    key={idx}
                                    whileHover={{ scale: 1.02 }}
                                    className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md group cursor-zoom-in"
                                >
                                    <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}
             </div>

             {/* Footer */}
             <div className="bg-stone-900 text-stone-400 py-12 text-center">
                <p className="font-serif italic text-lg mb-2">"Phong Sử Quán - Lưu giữ từng khoảnh khắc"</p>
                <div className="w-16 h-1 bg-red-900 mx-auto rounded-full"></div>
             </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
