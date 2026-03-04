'use client';

import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardView from '@/components/DashboardView';
import InventoryView from '@/components/InventoryView';
import SalesView from '@/components/SalesView';
import EmployeesView from '@/components/EmployeesView';
import StoreView from '@/components/StoreView';
import LocationsView from '@/components/LocationsView';
import LockScreen from '@/components/LockScreen';
import { motion, AnimatePresence } from 'motion/react';

const LOCK_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLocked, setIsLocked] = useState(true);
  const [lastActivity, setLastActivity] = useState(() => Date.now());
  
  // Multi-user state
  const [users, setUsers] = useState([
    { username: 'admin', password: '1234', role: 'مدير المحطة', name: 'علي الهواري' },
    { username: 'user1', password: '0000', role: 'مشرف وردية', name: 'محمد علي' },
  ]);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Shared State
  const [inventory, setInventory] = useState([
    { name: 'بنزين 85', current: 12500, capacity: 25000, color: '#10b981' },
    { name: 'بنزين 92', current: 8400, capacity: 25000, color: '#3b82f6' },
    { name: 'ديزل', current: 22100, capacity: 25000, color: '#f59e0b' },
  ]);

  const [employees, setEmployees] = useState([
    { id: 1, name: 'محمد العتيبي', role: 'مشرف وردية', status: 'present', shift: 'الصباحية', avatar: 'https://picsum.photos/seed/emp1/100/100' },
    { id: 2, name: 'سالم الدوسري', role: 'عامل مضخة', status: 'present', shift: 'الصباحية', avatar: 'https://picsum.photos/seed/emp2/100/100' },
    { id: 3, name: 'فهد القحطاني', role: 'عامل مضخة', status: 'absent', shift: 'المسائية', avatar: 'https://picsum.photos/seed/emp3/100/100' },
    { id: 4, name: 'خالد الشمري', role: 'محاسب متجر', status: 'present', shift: 'الصباحية', avatar: 'https://picsum.photos/seed/emp4/100/100' },
    { id: 5, name: 'عبدالله المطيري', role: 'عامل مضخة', status: 'on_leave', shift: '---', avatar: 'https://picsum.photos/seed/emp5/100/100' },
  ]);

  const [stats, setStats] = useState({
    totalRevenue: 2450,
    totalFuelSold: 12400,
    totalTransactions: 452,
  });

  const lockSystem = useCallback(() => {
    setIsLocked(true);
    setCurrentUser(null);
  }, []);

  const handleUnlock = (password: string) => {
    const user = users.find(u => u.password === password);
    if (user) {
      setIsLocked(false);
      setCurrentUser(user);
      setLastActivity(Date.now());
      return true;
    }
    return false;
  };

  // Auto-lock timer logic
  useEffect(() => {
    if (isLocked) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastActivity >= LOCK_TIMEOUT) {
        lockSystem();
      }
    }, 10000); // Check every 10 seconds

    const updateActivity = () => {
      setLastActivity(Date.now());
    };

    // Track user activity
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('click', updateActivity);
    window.addEventListener('touchstart', updateActivity);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('touchstart', updateActivity);
    };
  }, [isLocked, lastActivity, lockSystem]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView inventory={inventory} stats={stats} setStats={setStats} setInventory={setInventory} />;
      case 'inventory':
        return <InventoryView inventory={inventory} setInventory={setInventory} />;
      case 'sales':
        return <SalesView inventory={inventory} setInventory={setInventory} stats={stats} setStats={setStats} />;
      case 'employees':
        return <EmployeesView users={users} setUsers={setUsers} employees={employees} setEmployees={setEmployees} />;
      case 'store':
        return <StoreView />;
      case 'locations':
        return <LocationsView />;
      default:
        return <DashboardView inventory={inventory} stats={stats} setStats={setStats} setInventory={setInventory} />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100]"
          >
            <LockScreen onUnlock={handleUnlock} />
          </motion.div>
        )}
      </AnimatePresence>

      <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab} currentUser={currentUser}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </DashboardLayout>
    </>
  );
}
