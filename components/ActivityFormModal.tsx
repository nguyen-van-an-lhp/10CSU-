
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Image as ImageIcon, Upload, Trash2, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { Activity } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Activity | null;
}

export const ActivityFormModal: React.FC<Props> = ({ isOpen, onClose, initialData }) => {
  const { user } = useAuth();
  const { addActivity, updateActivity } = useData();
  
  // Refs for hidden file inputs
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [fullContent, setFullContent] = useState('');
  const [image, setImage] = useState(''); // Cover image (URL or Base64)
  const [gallery, setGallery] = useState<string[]>([]); // Array of URLs or Base64
  const [date, setDate] = useState('');

  useEffect(() => {
    if (initialData) {
        setTitle(initialData.title);
        setSummary(initialData.summary);
        setFullContent(initialData.fullContent);
        setImage(initialData.image);
        setGallery(initialData.gallery || []);
        setDate(initialData.date);
    } else {
        // Reset for new entry
        setTitle('');
        setSummary('');
        setFullContent('');
        setImage('https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop');
        setGallery([]);
        setDate(new Date().toLocaleDateString('vi-VN'));
    }
  }, [initialData, isOpen]);

  // Convert File to Base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const base64 = await fileToBase64(e.target.files[0]);
        setImage(base64);
      } catch (err) {
        console.error("Error reading file", err);
      }
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      try {
        const files = Array.from(e.target.files);
        const promises = files.map(fileToBase64);
        const results = await Promise.all(promises);
        setGallery(prev => [...prev, ...results]);
      } catch (err) {
        console.error("Error reading files", err);
      }
    }
  };

  const removeGalleryImage = (index: number) => {
    setGallery(prev => prev.filter((_, i) => i !== index));
  };

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const activityData = {
        title,
        summary,
        fullContent,
        image,
        gallery,
        date,
        authorName: user.displayName,
        authorUsername: user.username
    };

    if (initialData) {
        updateActivity({ ...initialData, ...activityData }, user);
    } else {
        addActivity(activityData);
    }
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
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            <div className="bg-amber-600 px-6 py-4 flex justify-between items-center text-white shrink-0">
              <h3 className="font-serif font-bold text-lg">{initialData ? 'Cập nhật Hoạt Động' : 'Thêm Hoạt Động Mới'}</h3>
              <button onClick={onClose} className="hover:bg-amber-700 p-1 rounded transition"><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
              
              {/* --- Basic Info --- */}
              <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Tên hoạt động</label>
                    <input 
                      required
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500/20 outline-none font-bold text-gray-800"
                      placeholder="VD: Hội trại 26/3..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Ngày diễn ra</label>
                    <input 
                      required
                      value={date}
                      onChange={e => setDate(e.target.value)}
                      placeholder="DD/MM/YYYY"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500/20 outline-none"
                    />
                  </div>
              </div>

              {/* --- Cover Image Section --- */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Ảnh Bìa (Cover)</label>
                <div className="flex gap-4 items-start">
                    {/* Preview */}
                    <div className="w-32 h-20 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden shrink-0 relative group">
                        {image ? (
                             <img src={image} alt="Cover" className="w-full h-full object-cover" />
                        ) : (
                             <div className="w-full h-full flex items-center justify-center text-gray-400">
                                 <ImageIcon size={24} />
                             </div>
                        )}
                    </div>
                    
                    {/* Inputs */}
                    <div className="flex-grow space-y-2">
                        <div className="flex gap-2">
                            <input 
                                value={image}
                                onChange={e => setImage(e.target.value)}
                                className="flex-grow px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-amber-500"
                                placeholder="Dán link ảnh hoặc tải lên..."
                            />
                            <input 
                                type="file" 
                                ref={coverInputRef} 
                                onChange={handleCoverUpload} 
                                accept="image/*" 
                                className="hidden" 
                            />
                            <button 
                                type="button"
                                onClick={() => coverInputRef.current?.click()}
                                className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition flex items-center gap-2 text-sm font-bold whitespace-nowrap"
                            >
                                <Upload size={16} /> Tải ảnh
                            </button>
                        </div>
                        <p className="text-[10px] text-gray-400">Khuyến nghị kích thước 1200x600px. Hỗ trợ JPG, PNG.</p>
                    </div>
                </div>
              </div>
              
              {/* --- Gallery Section --- */}
              <div>
                <div className="flex justify-between items-center mb-2">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Thư viện ảnh ({gallery.length})</label>
                    <input 
                        type="file" 
                        ref={galleryInputRef} 
                        onChange={handleGalleryUpload} 
                        accept="image/*" 
                        multiple 
                        className="hidden" 
                    />
                    <button 
                        type="button"
                        onClick={() => galleryInputRef.current?.click()}
                        className="text-xs flex items-center gap-1 text-amber-700 font-bold hover:underline"
                    >
                        <Plus size={14} /> Thêm nhiều ảnh
                    </button>
                </div>
                
                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 min-h-[120px]">
                    {gallery.length > 0 ? (
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                            {gallery.map((url, idx) => (
                                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group shadow-sm border border-gray-200 bg-white">
                                    <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeGalleryImage(idx)}
                                        className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                            <button 
                                type="button"
                                onClick={() => galleryInputRef.current?.click()}
                                className="aspect-square rounded-lg border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 hover:border-amber-500 hover:text-amber-500 transition-colors bg-transparent"
                            >
                                <Plus size={24} />
                                <span className="text-[10px] font-bold mt-1">Thêm</span>
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full py-8 text-gray-400">
                            <ImageIcon size={32} className="mb-2 opacity-50" />
                            <p className="text-sm">Chưa có ảnh nào trong thư viện</p>
                            <button 
                                type="button"
                                onClick={() => galleryInputRef.current?.click()}
                                className="mt-2 text-amber-600 font-bold text-sm hover:underline"
                            >
                                Tải ảnh lên ngay
                            </button>
                        </div>
                    )}
                </div>
              </div>

              {/* --- Content Section --- */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Mô tả ngắn</label>
                <textarea 
                  required
                  value={summary}
                  onChange={e => setSummary(e.target.value)}
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500/20 outline-none resize-none text-sm"
                  placeholder="Hiển thị trên thẻ bên ngoài..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Nội dung chi tiết (HTML)</label>
                <textarea 
                  required
                  value={fullContent}
                  onChange={e => setFullContent(e.target.value)}
                  rows={6}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500/20 outline-none font-mono text-sm"
                  placeholder="<p>Nội dung bài viết...</p>"
                />
                <p className="text-[10px] text-gray-400 mt-1">Hỗ trợ các thẻ HTML cơ bản để định dạng bài viết.</p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <button 
                  type="submit"
                  className="flex items-center gap-2 bg-amber-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-amber-700 transition shadow-lg shadow-amber-600/20"
                >
                  <Save size={18} /> {initialData ? 'Lưu Thay Đổi' : 'Đăng Hoạt Động'}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
