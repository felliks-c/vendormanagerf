'use client';

import { useEffect, useState } from 'react';
import { Vendor } from '@/composables/server/types';
import { useVendors } from '@/composables/client/useVendors';
import { useSearchVendor } from '@/composables/client/useSearchVendor';
import { useDeleteVendor } from '@/composables/client/useDeleteVendor';
import { Eye, Trash2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VendorDetailModal from '@/components/VendorDetailModal';


export default function VendorTable() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({ country: '', category: '' });
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Vendor | null>(null);

  // загрузка всех вендоров по фильтрам
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await useVendors(filters);
      if (data) setVendors(data);
      setLoading(false);
    };
    fetchData();
  }, [filters]);

  // поиск по строке
  const handleSearch = async () => {
    setLoading(true);
    const result = await useSearchVendor({ name: search });
    if (result) setVendors(result);
    setLoading(false);
  };

  // удаление
  const handleDelete = async (vendor: Vendor) => {
    if (!confirm(`Удалить поставщика "${vendor.name}"?`)) return;
    const message = await useDeleteVendor({ id: vendor.id });
    if (message) {
      setVendors((prev) => prev.filter((v) => v.id !== vendor.id));
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-200">
      {/* 🔍 Поиск + фильтры */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label className="text-sm font-medium text-gray-600">Поиск по имени</label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Введите имя поставщика..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Найти
            </button>
          </div>
        </div>

        {/* Фильтры */}
        <div className="flex gap-3 flex-wrap md:flex-nowrap">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Страна</label>
            <select
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Все</option>
              <option value="RU">Россия</option>
              <option value="TJ">Таджикистан</option>
              <option value="UZ">Узбекистан</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Категория</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Все</option>
              <option value="electronics">Электроника</option>
              <option value="logistics">Логистика</option>
              <option value="textile">Текстиль</option>
            </select>
          </div>
        </div>
      </div>

      {/* 📋 Таблица */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 border-t border-gray-100">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Название</th>
              <th className="px-4 py-3">Страна</th>
              <th className="px-4 py-3">Категория</th>
              <th className="px-4 py-3 text-right">Действия</th>
            </tr>
          </thead>

          <tbody>
            <AnimatePresence>
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-gray-400" />
                    <p className="mt-2">Загрузка поставщиков...</p>
                  </td>
                </tr>
              ) : vendors.length ? (
                vendors.map((vendor) => (
                  <motion.tr
                    key={vendor.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{vendor.id}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{vendor.name}</td>
                    <td className="px-4 py-3">{vendor.category || '-'}</td>
                    <td className="px-4 py-3 text-right flex justify-end gap-3">
                      <button
                        onClick={() => setSelectedVendor(vendor)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Подробнее"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(vendor)}
                        className="text-red-600 hover:text-red-800"
                        title="Удалить"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-gray-400">
                    Ничего не найдено 😔
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Детальное окно (placeholder) */}
      {/* <AnimatePresence>
        {selectedVendor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative"
            >
              <h2 className="text-xl font-semibold mb-3">
                Детали поставщика #{selectedVendor.id}
              </h2>
              <p className="text-gray-700 mb-1">Имя: {selectedVendor.name}</p>
              <p className="text-gray-700 mb-1">Страна: {selectedVendor.country}</p>
              <p className="text-gray-700 mb-4">Категория: {selectedVendor.category}</p>
              <button
                onClick={() => setSelectedVendor(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
      <VendorDetailModal
        vendor={selectedVendor}
        onClose={() => setSelectedVendor(null)}
        onUpdate={(updated) =>
            setVendors((prev) =>
            prev.map((v) => (v.id === updated.id ? updated : v))
            )
        }
        />
    </div>
  );
}