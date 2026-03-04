'use client';

import React from 'react';
import { 
  Users, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  MoreVertical,
  UserPlus,
  Mail,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

import Image from 'next/image';
import { useState } from 'react';

const initialEmployees = [
  { id: 1, name: 'محمد العتيبي', role: 'مشرف وردية', status: 'present', shift: 'الصباحية', avatar: 'https://picsum.photos/seed/emp1/100/100' },
  { id: 2, name: 'سالم الدوسري', role: 'عامل مضخة', status: 'present', shift: 'الصباحية', avatar: 'https://picsum.photos/seed/emp2/100/100' },
  { id: 3, name: 'فهد القحطاني', role: 'عامل مضخة', status: 'absent', shift: 'المسائية', avatar: 'https://picsum.photos/seed/emp3/100/100' },
  { id: 4, name: 'خالد الشمري', role: 'محاسب متجر', status: 'present', shift: 'الصباحية', avatar: 'https://picsum.photos/seed/emp4/100/100' },
  { id: 5, name: 'عبدالله المطيري', role: 'عامل مضخة', status: 'on_leave', shift: '---', avatar: 'https://picsum.photos/seed/emp5/100/100' },
];

export default function EmployeesView() {
  const [employeesList, setEmployeesList] = useState(initialEmployees);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: 'عامل مضخة', shift: 'الصباحية' });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const id = employeesList.length + 1;
    const employee = {
      id,
      ...newEmployee,
      status: 'present',
      avatar: `https://picsum.photos/seed/emp${id}/100/100`
    };
    setEmployeesList([employee, ...employeesList]);
    setIsModalOpen(false);
    setNewEmployee({ name: '', role: 'عامل مضخة', shift: 'الصباحية' });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900">إدارة الموظفين والورديات</h2>
          <p className="text-slate-500 mt-1">تنظيم جداول العمل ومتابعة الحضور والمهام</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white text-slate-700 border border-slate-200 px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-50 transition-colors">
            <Calendar size={18} />
            جدول الورديات
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium flex items-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100"
          >
            <UserPlus size={18} />
            إضافة موظف
          </button>
        </div>
      </div>

      {/* Add Employee Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md p-8 overflow-hidden"
            >
              <h3 className="text-xl font-display font-bold text-slate-900 mb-6">إضافة موظف جديد</h3>
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">اسم الموظف</label>
                  <input 
                    required
                    type="text" 
                    value={newEmployee.name}
                    onChange={(e) => setNewEmployee({...newEmployee, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                    placeholder="أدخل الاسم الثلاثي"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">الدور الوظيفي</label>
                  <select 
                    value={newEmployee.role}
                    onChange={(e) => setNewEmployee({...newEmployee, role: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  >
                    <option>مشرف وردية</option>
                    <option>عامل مضخة</option>
                    <option>محاسب متجر</option>
                    <option>فني صيانة</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">الوردية</label>
                  <select 
                    value={newEmployee.shift}
                    onChange={(e) => setNewEmployee({...newEmployee, shift: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  >
                    <option>الصباحية</option>
                    <option>المسائية</option>
                    <option>الليلية</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-4">
                  <button 
                    type="submit"
                    className="flex-1 bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-colors"
                  >
                    حفظ البيانات
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-slate-100 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">إجمالي الموظفين</p>
            <h4 className="text-2xl font-display font-bold text-slate-900">24</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">الحاضرون الآن</p>
            <h4 className="text-2xl font-display font-bold text-slate-900">18</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-400 font-bold uppercase">طلبات الإجازة</p>
            <h4 className="text-2xl font-display font-bold text-slate-900">3</h4>
          </div>
        </div>
      </div>

      {/* Employee List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-display font-bold text-lg text-slate-900">قائمة الموظفين</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-xs font-bold bg-emerald-600 text-white rounded-lg">الكل</button>
            <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg">الصباحية</button>
            <button className="px-3 py-1 text-xs font-bold text-slate-500 hover:bg-slate-50 rounded-lg">المسائية</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-semibold">الموظف</th>
                <th className="px-6 py-4 font-semibold">الدور الوظيفي</th>
                <th className="px-6 py-4 font-semibold">الوردية</th>
                <th className="px-6 py-4 font-semibold">الحالة</th>
                <th className="px-6 py-4 font-semibold">تواصل</th>
                <th className="px-6 py-4 font-semibold"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employeesList.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 relative">
                        <Image 
                          src={emp.avatar} 
                          alt={emp.name} 
                          fill 
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-sm font-bold text-slate-900">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">{emp.role}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{emp.shift}</td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full uppercase",
                      emp.status === 'present' ? "bg-emerald-100 text-emerald-700" : 
                      emp.status === 'absent' ? "bg-rose-100 text-rose-700" : "bg-amber-100 text-amber-700"
                    )}>
                      {emp.status === 'present' ? 'حاضر' : emp.status === 'absent' ? 'غائب' : 'إجازة'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Phone size={16} />
                      </button>
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Mail size={16} />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left">
                    <button className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg">
                      <MoreVertical size={18} />
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
