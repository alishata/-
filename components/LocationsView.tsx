'use client';

import React, { useState } from 'react';
import { MapPin, Plus, Search, Navigation, Phone, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import dynamic from 'next/dynamic';

// Dynamically import MapComponent to avoid SSR issues with Leaflet
const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-slate-100 animate-pulse rounded-2xl flex items-center justify-center text-slate-400">جاري تحميل الخريطة...</div>
});

const initialLocations = [
  { id: 1, name: 'محطة النيل - القاهرة', lat: 30.0444, lng: 31.2357, address: 'شارع التحرير، الدقي، الجيزة', phone: '01012345678', hours: '24 ساعة' },
  { id: 2, name: 'محطة العبور - القاهرة', lat: 30.1500, lng: 31.4500, address: 'طريق مصر الإسماعيلية، العبور', phone: '01087654321', hours: '24 ساعة' },
];

export default function LocationsView() {
  const [locations, setLocations] = useState(initialLocations);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = locations.filter(loc => 
    loc.name.includes(searchTerm) || loc.address.includes(searchTerm)
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-slate-900">مواقع المحطات</h2>
          <p className="text-slate-500 mt-1">إدارة وعرض مواقع محطات الوقود التابعة لك</p>
        </div>
        <button className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100 flex items-center gap-2">
          <Plus size={18} />
          إضافة موقع جديد
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Locations List */}
        <div className="lg:col-span-1 space-y-4">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="بحث عن محطة..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pr-10 pl-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 transition-all outline-none"
            />
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredLocations.map((loc) => (
              <motion.div 
                key={loc.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <MapPin size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 mb-1">{loc.name}</h4>
                    <p className="text-xs text-slate-500 mb-3">{loc.address}</p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Phone size={12} />
                        <span>{loc.phone}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Clock size={12} />
                        <span>{loc.hours}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Map View */}
        <div className="lg:col-span-2">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm h-full flex flex-col">
            <div className="flex items-center justify-between mb-4 px-2">
              <div className="flex items-center gap-2">
                <Navigation size={18} className="text-emerald-600" />
                <h3 className="font-display font-bold text-slate-900">الخريطة التفاعلية</h3>
              </div>
              <div className="flex gap-2">
                <span className="text-xs bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full font-medium">
                  {locations.length} محطات نشطة
                </span>
              </div>
            </div>
            
            <div className="flex-1 min-h-[400px]">
              <MapComponent locations={filteredLocations} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
