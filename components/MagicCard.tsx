import React from 'react';
import { motion } from 'framer-motion';

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  onClick?: () => void;
}

export const MagicCard: React.FC<MagicCardProps> = ({ children, className = "", delay = 0, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      whileHover={{ 
        y: -6, 
        boxShadow: "0 25px 50px -12px rgba(136, 19, 55, 0.15)", // Deep red shadow
      }}
      onClick={onClick}
      className={`
        relative overflow-hidden bg-white/70 backdrop-blur-xl 
        border border-white/50 rounded-2xl shadow-lg 
        transition-all duration-300
        group cursor-pointer ring-1 ring-stone-900/5
        ${className}
      `}
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none transform -translate-x-full group-hover:translate-x-full ease-in-out" style={{ transitionDuration: '1s' }} />
      
      {/* Gradient Border Glow */}
      <div className="absolute inset-0 rounded-2xl border border-amber-500/0 group-hover:border-amber-500/20 transition-colors duration-300 pointer-events-none"></div>

      {children}
    </motion.div>
  );
};