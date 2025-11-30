import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { Edit2, Save, Calendar, Clock, Lock, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScheduleItem } from '../types';

export const SchoolInfo: React.FC = () => {
    const { schedule, updateSchedule, canManageSchedule, exams } = useData();
    const { user } = useAuth();
    const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
    const [tempSubject, setTempSubject] = useState('');

    const days = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'] as const;
    const sessions = [
        { name: 'Sáng', periods: [1, 2, 3, 4, 5] },
        { name: 'Chiều', periods: [1, 2, 3, 4] }
    ] as const;

    const getScheduleItem = (day: string, period: number, session: 'Sáng' | 'Chiều') => {
        return schedule.find(s => s.day === day && s.period === period && s.session === session);
    };

    const handleCellClick = (item?: ScheduleItem, day?: string, period?: number, session?: 'Sáng' | 'Chiều') => {
        if (!user || !canManageSchedule(user)) return;
        
        if (item) {
            setEditingItem(item);
            setTempSubject(item.subject);
        } else if (day && period && session) {
            setEditingItem({
                id: `${session === 'Sáng' ? 's' : 'c'}${days.indexOf(day as any) + 2}${period}`,
                day: day as any,
                session,
                period,
                time: '', 
                subject: ''
            });
            setTempSubject('');
        }
    };

    const handleSave = () => {
        if (editingItem) {
            updateSchedule({ ...editingItem, subject: tempSubject });
            setEditingItem(null);
        }
    };

  return (
    <div className="space-y-16 pb-12">
        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-red-900 text-white p-8 md:p-12 shadow-2xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3">Thời Khóa Biểu</h1>
                    <p className="text-red-200 text-lg font-light">Kế hoạch giảng dạy & học tập Năm học 2025-2026</p>
                </div>
                {user && canManageSchedule(user) ? (
                    <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-bold border border-white/30 shadow-lg">
                        <Edit2 size={16} /> Chế độ Quản Trị Viên
                    </div>
                ) : (
                    <div className="flex items-center gap-2 text-red-200 bg-red-950/30 px-4 py-2 rounded-full text-xs font-medium">
                        <Lock size={12} /> Chỉ đọc (GVCN quản lý)
                    </div>
                )}
            </div>
        </div>

        {/* Schedule Grid */}
        <section>
            <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-xl bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm min-w-[1000px] border-collapse">
                        <thead>
                            <tr className="bg-stone-50 border-b border-stone-200">
                                <th className="py-5 px-4 text-center w-24 border-r border-stone-200 font-serif font-bold text-stone-600 text-base">Buổi</th>
                                <th className="py-5 px-4 text-center w-20 border-r border-stone-200 font-serif font-bold text-stone-600 text-base">Tiết</th>
                                {days.map(day => (
                                    <th key={day} className="py-5 px-4 text-center font-serif font-bold text-red-900 text-lg border-l border-stone-200 bg-red-50/10">
                                        {day}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {sessions.map((session, sIdx) => (
                                <React.Fragment key={session.name}>
                                    {session.periods.map((period, pIdx) => (
                                        <tr key={`${session.name}-${period}`} className="group hover:bg-amber-50/20 transition-colors">
                                            {/* Session Column (RowSpan) */}
                                            {pIdx === 0 && (
                                                <td 
                                                    rowSpan={session.periods.length} 
                                                    className={`py-4 px-4 font-bold text-xl writing-vertical-lr text-stone-400 border-r border-stone-200 text-center bg-stone-50/50 ${sIdx === 0 ? 'border-b border-stone-200' : ''}`}
                                                >
                                                    {session.name}
                                                </td>
                                            )}
                                            
                                            {/* Period Column */}
                                            <td className="py-4 px-4 font-bold text-stone-400 border-r border-stone-200 text-center bg-white group-hover:bg-amber-50/20 transition-colors">{period}</td>
                                            
                                            {/* Days Columns */}
                                            {days.map(day => {
                                                const item = getScheduleItem(day, period, session.name);
                                                const isEditable = user && canManageSchedule(user);
                                                return (
                                                    <td 
                                                        key={`${day}-${period}`} 
                                                        onClick={() => handleCellClick(item, day, period, session.name)}
                                                        className={`py-3 px-2 text-center border-l border-stone-100 transition-all relative h-20 align-middle ${
                                                            isEditable ? 'cursor-pointer hover:bg-amber-100/50 hover:shadow-inner' : ''
                                                        }`}
                                                    >
                                                        <div className={`font-semibold text-base transition-transform duration-200 ${item?.subject ? 'text-stone-800 scale-100' : 'text-stone-200 scale-90'}`}>
                                                            {item ? item.subject : "—"}
                                                        </div>
                                                        {isEditable && (
                                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                                                                <Edit2 size={14} className="text-amber-600 bg-amber-100 p-1 rounded" />
                                                            </div>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                    {sIdx === 0 && (
                                        <tr className="bg-stone-100 h-2 border-y border-stone-200">
                                            <td colSpan={days.length + 2}></td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>

        {/* Exam Schedule */}
        <section className="pt-8">
             <div className="flex items-center gap-4 mb-8 border-b border-stone-200 pb-4">
                <div className="p-3 bg-red-100 rounded-2xl text-red-900 shadow-sm">
                    <GraduationCap size={32} />
                </div>
                <div>
                    <h2 className="text-3xl font-serif font-bold text-stone-900">Lịch Thi Tập Trung</h2>
                    <p className="text-stone-500 font-medium">Kế hoạch kiểm tra đánh giá định kỳ</p>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {exams.map((exam, idx) => (
                    <motion.div 
                        key={exam.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-2xl border border-stone-100 shadow-lg p-6 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1"
                    >
                        {/* Decorative Top Bar */}
                        <div className={`absolute top-0 left-0 w-full h-1.5 ${exam.type === 'Giữa Kỳ' ? 'bg-amber-400' : 'bg-red-600'}`}></div>
                        
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 ${
                            exam.type === 'Giữa Kỳ' ? 'bg-amber-50 text-amber-700 border border-amber-100' : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                            {exam.type}
                        </span>

                        <h3 className="text-xl font-bold text-stone-800 mb-1">{exam.subject}</h3>
                        
                        <div className="my-4 py-4 border-y border-stone-100 w-full">
                            <div className="text-4xl font-serif font-bold text-stone-900 leading-none">{exam.date.split('/')[0]}</div>
                            <div className="text-xs text-stone-400 font-bold uppercase mt-1">Tháng {exam.date.split('/')[1]}</div>
                        </div>

                        <div className="flex items-center gap-4 text-xs font-medium text-stone-500 w-full justify-center">
                            <div className="flex items-center gap-1.5 bg-stone-50 px-2 py-1 rounded">
                                <Clock size={12} /> {exam.time}
                            </div>
                            <div className="flex items-center gap-1.5 bg-stone-50 px-2 py-1 rounded">
                                {exam.duration}'
                            </div>
                        </div>
                    </motion.div>
                ))}
             </div>
        </section>

        {/* Modal */}
        <AnimatePresence>
            {editingItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
                        onClick={() => setEditingItem(null)}
                    />
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                        className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm z-10 border border-stone-100"
                    >
                        <h3 className="font-serif font-bold text-xl text-stone-900 mb-6 border-b border-stone-100 pb-4">Cập nhật môn học</h3>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Thông tin tiết học</label>
                                <div className="flex gap-2 text-sm font-medium text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-100">
                                    <Calendar size={16} className="text-red-800" />
                                    <span>{editingItem.day}, {editingItem.session}</span>
                                    <span className="text-stone-300">|</span>
                                    <span>Tiết {editingItem.period}</span>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">Tên môn học</label>
                                <input 
                                    autoFocus
                                    value={tempSubject}
                                    onChange={(e) => setTempSubject(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-red-900/10 focus:border-red-900 outline-none text-stone-900 font-bold text-lg shadow-sm"
                                    placeholder="Nhập tên môn..."
                                />
                            </div>
                        </div>
                        
                        <div className="flex gap-3 justify-end mt-8">
                            <button onClick={() => setEditingItem(null)} className="px-5 py-2.5 text-stone-500 font-bold hover:bg-stone-50 rounded-xl transition">Hủy bỏ</button>
                            <button onClick={handleSave} className="px-6 py-2.5 bg-red-900 text-white font-bold rounded-xl hover:bg-red-800 flex items-center gap-2 shadow-lg shadow-red-900/20 transition transform hover:-translate-y-0.5">
                                <Save size={18} /> Lưu lại
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
  );
};