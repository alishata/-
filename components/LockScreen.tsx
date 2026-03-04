'use client';

import React, { useState } from 'react';
import { Lock, ShieldAlert, Fuel } from 'lucide-react';
import { motion } from 'motion/react';

interface LockScreenProps {
  onUnlock: (password: string) => boolean;
}

export default function LockScreen({ onUnlock }: LockScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUnlock(password)) {
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900 overflow-hidden" dir="rtl">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500 rounded-full blur-[120px]"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl mx-4"
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-20 h-20 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-900/20 mb-6">
            <Fuel size={40} />
          </div>
          <h1 className="text-2xl font-display font-bold text-white mb-2">محطة الهواري</h1>
          <p className="text-slate-400 text-sm">النظام مغلق. يرجى إدخال الرقم السري للمتابعة.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
              <Lock size={20} />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="الرقم السري"
              className="w-full bg-white/5 border border-white/10 rounded-2xl pr-12 pl-4 py-4 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all text-center text-xl tracking-widest"
              autoFocus
            />
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-rose-400 text-sm justify-center"
            >
              <ShieldAlert size={16} />
              <span>الرقم السري غير صحيح. حاول مرة أخرى.</span>
            </motion.div>
          )}

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-900/20 transition-all active:scale-[0.98]"
          >
            فتح النظام
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-slate-500 text-xs">© 2026 محطة الهواري - جميع الحقوق محفوظة</p>
        </div>
      </motion.div>
    </div>
  );
}
