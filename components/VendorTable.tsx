// components/VendorTable.tsx

'use client';

import { useEffect, useState, useCallback } from 'react';
import { Vendor } from '@/composables/server/types';
import { useVendors } from '@/composables/client/useVendors';
import { useSearchVendor } from '@/composables/client/useSearchVendor';
import { useDeleteVendor } from '@/composables/client/useDeleteVendor';
import { Eye, Trash2, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import VendorDetailModal from '@/components/VendorDetailModal';
import debounce from 'lodash/debounce';

interface VendorFilter {
  id?: number;
  name?: string;
  contactEmail?: string;
  category?: string;
  rating?: number;
  limit?: number;
  offset?: number;
}

interface Filters {
  category?: string;
  page?: number;
  limit?: number;
  name?: string;
}


export default function VendorTable() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<Filters>({
    category: '',
    page: 1,
    limit: 10,
  });

  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  // Дебаунс для поиска
  const debouncedSearch = useCallback(
    debounce((name: string) => {
      setFilters((prev) => ({
        ...prev,
        name,
        page: 1, // сбрасываем страницу при новом поиске
      }));
    }, 500),
    []
  );

  // Обработчик ввода
  const handleSearchChange = (value: string) => {
    setSearch(value);
    debouncedSearch(value);
  };

  // Загрузка данных
  const fetchVendors = useCallback(async () => {
    if (!hasMore && (filters.page ?? 1) > 1) return;

    setLoading(true);
    try {
      let data: Vendor[] | null = null;

      // Если есть поиск по имени — используем search API
      if (filters.name) {
        data = await useSearchVendor({
          name: filters.name,
        });
      } else {
        // Иначе — обычные фильтры
        data = await useVendors({
          category: filters.category || undefined,
          limit: filters.limit,
          offset: ((filters.page ?? 1) - 1) * (filters.limit ?? 10),
        } as any);
      }

      if (data) {
        if (filters.page === 1) {
          setVendors(data);
        } else {
          setVendors((prev) => [...prev, ...data]);
        }
        setHasMore(data.length === filters.limit);
      } else {
        setVendors([]);
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error fetching vendors:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, hasMore]);

  // Загрузка при изменении фильтров
  useEffect(() => {
    fetchVendors();
  }, [fetchVendors]);

  // Lazy loading при скролле
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading &&
        hasMore
      ) {
        setFilters((prev) => ({ ...prev, page: (prev.page ?? 1) + 1 }));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  // Удаление
  const handleDelete = async (vendor: Vendor) => {
    if (!confirm(`Удалить поставщика "${vendor.name}"?`)) return;
    const message = await useDeleteVendor({ id: vendor.id });
    if (message) {
      setVendors((prev) => prev.filter((v) => v.id !== vendor.id));
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-2xl p-6 border border-gray-200">
      {/* Поиск + фильтры */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label className="text-sm font-medium text-gray-600">Поиск по имени</label>
          <input
            type="text"
            placeholder="Введите имя поставщика..."
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="px-3 text-gray-500 py-2 border border-gray-300 rounded-lg w-full md:w-64 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex gap-3 flex-wrap md:flex-nowrap">

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-600">Категория</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value, page: 1 })}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-500"
            >
              <option value="">Все</option>
              <option value="electronics">Электроника</option>
              <option value="logistics">Логистика</option>
              <option value="textile">Текстиль</option>
            </select>
          </div>
        </div>
      </div>

      {/* Таблица */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-600 border-t border-gray-100">
          <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Название</th>
              <th className="px-4 py-3">Категория</th>
              <th className="px-4 py-3 text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {vendors.length ? (
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
              ) : loading ? null : (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-gray-400">
                    Ничего не найдено
                  </td>
                </tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>

        {/* Lazy loading индикатор */}
        {loading && (
          <div className="py-4 text-center">
            <Loader2 className="w-5 h-5 animate-spin mx-auto text-blue-600" />
          </div>
        )}

        {!hasMore && vendors.length > 0 && (
          <div className="py-4 text-center text-sm text-gray-500">
            Больше нет данных
          </div>
        )}
      </div>

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