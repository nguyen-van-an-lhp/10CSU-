import React, { useState } from 'react';
import { STUDENTS } from '../constants';
import { AlertCircle, Search } from 'lucide-react';
import { MagicCard } from '../components/MagicCard';

export const Results: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = STUDENTS.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <h1 className="text-3xl font-serif font-bold text-red-900">Kết Quả Học Tập</h1>
            
            <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Tìm kiếm học sinh..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-stone-200 rounded-full focus:outline-none focus:ring-2 focus:ring-red-900/20"
                />
            </div>
        </div>

        <div className="flex items-center gap-4 bg-yellow-50 text-yellow-800 p-4 rounded-lg border border-yellow-200">
            <AlertCircle />
            <p>Dữ liệu điểm số Học kỳ I năm học 2024-2025 đang được cập nhật từ Phòng Đào Tạo.</p>
        </div>

        {/* Semester 1 Table Structure */}
        <MagicCard className="overflow-hidden border-none p-0">
            <div className="bg-stone-800 text-white px-6 py-4 flex justify-between items-center">
                <h2 className="font-bold text-lg">Bảng Điểm Tổng Kết HKI</h2>
                <span className="text-xs bg-stone-700 px-2 py-1 rounded border border-stone-600">2024 - 2025</span>
            </div>
             <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-stone-100 text-stone-500 font-bold uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">STT</th>
                            <th className="px-6 py-4">Họ Tên</th>
                            <th className="px-6 py-4 text-center">Điểm TB</th>
                            <th className="px-6 py-4 text-center">Xếp Hạng</th>
                            <th className="px-6 py-4 text-center">Hạnh Kiểm</th>
                            <th className="px-6 py-4">Danh Hiệu</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 bg-white">
                        {filteredStudents.length > 0 ? (
                            filteredStudents.map((st, idx) => (
                                <tr key={st.id} className="hover:bg-red-50/50 transition">
                                    <td className="px-6 py-4 text-stone-400 font-mono">{idx + 1}</td>
                                    <td className="px-6 py-4 font-bold text-stone-700">{st.name}</td>
                                    <td className="px-6 py-4 text-center text-stone-400">--</td>
                                    <td className="px-6 py-4 text-center text-stone-400">--</td>
                                    <td className="px-6 py-4 text-center text-stone-400">--</td>
                                    <td className="px-6 py-4 text-stone-400">--</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-8 text-center text-stone-400 italic">
                                    Không tìm thấy học sinh nào.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </MagicCard>
    </div>
  );
};