import React from 'react';
import { TEACHER_PROFILE, STUDENTS } from '../constants';
import { GraduationCap, Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const ClassInfo: React.FC = () => {
  return (
    <div className="space-y-12">
        
        {/* Teacher Profile Card */}
        <section className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
                <div className="md:w-1/3 bg-primary-900 relative">
                    <img 
                        src={TEACHER_PROFILE.image} 
                        alt={TEACHER_PROFILE.name} 
                        className="w-full h-full object-cover opacity-80 mix-blend-overlay absolute inset-0"
                    />
                    <div className="relative z-10 p-8 flex flex-col h-full justify-end text-white bg-gradient-to-t from-black/80 to-transparent">
                        <h2 className="text-3xl font-serif font-bold mb-2">{TEACHER_PROFILE.name}</h2>
                        <p className="text-primary-200 font-medium">Giáo Viên Chủ Nhiệm</p>
                    </div>
                </div>
                <div className="md:w-2/3 p-8 md:p-12">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="flex items-center gap-2 text-primary-800 font-bold mb-4 border-b border-gray-200 pb-2">
                                <GraduationCap size={20} /> Trình độ chuyên môn
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                {TEACHER_PROFILE.degrees.map((deg, i) => (
                                    <li key={i} className="flex gap-2">
                                        <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 shrink-0"></span>
                                        {deg}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                             <h3 className="flex items-center gap-2 text-primary-800 font-bold mb-4 border-b border-gray-200 pb-2">
                                Liên hệ
                            </h3>
                            <ul className="space-y-4 text-gray-600">
                                <li className="flex items-center gap-3">
                                    <Phone size={18} className="text-primary-500" /> {TEACHER_PROFILE.phone}
                                </li>
                                <li className="flex items-center gap-3">
                                    <Mail size={18} className="text-primary-500" /> {TEACHER_PROFILE.email}
                                </li>
                                <li className="flex items-start gap-3">
                                    <MapPin size={18} className="text-primary-500 mt-1" /> {TEACHER_PROFILE.address}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Student List */}
        <section>
            <div className="flex items-center justify-between mb-6">
                 <h2 className="text-2xl font-serif font-bold text-primary-900">Danh Sách Học Sinh</h2>
                 <span className="bg-primary-100 text-primary-800 py-1 px-3 rounded-full text-sm font-bold">Sĩ số: {STUDENTS.length}</span>
            </div>
           
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wider border-b border-gray-200">
                                <th className="p-4 font-bold text-center w-16">STT</th>
                                <th className="p-4 font-bold">Họ và Tên</th>
                                <th className="p-4 font-bold text-center">Giới tính</th>
                                <th className="p-4 font-bold text-center">Ngày sinh</th>
                                <th className="p-4 font-bold">Nơi sinh</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {STUDENTS.map((student, index) => (
                                <motion.tr 
                                    key={student.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.02 }} // Stagger effect
                                    className="hover:bg-primary-50 transition-colors"
                                >
                                    <td className="p-4 text-center font-mono text-gray-400">{index + 1}</td>
                                    <td className="p-4 font-medium text-gray-800">{student.name}</td>
                                    <td className="p-4 text-center">
                                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${student.gender === 'Nam' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                                            {student.gender}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center text-gray-600">{student.dob}</td>
                                    <td className="p-4 text-gray-600">{student.pob}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
  );
};