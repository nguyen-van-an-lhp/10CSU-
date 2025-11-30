import React from 'react';
import { TEACHER_PROFILE, STUDENTS } from '../constants';
import { MagicCard } from '../components/MagicCard';
import { Mail, MapPin, Phone, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export const Introduction: React.FC = () => {
  // Filter officers
  const officers = STUDENTS.filter(s => s.role);
  const members = STUDENTS.filter(s => !s.role);

  return (
    <div className="space-y-16">
        
        {/* Teacher Section */}
        <section className="relative">
            <div className="absolute top-1/2 left-0 w-full h-px bg-stone-200 -z-10"></div>
            <h2 className="text-center text-3xl font-serif font-bold bg-[#fdfbf7] px-6 mx-auto w-fit text-red-900 mb-10">
                Giáo Viên Chủ Nhiệm
            </h2>
            
            <MagicCard className="max-w-4xl mx-auto overflow-hidden border-amber-200/50">
                <div className="md:flex">
                    <div className="md:w-2/5 relative h-80 md:h-auto">
                        <img src={TEACHER_PROFILE.image} alt={TEACHER_PROFILE.name} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-r from-red-900/40 to-transparent mix-blend-multiply"></div>
                    </div>
                    <div className="md:w-3/5 p-8 md:p-12 bg-white">
                        <h3 className="text-3xl font-serif font-bold text-stone-800 mb-2">{TEACHER_PROFILE.name}</h3>
                        <p className="text-red-700 font-medium italic mb-6">Thạc sĩ Lịch Sử Việt Nam</p>
                        
                        <div className="space-y-4 text-stone-600">
                            <div className="flex items-start gap-3">
                                <Award className="shrink-0 text-amber-600" size={20} />
                                <div>
                                    <p className="font-bold text-stone-800">Trình độ chuyên môn</p>
                                    <ul className="text-sm list-disc list-inside mt-1 space-y-1">
                                        {TEACHER_PROFILE.degrees.map((deg, i) => <li key={i}>{deg}</li>)}
                                    </ul>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="shrink-0 text-amber-600" size={20} />
                                <span>{TEACHER_PROFILE.email}</span>
                            </div>
                             <div className="flex items-center gap-3">
                                <Phone className="shrink-0 text-amber-600" size={20} />
                                <span>{TEACHER_PROFILE.phone}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </MagicCard>
        </section>

        {/* Officers */}
        <section>
            <h2 className="text-center text-3xl font-serif font-bold text-red-900 mb-10">
                Ban Cán Sự Lớp
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {officers.map((student, idx) => (
                    <MagicCard key={student.id} delay={idx * 0.1} className="p-6 text-center border-t-4 border-t-amber-500">
                        <div className="w-20 h-20 mx-auto bg-stone-100 rounded-full mb-4 flex items-center justify-center text-2xl font-serif font-bold text-stone-400">
                            {student.name.charAt(0)}
                        </div>
                        <h3 className="font-bold text-lg text-stone-800">{student.name}</h3>
                        <p className="text-red-600 font-bold text-sm uppercase mt-1 tracking-wide">{student.role}</p>
                    </MagicCard>
                ))}
            </div>
        </section>

        {/* Members Grid */}
        <section>
             <h2 className="text-center text-3xl font-serif font-bold text-red-900 mb-10">
                Danh Sách Thành Viên
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                 {members.map((student, idx) => (
                    <motion.div 
                        key={student.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.02 }}
                        className="bg-white p-4 rounded-lg shadow-sm border border-stone-100 hover:border-amber-300 hover:shadow-md transition text-center"
                    >
                        <div className="text-sm font-bold text-stone-700">{student.name}</div>
                        <div className="text-xs text-stone-400 mt-1">{student.dob}</div>
                    </motion.div>
                ))}
            </div>
        </section>

    </div>
  );
};
