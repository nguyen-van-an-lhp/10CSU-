import React, { useState } from 'react';
import { COMBINATIONS } from '../constants';
import { Compass, BookOpen, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export const Career: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Khối C");

  return (
    <div className="space-y-12">
        <section className="text-center max-w-3xl mx-auto mb-12">
             <div className="inline-flex items-center justify-center p-3 bg-indigo-100 text-indigo-700 rounded-full mb-4">
                <Compass size={32} />
             </div>
             <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">Định Hướng Học Tập & Xét Tuyển</h1>
             <p className="text-gray-600">
                Các tổ hợp môn xét tuyển đại học dành cho học sinh chuyên Lịch Sử và lộ trình chinh phục các kỳ thi lớn.
             </p>
        </section>

        {/* Tabs for Combinations */}
        <section className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-200 flex overflow-x-auto">
                {Object.keys(COMBINATIONS).map((block) => (
                    <button
                        key={block}
                        onClick={() => setActiveTab(block)}
                        className={`px-8 py-4 font-bold text-sm uppercase tracking-wide transition-all whitespace-nowrap ${
                            activeTab === block 
                            ? "bg-white text-primary-800 border-b-2 border-primary-800" 
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        {block}
                    </button>
                ))}
            </div>
            
            <div className="p-8">
                 <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                 >
                    {COMBINATIONS[activeTab].map((combo) => (
                        <div key={combo.code} className="border border-gray-100 rounded-xl p-6 hover:shadow-md transition bg-gradient-to-br from-white to-gray-50">
                            <div className="text-3xl font-black text-gray-200 mb-2">{combo.code}</div>
                            <h3 className="font-bold text-primary-900 text-lg mb-2">{combo.code}</h3>
                            <p className="text-gray-600 font-medium">{combo.subjects}</p>
                        </div>
                    ))}
                 </motion.div>
            </div>
        </section>

        {/* Competitions */}
        <section className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                <Trophy size={40} className="mb-4 opacity-80" />
                <h3 className="text-xl font-bold mb-2">Olympic 30/4</h3>
                <p className="text-amber-100 text-sm">Kỳ thi truyền thống dành cho các trường chuyên khu vực phía Nam.</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
                <Trophy size={40} className="mb-4 opacity-80" />
                <h3 className="text-xl font-bold mb-2">HSG Thành Phố</h3>
                <p className="text-blue-100 text-sm">Cơ hội khẳng định năng lực tại TP.HCM và bước đệm cho kỳ thi Quốc gia.</p>
            </div>
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
                <Trophy size={40} className="mb-4 opacity-80" />
                <h3 className="text-xl font-bold mb-2">HSG Quốc Gia</h3>
                <p className="text-rose-100 text-sm">Đỉnh cao tri thức phổ thông, cơ hội tuyển thẳng Đại học hàng đầu.</p>
            </div>
        </section>
    </div>
  );
};