'use client';

import React from 'react';
import { 
  Zap, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  ArrowRight,
  Filter,
  Download,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const pumps = [
  { id: '01', status: 'active', type: 'بنزين 85', currentSale: '4.52 د.ك', flow: '12.5 لتر/د', color: 'bg-emerald-500' },
  { id: '02', status: 'active', type: 'بنزين 92', currentSale: '1.28 د.ك', flow: '8.2 لتر/د', color: 'bg-blue-500' },
  { id: '03', status: 'idle', type: 'ديزل', currentSale: '0.00 د.ك', flow: '0.0 لتر/د', color: 'bg-amber-500' },
  { id: '04', status: 'active', type: 'بنزين 85', currentSale: '8.95 د.ك', flow: '15.0 لتر/د', color: 'bg-emerald-500' },
  { id: '05', status: 'maintenance', type: 'بنزين 92', currentSale: '---', flow: '---', color: 'bg-slate-400' },
  { id: '06', status: 'idle', type: 'ديزل', currentSale: '0.00 د.ك', flow: '0.0 لتر/د', color: 'bg-amber-500' },
];

export default function SalesView() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900">مراقبة المبيعات والمضخات</h2>
          <p className="text-slate-500 mt-1">متابعة حية لعمليات التعبئة وطرق الدفع</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Filter size={18} />
            تصفية
          </button>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100">
            <Download size={18} />
            تقرير الوردية
          </button>
        </div>
      </div>

      {/* Pump Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pumps.map((pump) => (
          <motion.div 
            key={pump.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white", pump.color)}>
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">مضخة {pump.id}</h4>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">{pump.type}</span>
                </div>
              </div>
              <div className={cn(
                "px-2 py-1 rounded-full text-[10px] font-bold uppercase",
                pump.status === 'active' ? "bg-emerald-100 text-emerald-700" : 
                pump.status === 'maintenance' ? "bg-rose-100 text-rose-700" : "bg-slate-100 text-slate-600"
              )}>
                {pump.status === 'active' ? 'نشط' : pump.status === 'maintenance' ? 'صيانة' : 'جاهز'}
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-slate-400 mb-1">العملية الحالية</p>
                  <h3 className="text-2xl font-display font-bold text-slate-900">{pump.currentSale}</h3>
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-400 mb-1">معدل التدفق</p>
                  <p className="text-sm font-semibold text-slate-700">{pump.flow}</p>
                </div>
              </div>
              
              {pump.status === 'active' && (
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div 
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/3 bg-emerald-500 rounded-full"
                  />
                </div>
              )}
            </div>

            <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
              <button className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1">
                عرض التفاصيل <ArrowRight size={14} />
              </button>
              {pump.status === 'maintenance' && (
                <span className="text-[10px] text-rose-500 font-medium italic">تنبيه: عطل في الحساس</span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment Methods Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-display font-bold text-lg text-slate-900 mb-6">ملخص طرق الدفع اليوم</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg text-emerald-600 shadow-sm">
                  <CreditCard size={20} />
                </div>
                <span className="text-sm font-bold text-emerald-900">بطاقة مدى/فيزا</span>
              </div>
              <h4 className="text-2xl font-display font-bold text-emerald-900">1,524 د.ك</h4>
              <p className="text-xs text-emerald-600 mt-1">245 عملية</p>
            </div>
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                  <Banknote size={20} />
                </div>
                <span className="text-sm font-bold text-blue-900">نقدي</span>
              </div>
              <h4 className="text-2xl font-display font-bold text-blue-900">685 د.ك</h4>
              <p className="text-xs text-blue-600 mt-1">120 عملية</p>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg text-amber-600 shadow-sm">
                  <Smartphone size={20} />
                </div>
                <span className="text-sm font-bold text-amber-900">تطبيقات ذكية</span>
              </div>
              <h4 className="text-2xl font-display font-bold text-amber-900">241 د.ك</h4>
              <p className="text-xs text-amber-600 mt-1">87 عملية</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-display font-bold text-lg text-slate-900 mb-6">حالة الوردية</h3>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-xs text-slate-400">الوردية الحالية</p>
                <p className="text-sm font-bold text-slate-900">الصباحية (08:00 - 16:00)</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">الوقت المنقضي</span>
                <span className="font-bold text-slate-900">65%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-emerald-500 rounded-full"></div>
              </div>
            </div>
            <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
              إغلاق الوردية
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
