'use client';

import React from 'react';
import { 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  AlertCircle,
  Search,
  Plus,
  ArrowUpRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

const products = [
  { id: 1, name: 'مياه معدنية 500 مل', category: 'مشروبات', price: '0.15 جنيه مصري', stock: 124, status: 'in_stock' },
  { id: 2, name: 'زيت محرك 10W-40', category: 'زيوت', price: '4.50 جنيه مصري', stock: 12, status: 'low_stock' },
  { id: 3, name: 'بسكويت شوكولاتة', category: 'سناكس', price: '0.30 جنيه مصري', stock: 85, status: 'in_stock' },
  { id: 4, name: 'مناديل مبللة', category: 'عناية', price: '0.55 جنيه مصري', stock: 0, status: 'out_of_stock' },
  { id: 5, name: 'مشروب طاقة', category: 'مشروبات', price: '1.20 جنيه مصري', stock: 42, status: 'in_stock' },
];

export default function StoreView() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900">إدارة المتجر المصاحب</h2>
          <p className="text-slate-500 mt-1">متابعة مبيعات التموينات والمخزون</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="بحث عن منتج..." 
              className="bg-white border border-slate-200 rounded-xl pr-10 pl-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-64"
            />
          </div>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100">
            <Plus size={18} />
            إضافة منتج
          </button>
        </div>
      </div>

      {/* Store Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-500 rounded-xl text-white">
              <ShoppingCart size={24} />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+18%</span>
          </div>
          <p className="text-slate-500 text-sm font-medium mb-1">مبيعات المتجر اليوم</p>
          <h3 className="text-2xl font-display font-bold text-slate-900">345 جنيه مصري</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500 rounded-xl text-white">
              <Package size={24} />
            </div>
            <span className="text-xs font-bold text-slate-400">ثابت</span>
          </div>
          <p className="text-slate-500 text-sm font-medium mb-1">إجمالي المنتجات</p>
          <h3 className="text-2xl font-display font-bold text-slate-900">842</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-500 rounded-xl text-white">
              <AlertCircle size={24} />
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">تنبيه</span>
          </div>
          <p className="text-slate-500 text-sm font-medium mb-1">منتجات منخفضة المخزون</p>
          <h3 className="text-2xl font-display font-bold text-slate-900">12</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-rose-500 rounded-xl text-white">
              <TrendingUp size={24} />
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">الأكثر مبيعاً</span>
          </div>
          <p className="text-slate-500 text-sm font-medium mb-1">المنتج الأكثر طلباً</p>
          <h3 className="text-lg font-display font-bold text-slate-900">مياه معدنية</h3>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-display font-bold text-lg text-slate-900">مخزون المنتجات</h3>
          <button className="text-emerald-600 text-sm font-semibold hover:underline">إدارة التصنيفات</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">المنتج</th>
                <th className="px-6 py-4 font-semibold">التصنيف</th>
                <th className="px-6 py-4 font-semibold">السعر</th>
                <th className="px-6 py-4 font-semibold">المخزون</th>
                <th className="px-6 py-4 font-semibold">الحالة</th>
                <th className="px-6 py-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{product.category}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900">{product.price}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-mono">{product.stock}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full uppercase",
                      product.status === 'in_stock' ? "bg-emerald-100 text-emerald-700" : 
                      product.status === 'low_stock' ? "bg-amber-100 text-amber-700" : "bg-rose-100 text-rose-700"
                    )}>
                      {product.status === 'in_stock' ? 'متوفر' : product.status === 'low_stock' ? 'منخفض' : 'نافذ'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button className="p-1.5 text-slate-400 hover:text-emerald-600 rounded-lg">
                      <ArrowUpRight size={18} />
                    </button>
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
