'use client';

import { useState } from 'react';
import { 
  Zap, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  ArrowRight,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  PlusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

const pumps = [
  { id: '01', status: 'active', type: 'بنزين 85', currentSale: '4.52 جنيه مصري', flow: '12.5 لتر/د', color: 'bg-emerald-500' },
  { id: '02', status: 'active', type: 'بنزين 92', currentSale: '1.28 جنيه مصري', flow: '8.2 لتر/د', color: 'bg-blue-500' },
  { id: '03', status: 'idle', type: 'ديزل', currentSale: '0.00 جنيه مصري', flow: '0.0 لتر/د', color: 'bg-amber-500' },
  { id: '04', status: 'active', type: 'بنزين 85', currentSale: '8.95 جنيه مصري', flow: '15.0 لتر/د', color: 'bg-emerald-500' },
  { id: '05', status: 'maintenance', type: 'بنزين 92', currentSale: '---', flow: '---', color: 'bg-slate-400' },
  { id: '06', status: 'idle', type: 'ديزل', currentSale: '0.00 جنيه مصري', flow: '0.0 لتر/د', color: 'bg-amber-500' },
];

export default function SalesView({ inventory, setInventory, stats, setStats }: any) {
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [salesAmount, setSalesAmount] = useState('');
  const [salesQty, setSalesQty] = useState('');
  const [salesFuelType, setSalesFuelType] = useState('بنزين 85');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRecordSales = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(salesAmount);
    const qty = parseFloat(salesQty);
    
    if (isNaN(amount) || isNaN(qty)) return;

    // Deduct from inventory
    setInventory((prev: any) => prev.map((tank: any) => {
      if (tank.name === salesFuelType) {
        return { ...tank, current: Math.max(0, tank.current - qty) };
      }
      return tank;
    }));

    // Add to stats
    setStats((prev: any) => ({
      totalRevenue: prev.totalRevenue + amount,
      totalFuelSold: prev.totalFuelSold + qty,
      totalTransactions: prev.totalTransactions + 1,
    }));

    setShowSalesModal(false);
    setSalesAmount('');
    setSalesQty('');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold"
          >
            <CheckCircle2 size={20} />
            <span>تم تسجيل مبيعات نهاية اليوم وتحديث المخزون!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* End of Day Sales Modal */}
      <AnimatePresence>
        {showSalesModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl">
                  <PlusCircle size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900">تسجيل مبيعات نهاية اليوم</h3>
              </div>

              <form onSubmit={handleRecordSales} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">نوع الوقود</label>
                  <select 
                    value={salesFuelType}
                    onChange={(e) => setSalesFuelType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  >
                    <option value="بنزين 85">بنزين 85</option>
                    <option value="بنزين 92">بنزين 92</option>
                    <option value="ديزل">ديزل</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">إجمالي المبلغ (جنيه مصري)</label>
                    <input 
                      type="number"
                      required
                      value={salesAmount}
                      onChange={(e) => setSalesAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">الكمية المباعة (لتر)</label>
                    <input 
                      type="number"
                      required
                      value={salesQty}
                      onChange={(e) => setSalesQty(e.target.value)}
                      placeholder="0.0"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
                  >
                    تأكيد وحفظ
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowSalesModal(false)}
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
          <h2 className="text-3xl font-display font-bold text-slate-900">مراقبة المبيعات والمضخات</h2>
          <p className="text-slate-500 mt-1">متابعة حية لعمليات التعبئة وطرق الدفع</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowSalesModal(true)}
            className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
          >
            <PlusCircle size={18} />
            تسجيل مبيعات نهاية اليوم
          </button>
          <button className="bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors">
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
              <h4 className="text-2xl font-display font-bold text-emerald-900">1,524 جنيه مصري</h4>
              <p className="text-xs text-emerald-600 mt-1">245 عملية</p>
            </div>
            <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                  <Banknote size={20} />
                </div>
                <span className="text-sm font-bold text-blue-900">نقدي</span>
              </div>
              <h4 className="text-2xl font-display font-bold text-blue-900">685 جنيه مصري</h4>
              <p className="text-xs text-blue-600 mt-1">120 عملية</p>
            </div>
            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white rounded-lg text-amber-600 shadow-sm">
                  <Smartphone size={20} />
                </div>
                <span className="text-sm font-bold text-amber-900">تطبيقات ذكية</span>
              </div>
              <h4 className="text-2xl font-display font-bold text-amber-900">241 جنيه مصري</h4>
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
