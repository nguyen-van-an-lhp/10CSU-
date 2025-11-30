
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { MagicCard } from '../components/MagicCard';
import { CreatePostModal } from '../components/CreatePostModal';
import { NotificationDetailModal } from '../components/NotificationDetailModal';
import { TimelineModal } from '../components/TimelineModal';
import { Calendar, BookOpen, AlertTriangle, Megaphone, Flag, Clock, PlusCircle, CheckCircle2, ListTodo, Trash2, ArrowRight, Edit3, MapPin } from 'lucide-react';
import { Notification } from '../types';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  const { notifications, exams, schedule, tasks, timelineEvents, canDelete, deleteNotification, canManageTimeline, deleteTimelineEvent } = useData();
  const { user } = useAuth();
  
  const [isPostModalOpen, setPostModalOpen] = useState(false);
  const [isTimelineModalOpen, setTimelineModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const [activeTab, setActiveTab] = useState<'schedule' | 'exam'>('schedule');

  // Filter logic
  const pinnedNotices = notifications.filter(n => n.isPinned || n.authorRole === 'admin');
  const academicNotices = notifications.filter(n => n.category === 'academic');
  const disciplineNotices = notifications.filter(n => n.category === 'discipline');
  const movementNotices = notifications.filter(n => n.category === 'movement');
  const generalNotices = notifications.filter(n => n.category === 'general' && !n.isPinned && n.authorRole !== 'admin');

  // Tasks Logic
  const academicTasks = tasks.filter(t => t.type === 'academic');
  const otherTasks = tasks.filter(t => t.type !== 'academic');

  // Helper for Section Headers
  const SectionHeader = ({ icon: Icon, title, color }: { icon: any, title: string, color: string }) => (
    <div className={`flex items-center gap-3 mb-6 pb-3 border-b border-${color}-200`}>
      <div className={`p-2.5 rounded-xl bg-${color}-100 text-${color}-800 shadow-sm`}>
        <Icon size={22} />
      </div>
      <h3 className={`text-2xl font-serif font-bold text-${color}-900 tracking-tight`}>{title}</h3>
    </div>
  );

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation(); 
    if (window.confirm("Bạn có chắc chắn muốn xóa thông báo này không?")) {
        if(user) deleteNotification(id, user);
    }
  };

  const NotificationCard = ({ note, color }: { note: Notification, color: string }) => (
    <MagicCard 
        onClick={() => setSelectedNotification(note)}
        className={`p-5 bg-white border-${color}-100 hover:border-${color}-300 hover:shadow-${color}-100/50 transition-all cursor-pointer relative group h-full flex flex-col`}
    >
        {user && canDelete(user, note) && (
            <button 
                onClick={(e) => handleDelete(e, note.id)}
                className="absolute top-3 right-3 p-1.5 bg-white rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 shadow-sm z-10 border border-red-100"
                title="Xóa bài viết"
            >
                <Trash2 size={14} />
            </button>
        )}
        <div className="flex items-center gap-2.5 mb-3">
            <span className={`text-[10px] font-bold bg-${color}-50 text-${color}-700 px-2.5 py-1 rounded-full uppercase tracking-wider border border-${color}-100`}>
                {note.authorName}
            </span>
            <span className="text-xs text-stone-400 font-medium">{note.date}</span>
        </div>
        <h4 className="font-bold text-stone-800 text-lg mb-2 leading-tight group-hover:text-red-900 transition-colors">{note.title}</h4>
        <p className="text-sm text-stone-600 line-clamp-3 leading-relaxed">{note.content}</p>
    </MagicCard>
  );

  return (
    <div className="space-y-12 pb-12">
      
      {/* 1. HERO & PINNED NOTICES */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Dashboard Panel */}
        <div className="lg:col-span-8 flex flex-col gap-6">
            <MagicCard className="bg-gradient-to-br from-red-950 via-red-900 to-red-800 text-white border-none p-8 md:p-10 flex flex-col justify-center relative overflow-hidden shadow-2xl shadow-red-900/20">
                <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse-slow"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold mb-3 leading-tight">
                    {user ? `Xin chào, ${user.displayName}` : 'Phong Sử Quán'}
                    </h1>
                    <p className="text-red-100/90 text-lg max-w-xl font-light leading-relaxed">
                    {user 
                        ? 'Chào mừng bạn quay trở lại. Hãy cùng điểm qua những thông tin quan trọng nhất trong ngày hôm nay.' 
                        : 'Kênh thông tin chính thức lớp 10CSU - THPT Chuyên Lê Hồng Phong.'}
                    </p>
                    
                    <div className="mt-8 flex gap-3">
                        {user && user.role !== 'guest' && (
                        <button 
                            onClick={() => setPostModalOpen(true)}
                            className="flex items-center gap-2 bg-white text-red-900 px-6 py-3 rounded-xl font-bold hover:bg-red-50 shadow-lg shadow-black/10 transition transform hover:-translate-y-0.5 border-2 border-transparent hover:border-white/50"
                        >
                            <PlusCircle size={20} /> Đăng Thông Báo
                        </button>
                        )}
                        <Link to="/intro" className="flex items-center gap-2 bg-red-800/50 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-800 border border-white/20 backdrop-blur-sm transition">
                             Tìm hiểu lớp <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </MagicCard>
            
            {/* Pinned Notices (Only visible if exists) */}
            {pinnedNotices.length > 0 && (
                <div className="space-y-4">
                     <div className="flex items-center gap-2 text-red-900 font-bold uppercase tracking-wider text-xs px-1">
                        <Megaphone size={14} /> Thông báo từ Giáo Viên Chủ Nhiệm
                     </div>
                     {pinnedNotices.map(note => (
                        <MagicCard 
                            key={note.id} 
                            onClick={() => setSelectedNotification(note)}
                            className="p-6 border-l-[6px] border-l-red-900 bg-white hover:bg-stone-50 cursor-pointer relative group transition-all"
                        >
                             {user && canDelete(user, note) && (
                                <button 
                                    onClick={(e) => handleDelete(e, note.id)}
                                    className="absolute top-4 right-4 p-2 bg-stone-100 rounded-full text-stone-500 hover:text-red-600 hover:bg-red-50 transition opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={16} />
                                </button>
                            )}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-red-900 flex items-center justify-center text-white font-serif font-bold text-lg border-2 border-amber-500">
                                        A
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-stone-900 leading-none mb-1">{note.title}</h4>
                                        <p className="text-xs text-red-700 font-medium uppercase tracking-wide">GVCN Nguyễn Văn An • {note.date}</p>
                                    </div>
                                </div>
                                {note.isPinned && <span className="bg-amber-100 text-amber-800 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest border border-amber-200">Quan Trọng</span>}
                            </div>
                            <p className="text-stone-600 pl-[52px] leading-relaxed line-clamp-2">{note.content}</p>
                        </MagicCard>
                     ))}
                </div>
            )}
        </div>

        {/* Sidebar: Timeline & Tasks */}
        <div className="lg:col-span-4 flex flex-col gap-8">
             {/* Timeline Widget */}
             <div className="bg-white rounded-2xl shadow-xl border border-stone-200/60 p-6 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-teal-600"></div>
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Clock className="text-emerald-600" size={20} />
                        <h3 className="text-lg font-bold text-stone-800">Dòng Sự Kiện</h3>
                    </div>
                    {user && canManageTimeline(user) && (
                        <button 
                            onClick={() => setTimelineModalOpen(true)}
                            className="p-1.5 text-stone-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                            title="Thêm sự kiện"
                        >
                            <PlusCircle size={18} />
                        </button>
                    )}
                 </div>
                 
                 <div className="space-y-6 relative">
                     {/* Vertical Line */}
                     <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-stone-200 rounded-full"></div>
                     
                     {timelineEvents.map((event, idx) => (
                         <div key={event.id} className="relative pl-10 group">
                            {/* Dot */}
                            <div className={`absolute left-[14px] top-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm transform -translate-x-1/2 z-10 
                                ${event.status === 'completed' ? 'bg-stone-400' : event.status === 'current' ? 'bg-emerald-500 ring-4 ring-emerald-100' : 'bg-amber-500'}`}>
                            </div>
                            
                            {/* Content */}
                            <div className="relative">
                                {user && canManageTimeline(user) && (
                                    <button 
                                        onClick={() => deleteTimelineEvent(event.id)}
                                        className="absolute -right-2 top-0 p-1 text-stone-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                )}
                                <p className="text-xs text-stone-400 font-bold mb-0.5 font-mono">{event.date}</p>
                                <h4 className={`text-sm font-bold leading-tight ${event.status === 'completed' ? 'text-stone-500 line-through' : 'text-stone-800'}`}>
                                    {event.title}
                                </h4>
                                <p className="text-xs text-stone-500 mt-1 leading-snug">{event.description}</p>
                            </div>
                         </div>
                     ))}
                 </div>
             </div>

             {/* Tasks Widget */}
             <div className="bg-stone-50 rounded-2xl border border-stone-200 p-6">
                <div className="flex items-center gap-3 mb-5">
                    <ListTodo className="text-stone-400" size={20} />
                    <h3 className="text-lg font-bold text-stone-800">Nhiệm Vụ Tháng 1</h3>
                </div>
                
                <div className="space-y-3">
                    {/* Academic Group */}
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-stone-100">
                        <h5 className="text-[10px] font-bold uppercase text-blue-600 mb-2 tracking-wider flex items-center gap-1">
                            <BookOpen size={10} /> Học Tập
                        </h5>
                        <ul className="space-y-2">
                             {academicTasks.map(task => (
                                <li key={task.id} className="flex items-start gap-2">
                                    <CheckCircle2 size={14} className={`shrink-0 mt-0.5 ${task.isCompleted ? 'text-blue-500' : 'text-stone-200'}`} />
                                    <span className={`text-xs font-medium ${task.isCompleted ? 'text-stone-400 line-through' : 'text-stone-700'}`}>
                                        {task.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Other Group */}
                    <div className="bg-white rounded-xl p-3 shadow-sm border border-stone-100">
                        <h5 className="text-[10px] font-bold uppercase text-amber-600 mb-2 tracking-wider flex items-center gap-1">
                            <Flag size={10} /> Hoạt Động
                        </h5>
                        <ul className="space-y-2">
                             {otherTasks.map(task => (
                                <li key={task.id} className="flex items-start gap-2">
                                    <CheckCircle2 size={14} className={`shrink-0 mt-0.5 ${task.isCompleted ? 'text-amber-500' : 'text-stone-200'}`} />
                                    <span className={`text-xs font-medium ${task.isCompleted ? 'text-stone-400 line-through' : 'text-stone-700'}`}>
                                        {task.title}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
             </div>
        </div>
      </section>

      {/* 2. THE COUNCIL (Role-Based Feeds) */}
      <section>
          <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-serif font-bold text-stone-900">Bảng Tin Lớp Học</h2>
              <div className="h-px bg-stone-200 flex-grow ml-6 hidden md:block"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
                <SectionHeader icon={BookOpen} title="Học Tập" color="blue" />
                {academicNotices.map(note => <NotificationCard key={note.id} note={note} color="blue" />)}
                {academicNotices.length === 0 && <div className="p-8 text-center bg-stone-50 rounded-xl border border-stone-100 text-stone-400 italic text-sm">Chưa có thông báo.</div>}
            </div>
            
            <div className="flex flex-col gap-4">
                <SectionHeader icon={AlertTriangle} title="Nề Nếp" color="orange" />
                {disciplineNotices.map(note => <NotificationCard key={note.id} note={note} color="orange" />)}
                 {disciplineNotices.length === 0 && <div className="p-8 text-center bg-stone-50 rounded-xl border border-stone-100 text-stone-400 italic text-sm">Chưa có thông báo.</div>}
            </div>

            <div className="flex flex-col gap-4">
                <SectionHeader icon={Flag} title="Phong Trào" color="emerald" />
                {[...movementNotices, ...generalNotices].map(note => <NotificationCard key={note.id} note={note} color="emerald" />)}
                 {[...movementNotices, ...generalNotices].length === 0 && <div className="p-8 text-center bg-stone-50 rounded-xl border border-stone-100 text-stone-400 italic text-sm">Chưa có thông báo.</div>}
            </div>
          </div>
      </section>

      {/* 3. SCHEDULE & EXAMS */}
      <section className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
         <div className="bg-stone-50 border-b border-stone-200 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
               <Calendar className="text-red-900" size={24} />
               <h2 className="text-xl font-serif font-bold text-stone-900">Lịch Trình Tuần 1</h2>
            </div>
            <div className="flex bg-white p-1 rounded-xl shadow-sm border border-stone-200">
               <button 
                 onClick={() => setActiveTab('schedule')}
                 className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'schedule' ? 'bg-red-900 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}
               >
                 Thời Khóa Biểu
               </button>
               <button 
                 onClick={() => setActiveTab('exam')}
                 className={`px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'exam' ? 'bg-red-900 text-white shadow-md' : 'text-stone-500 hover:bg-stone-50'}`}
               >
                 Lịch Thi
               </button>
            </div>
         </div>

         <div className="p-6 md:p-8">
            {activeTab === 'schedule' ? (
               <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left border-collapse">
                     <thead>
                        <tr>
                           <th className="p-3 text-center border border-stone-200 bg-stone-100 text-stone-600 font-bold w-16">Tiết</th>
                           {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'].map(d => <th key={d} className="p-3 text-center border border-stone-200 bg-stone-50 text-stone-700 font-bold">{d}</th>)}
                        </tr>
                     </thead>
                     <tbody>
                        {/* Morning */}
                        {[1, 2, 3, 4, 5].map((period) => (
                           <tr key={`m-${period}`}>
                              <td className="p-3 text-center font-bold text-stone-500 border border-stone-200 bg-stone-50/50">{period}</td>
                              {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'].map(day => {
                                 const item = schedule.find(s => s.day === day && s.period === period && s.session === 'Sáng');
                                 return (
                                     <td key={day} className="p-3 text-center border border-stone-200 hover:bg-amber-50 transition-colors">
                                         <span className={`font-semibold ${item?.subject ? 'text-red-900' : 'text-stone-200'}`}>
                                            {item?.subject || '-'}
                                         </span>
                                     </td>
                                 )
                              })}
                           </tr>
                        ))}
                         {/* Afternoon Separator */}
                         <tr><td colSpan={7} className="bg-stone-100 h-2"></td></tr>
                         {/* Afternoon */}
                         {[1, 2, 3, 4].map((period) => (
                           <tr key={`a-${period}`}>
                              <td className="p-3 text-center font-bold text-stone-500 border border-stone-200 bg-stone-50/50">{period}</td>
                              {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'].map(day => {
                                 const item = schedule.find(s => s.day === day && s.period === period && s.session === 'Chiều');
                                 return (
                                     <td key={day} className="p-3 text-center border border-stone-200 hover:bg-indigo-50 transition-colors">
                                         <span className={`font-semibold ${item?.subject ? 'text-indigo-900' : 'text-stone-200'}`}>
                                            {item?.subject || '-'}
                                         </span>
                                     </td>
                                 )
                              })}
                           </tr>
                        ))}
                     </tbody>
                  </table>
                  <div className="mt-4 text-center">
                      <Link to="/school" className="inline-flex items-center gap-2 text-red-900 font-bold hover:underline text-sm">
                          Xem chi tiết thời gian & phòng học <ArrowRight size={14}/>
                      </Link>
                  </div>
               </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-stone-50 text-stone-600 font-bold uppercase text-xs border-b border-stone-200">
                            <tr>
                                <th className="px-6 py-4">Môn Thi</th>
                                <th className="px-6 py-4 text-center">Ngày</th>
                                <th className="px-6 py-4 text-center">Giờ</th>
                                <th className="px-6 py-4 text-center">Thời lượng</th>
                                <th className="px-6 py-4 text-center">Hình thức</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-100">
                            {exams.map(exam => (
                                <tr key={exam.id} className="hover:bg-red-50/30 transition-colors">
                                    <td className="px-6 py-5 font-bold text-red-900 text-base">{exam.subject}</td>
                                    <td className="px-6 py-5 text-center font-mono font-medium text-stone-600">{exam.date}</td>
                                    <td className="px-6 py-5 text-center font-mono font-medium text-stone-600">{exam.time}</td>
                                    <td className="px-6 py-5 text-center text-stone-600">{exam.duration} phút</td>
                                    <td className="px-6 py-5 text-center">
                                        <span className={`text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide ${
                                            exam.type === 'Giữa Kỳ' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
                                        }`}>{exam.type}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
         </div>
      </section>

      {/* Modals */}
      <CreatePostModal isOpen={isPostModalOpen} onClose={() => setPostModalOpen(false)} />
      <TimelineModal isOpen={isTimelineModalOpen} onClose={() => setTimelineModalOpen(false)} />
      {selectedNotification && (
         <NotificationDetailModal 
            notification={selectedNotification} 
            onClose={() => setSelectedNotification(null)} 
         />
      )}
    </div>
  );
};
