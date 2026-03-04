'use client';

import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Fuel, 
  DollarSign, 
  AlertTriangle,
  ArrowUpRight,
  Droplets,
  Clock,
  Zap,
  Download,
  CheckCircle2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';

const salesData = [
  { name: '08:00', sales: 4000 },
  { name: '10:00', sales: 3000 },
  { name: '12:00', sales: 5000 },
  { name: '14:00', sales: 2780 },
  { name: '16:00', sales: 1890 },
  { name: '18:00', sales: 2390 },
  { name: '20:00', sales: 3490 },
];

const fuelLevels = [
  { type: 'بنزين 85', level: 75, color: '#10b981' },
  { type: 'بنزين 92', level: 45, color: '#3b82f6' },
  { type: 'ديزل', level: 90, color: '#f59e0b' },
];

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={cn("p-3 rounded-xl", color)}>
        <Icon size={24} className="text-white" />
      </div>
      <div className={cn("flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full", isPositive ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600")}>
        {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
        {change}
      </div>
    </div>
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-display font-bold text-slate-900">{value}</h3>
    </div>
  </motion.div>
);

export default function DashboardView({ inventory, stats, setStats, setInventory }: any) {
  const [isExporting, setIsExporting] = useState(false);
  const [showExportSuccess, setShowExportSuccess] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [showSalesModal, setShowSalesModal] = useState(false);
  const [salesAmount, setSalesAmount] = useState('');
  const [salesQty, setSalesQty] = useState('');
  const [salesFuelType, setSalesFuelType] = useState('بنزين 85');

  const handleOrderFuel = () => {
    setShowOrderSuccess(true);
    setTimeout(() => setShowOrderSuccess(false), 3000);
  };

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
    setShowOrderSuccess(true);
    setTimeout(() => setShowOrderSuccess(false), 3000);
  };

  const handleExport = () => {
    setIsExporting(true);
    // Simulate report generation
    setTimeout(() => {
      setIsExporting(false);
      setShowExportSuccess(true);
      setTimeout(() => setShowExportSuccess(false), 3000);
      
      // Actual download simulation
      const content = "رقم العملية,المضخة,نوع الوقود,الكمية,المبلغ,طريقة الدفع,الحالة\n#TR-8942,02,بنزين 85,45.2 لتر,9.85 جنيه مصري,بطاقة,مكتمل";
      const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", "gas_station_report.csv");
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <AnimatePresence>
        {showExportSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold"
          >
            <CheckCircle2 size={20} />
            <span>تم تصدير التقرير بنجاح!</span>
          </motion.div>
        )}
        {showOrderSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 20 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold"
          >
            <Fuel size={20} />
            <span>تم إرسال طلب تزويد الوقود بنجاح!</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sales Entry Modal */}
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
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                  <Zap size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-slate-900">تسجيل مبيعات الشفت</h3>
              </div>

              <form onSubmit={handleRecordSales} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">نوع الوقود</label>
                  <select 
                    value={salesFuelType}
                    onChange={(e) => setSalesFuelType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="بنزين 85">بنزين 85</option>
                    <option value="بنزين 92">بنزين 92</option>
                    <option value="ديزل">ديزل</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">المبلغ (جنيه مصري)</label>
                    <input 
                      type="number"
                      required
                      value={salesAmount}
                      onChange={(e) => setSalesAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">الكمية (لتر)</label>
                    <input 
                      type="number"
                      required
                      value={salesQty}
                      onChange={(e) => setSalesQty(e.target.value)}
                      placeholder="0.0"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
                  >
                    تأكيد المبيعات
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

      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900">مرحباً بك، أحمد</h2>
          <p className="text-slate-500 mt-1">إليك ملخص أداء المحطة لهذا اليوم</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-2 text-sm text-slate-600">
            <Clock size={16} />
            <span>آخر تحديث: 12:45 م</span>
          </div>
          <button 
            onClick={() => setShowSalesModal(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center gap-2"
          >
            <Zap size={18} />
            تسجيل مبيعات الشفت
          </button>
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100 flex items-center gap-2 disabled:opacity-50"
          >
            {isExporting ? (
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Download size={18} />
              </motion.div>
            ) : <Download size={18} />}
            {isExporting ? 'جاري التصدير...' : 'تصدير التقرير'}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="إجمالي المبيعات" 
          value={`${stats.totalRevenue.toLocaleString()} جنيه مصري`} 
          change="+12.5%" 
          isPositive={true} 
          icon={DollarSign} 
          color="bg-emerald-500"
        />
        <StatCard 
          title="كمية الوقود المباعة" 
          value={`${stats.totalFuelSold.toLocaleString()} لتر`} 
          change="+5.2%" 
          isPositive={true} 
          icon={Droplets} 
          color="bg-blue-500"
        />
        <StatCard 
          title="عدد العمليات" 
          value={stats.totalTransactions.toLocaleString()} 
          change="-2.4%" 
          isPositive={false} 
          icon={Zap} 
          color="bg-amber-500"
        />
        <StatCard 
          title="تنبيهات الصيانة" 
          value="2" 
          change="نشط" 
          isPositive={true} 
          icon={AlertTriangle} 
          color="bg-rose-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display font-bold text-lg text-slate-900">معدل المبيعات اليومي</h3>
            <select className="bg-slate-50 border-none text-sm rounded-lg px-3 py-1 text-slate-600 outline-none">
              <option>اليوم</option>
              <option>أمس</option>
              <option>آخر 7 أيام</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 12 }}
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Fuel Levels */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-display font-bold text-lg text-slate-900 mb-8">مستويات الوقود الحالية</h3>
          <div className="space-y-8">
            {inventory.map((fuel: any) => {
              const percentage = Math.round((fuel.current / fuel.capacity) * 100);
              return (
                <div key={fuel.name} className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: fuel.color }}></div>
                      <span className="text-sm font-semibold text-slate-700">{fuel.name}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-900">{percentage}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: fuel.color }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400">المتبقي التقريبي: {fuel.current.toLocaleString()} لتر</p>
                </div>
              );
            })}
          </div>
          <button 
            onClick={handleOrderFuel}
            className="w-full mt-10 py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-sm font-medium hover:border-emerald-500 hover:text-emerald-500 transition-all"
          >
            طلب تزويد وقود جديد
          </button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-display font-bold text-lg text-slate-900">آخر العمليات</h3>
          <button className="text-emerald-600 text-sm font-semibold hover:underline">عرض الكل</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">رقم العملية</th>
                <th className="px-6 py-4 font-semibold">المضخة</th>
                <th className="px-6 py-4 font-semibold">نوع الوقود</th>
                <th className="px-6 py-4 font-semibold">الكمية</th>
                <th className="px-6 py-4 font-semibold">المبلغ</th>
                <th className="px-6 py-4 font-semibold">طريقة الدفع</th>
                <th className="px-6 py-4 font-semibold">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: '#TR-8942', pump: '02', type: 'بنزين 85', qty: '45.2 لتر', amount: '9.85 جنيه مصري', method: 'بطاقة', status: 'مكتمل' },
                { id: '#TR-8941', pump: '05', type: 'ديزل', qty: '120.0 لتر', amount: '13.80 جنيه مصري', method: 'نقدي', status: 'مكتمل' },
                { id: '#TR-8940', pump: '01', type: 'بنزين 92', qty: '32.5 لتر', amount: '7.54 جنيه مصري', method: 'تطبيق', status: 'مكتمل' },
                { id: '#TR-8939', pump: '03', type: 'بنزين 85', qty: '20.0 لتر', amount: '4.36 جنيه مصري', method: 'بطاقة', status: 'قيد المعالجة' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">{row.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.pump}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{row.type}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-mono">{row.qty}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{row.amount}</td>
                  <td className="px-6 py-4">
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">{row.method}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full uppercase",
                      row.status === 'مكتمل' ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
