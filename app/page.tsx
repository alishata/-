'use client';

import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardView from '@/components/DashboardView';
import InventoryView from '@/components/InventoryView';
import SalesView from '@/components/SalesView';
import EmployeesView from '@/components/EmployeesView';
import StoreView from '@/components/StoreView';
import LockScreen from '@/components/LockScreen';
import { motion, AnimatePresence } from 'motion/react';

const LOCK_TIMEOUT = 10 * 60 * 1000; // 10 minutes in milliseconds
const SYSTEM_PASSWORD = '1234'; // Default system password

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLocked, setIsLocked] = useState(true);
  const [lastActivity, setLastActivity] = useState(() => Date.now());

  const lockSystem = useCallback(() => {
    setIsLocked(true);
  }, []);

  const handleUnlock = (password: string) => {
    if (password === SYSTEM_PASSWORD) {
      setIsLocked(false);
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
        return <DashboardView />;
      case 'inventory':
        return <InventoryView />;
      case 'sales':
        return <SalesView />;
      case 'employees':
        return <EmployeesView />;
      case 'store':
        return <StoreView />;
      default:
        return <DashboardView />;
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

      <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
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
