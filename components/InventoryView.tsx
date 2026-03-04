'use client';

import React from 'react';
import { 
  Fuel, 
  Droplets, 
  AlertCircle, 
  ArrowDown, 
  History,
  Plus,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function InventoryView({ inventory, setInventory }: any) {
  const [showToast, setShowToast] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTank, setSelectedTank] = useState('بنزين 85');
  const [addAmount, setAddAmount] = useState('');

  const handleOrderFuel = () => {
    setShowAddModal(true);
  };

  const handleConfirmAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(addAmount);
    if (isNaN(amount) || amount <= 0) return;

    setInventory((prev: any) => prev.map((tank: any) => {
      if (tank.name === selectedTank) {
        const newCurrent = Math.min(tank.capacity, tank.current + amount);
        return { ...tank, current: newCurrent };
      }
      return tank;
    }));

    setShowAddModal(false);
    setAddAmount('');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold"
          >
            <CheckCircle2 size={20} />
            <span>تم تزويد الخزان بالكمية الجديدة بنجاح!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Fuel Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                  <Plus size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900">إضافة كمية وقود</h3>
              </div>

              <form onSubmit={handleConfirmAdd} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">اختر الخزان</label>
                  <select 
                    value={selectedTank}
                    onChange={(e) => setSelectedTank(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  >
                    {inventory.map((t: any) => <option key={t.name} value={t.name}>{t.name}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">الكمية الجديدة (لتر)</label>
                  <input 
                    type="number"
                    required
                    value={addAmount}
                    onChange={(e) => setAddAmount(e.target.value)}
                    placeholder="أدخل الكمية باللتر..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
                  >
                    تأكيد الإضافة
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-slate-100 text-slate-600 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900">إدارة الخزانات والمخزون</h2>
          <p className="text-slate-500 mt-1">مراقبة حية لمستويات الوقود وحالة الخزانات</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <RefreshCw size={18} />
            تحديث البيانات
          </button>
          <button 
            onClick={handleOrderFuel}
            className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
          >
            <Plus size={18} />
            إضافة وقود جديد
          </button>
        </div>
      </div>

      {/* Tank Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {inventory.map((tank: any, idx: number) => {
          const percentage = Math.round((tank.current / tank.capacity) * 100);
          const isLow = percentage < 25;

          return (
            <motion.div 
              key={tank.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white" style={{ backgroundColor: tank.color }}>
                    <Fuel size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{tank.name}</h4>
                    <p className="text-xs text-slate-500">خزان رقم 0{idx + 1}</p>
                  </div>
                </div>
                {isLow && (
                  <div className="bg-rose-50 text-rose-600 p-2 rounded-lg animate-pulse">
                    <AlertCircle size={20} />
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col items-center justify-center flex-1 relative">
                {/* Visual Tank Representation */}
                <div className="w-32 h-48 border-4 border-slate-100 rounded-3xl relative overflow-hidden bg-slate-50">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${percentage}%` }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 right-0 opacity-80"
                    style={{ backgroundColor: tank.color }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-4 bg-white/20 animate-wave"></div>
                  </motion.div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-display font-black text-slate-800 z-10">{percentage}%</span>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-slate-400 text-sm mb-1">المخزون الحالي</p>
                  <h3 className="text-3xl font-display font-bold text-slate-900">{tank.current.toLocaleString()} <span className="text-sm font-normal text-slate-500">لتر</span></h3>
                  <p className="text-xs text-slate-400 mt-2">السعة الإجمالية: {tank.capacity.toLocaleString()} لتر</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">آخر تزويد</p>
                  <p className="text-xs font-semibold text-slate-700">منذ يومين</p>
                </div>
                <div className="text-center border-r border-slate-200">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">معدل الاستهلاك</p>
                  <p className="text-xs font-semibold text-emerald-600">طبيعي</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Consumption History */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <History className="text-emerald-600" size={24} />
            <h3 className="font-display font-bold text-lg text-slate-900">تاريخ الاستهلاك الأسبوعي</h3>
          </div>
          <div className="flex gap-2">
            {['بنزين 85', 'بنزين 92', 'ديزل'].map((type) => (
              <button key={type} className="px-3 py-1 text-xs font-medium rounded-lg border border-slate-200 hover:bg-slate-50">
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[
              { day: 'الأحد', val: 4500 },
              { day: 'الاثنين', val: 5200 },
              { day: 'الثلاثاء', val: 3800 },
              { day: 'الأربعاء', val: 6100 },
              { day: 'الخميس', val: 7500 },
              { day: 'الجمعة', val: 8200 },
              { day: 'السبت', val: 5900 },
            ]}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="val" radius={[6, 6, 0, 0]}>
                {[0,1,2,3,4,5,6].map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 5 ? '#10b981' : '#e2e8f0'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
