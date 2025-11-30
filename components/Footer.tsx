import React, { useState, useRef, useEffect } from 'react';
import { Music, VolumeX, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Contact Info */}
        <div>
          <h3 className="font-serif text-white text-lg font-bold mb-4">Liên Hệ</h3>
          <ul className="space-y-3 text-sm">
             <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                <span>Trường THPT Chuyên Lê Hồng Phong, TP.HCM</span>
             </li>
             <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <span>0326830265 (Thầy An)</span>
             </li>
             <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                <a href="mailto:nguyenbinhan431@gmail.com" className="hover:text-primary-400 transition">nguyenbinhan431@gmail.com</a>
             </li>
          </ul>
        </div>

        {/* Music Player & Credits */}
        <div className="text-center md:text-left">
          <h3 className="font-serif text-white text-lg font-bold mb-4">Trải Nghiệm</h3>
           <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <button 
                onClick={toggleMusic}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${isPlaying ? 'bg-primary-600 text-white shadow-[0_0_15px_rgba(225,29,72,0.5)]' : 'bg-slate-800 hover:bg-slate-700'}`}
              >
                {isPlaying ? <Music size={16} className="animate-pulse" /> : <VolumeX size={16} />}
                {isPlaying ? "Đang phát nhạc" : "Bật nhạc nền"}
              </button>
              <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" /> 
              {/* Note: Using a reliable placeholder MP3 as original local file won't exist in this environment */}
           </div>
           <p className="text-xs text-slate-500">
             Thiết kế và phát triển bởi Nguyễn Văn An. <br/>
             © 2025 Kênh Thông Tin Điện Tử Lớp 10CSU.
           </p>
        </div>

        {/* Quote / Additional */}
        <div className="text-right hidden md:block opacity-60">
           <p className="italic font-serif">"Dân ta phải biết sử ta,<br/>Cho tường gốc tích nước nhà Việt Nam."</p>
           <p className="mt-2 text-xs">— Hồ Chí Minh</p>
        </div>
      </div>
    </footer>
  );
};