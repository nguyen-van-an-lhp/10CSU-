
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { MagicCard } from '../components/MagicCard';
import { ActivityFormModal } from '../components/ActivityFormModal';
import { ActivityDetailModal } from '../components/ActivityDetailModal';
import { Calendar, PlusCircle, Edit, Trash2, User, Image as ImageIcon } from 'lucide-react';
import { Activity } from '../types';

export const Activities: React.FC = () => {
  const { activities, canManageActivities, deleteActivity } = useData();
  const { user } = useAuth();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [viewingActivity, setViewingActivity] = useState<Activity | null>(null);

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    if (window.confirm("Bạn có chắc chắn muốn xóa hoạt động này?")) {
       if (user) deleteActivity(id, user);
    }
  };

  const handleEdit = (e: React.MouseEvent, act: Activity) => {
    e.stopPropagation();
    setEditingActivity(act);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setEditingActivity(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-12 relative">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto py-12">
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-red-900 mb-6 drop-shadow-sm">Hoạt Động & Phong Trào</h1>
            <p className="text-stone-600 text-xl font-light leading-relaxed max-w-2xl mx-auto">
                Những dấu ấn thanh xuân rực rỡ của tập thể 10CSU dưới mái trường chuyên Lê Hồng Phong.
                Nơi lưu giữ kỷ niệm, khát vọng và niềm tự hào.
            </p>
            
            {user && canManageActivities(user) && (
                <button 
                    onClick={handleCreate}
                    className="mt-8 inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white px-8 py-3 rounded-full font-bold shadow-xl shadow-amber-600/30 transition transform hover:-translate-y-1"
                >
                    <PlusCircle size={20} /> Đăng Hoạt Động Mới
                </button>
            )}
        </div>

        {/* Masonry Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.map((act, idx) => (
                <MagicCard 
                    key={act.id} 
                    delay={idx * 0.1} 
                    onClick={() => setViewingActivity(act)}
                    className="flex flex-col h-full group cursor-pointer border-none shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden bg-white rounded-2xl"
                >
                    <div className="h-72 overflow-hidden relative">
                        <img 
                            src={act.image} 
                            alt={act.title} 
                            className="w-full h-full object-cover transition duration-1000 group-hover:scale-110 group-hover:rotate-1" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 transition-opacity"></div>
                        
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-stone-800 shadow-sm z-10">
                            <Calendar size={12} className="text-red-600" /> {act.date}
                        </div>

                        {act.gallery && act.gallery.length > 0 && (
                             <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-[10px] font-bold flex items-center gap-1">
                                <ImageIcon size={10} /> +{act.gallery.length} ảnh
                             </div>
                        )}
                        
                        {/* Admin Controls */}
                        {user && canManageActivities(user) && (
                            <div className="absolute top-4 right-4 flex gap-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={(e) => handleEdit(e, act)}
                                    className="p-2 bg-white/90 text-amber-600 rounded-full hover:bg-white hover:text-amber-700 shadow-md transition transform hover:scale-110"
                                >
                                    <Edit size={16} />
                                </button>
                                <button 
                                    onClick={(e) => handleDelete(e, act.id)}
                                    className="p-2 bg-white/90 text-red-600 rounded-full hover:bg-white hover:text-red-700 shadow-md transition transform hover:scale-110"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="p-8 flex-grow flex flex-col relative bg-white">
                        <h3 className="text-2xl font-bold font-serif text-stone-900 mb-4 group-hover:text-red-900 transition leading-tight">{act.title}</h3>
                        <p className="text-stone-600 mb-6 flex-grow text-sm line-clamp-3 leading-relaxed font-sans">{act.summary}</p>
                        
                        <div className="pt-6 border-t border-stone-100 flex justify-between items-center mt-auto">
                            <div className="flex items-center gap-2 text-xs text-stone-400 font-medium">
                                <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-stone-500">
                                    <User size={12} />
                                </div>
                                {act.authorName}
                            </div>
                            <span className="text-red-900 text-xs font-bold uppercase tracking-wider group-hover:underline decoration-2 underline-offset-4">Xem chi tiết</span>
                        </div>
                    </div>
                </MagicCard>
            ))}
        </div>
        
        <div className="text-center mt-16 pb-12">
            <p className="text-stone-400 italic text-sm font-serif">"Lịch sử không chỉ là những gì đã qua, mà là ngọn đuốc soi đường cho hiện tại."</p>
        </div>

        {/* Create/Edit Modal */}
        <ActivityFormModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
            initialData={editingActivity}
        />

        {/* New Full Screen Article Viewer */}
        <ActivityDetailModal 
            activity={viewingActivity}
            onClose={() => setViewingActivity(null)}
        />
    </div>
  );
};
