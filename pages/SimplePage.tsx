import React from 'react';
import { Book, Coins, Scale } from 'lucide-react';

interface Props {
  title: string;
  type: 'rule' | 'finance' | 'academy';
}

export const SimplePage: React.FC<Props> = ({ title, type }) => {
  const getIcon = () => {
    switch(type) {
        case 'rule': return <Scale size={48} className="text-primary-500 mb-4" />;
        case 'finance': return <Coins size={48} className="text-amber-500 mb-4" />;
        case 'academy': return <Book size={48} className="text-blue-500 mb-4" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 bg-white rounded-2xl shadow-lg border border-gray-100">
        {getIcon()}
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">{title}</h1>
        <div className="max-w-md w-full h-1 bg-gray-100 rounded-full mb-8 overflow-hidden">
            <div className="w-1/3 h-full bg-gray-300 animate-pulse"></div>
        </div>
        <p className="text-gray-500 text-lg">Nội dung đang được cập nhật từ phía nhà trường.</p>
        <p className="text-gray-400 text-sm mt-2">Vui lòng quay lại sau.</p>
    </div>
  );
};