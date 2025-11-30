import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { AnimatePresence, motion } from 'framer-motion';

export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#fbfaf8] text-stone-800 relative">
      <Navigation />
      
      {/* Magical Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Grain Texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/noise.png')] mix-blend-multiply"></div>
        
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-multiply"></div>
        
        {/* Soft Ambient Orbs */}
        <div className="absolute -top-[10%] -left-[10%] w-[60%] h-[60%] bg-amber-200/20 rounded-full blur-[120px] mix-blend-multiply animate-pulse-slow"></div>
        <div className="absolute top-[30%] -right-[15%] w-[50%] h-[50%] bg-red-200/15 rounded-full blur-[100px] mix-blend-multiply"></div>
        <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] bg-stone-200/30 rounded-full blur-[80px] mix-blend-multiply"></div>
      </div>

      <main className="flex-grow z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} 
            className="min-h-[80vh]"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
};