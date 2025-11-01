// src/app/vendors/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Vendor } from '@/composables/server/types';
import { useSearchVendor } from '@/composables/client/useSearchVendor';

// Импортируем ваши отдельные компоненты (пока placeholders)
import VendorTable from '@/components/VendorTable';
import CreateVendorModal from '@/components/CreateVendorModal';

export default function VendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Поиск по подстроке
  useEffect(() => {
    if (!search) {
      setVendors([]); // пока нет search, пустой список
      return;
    }

    const timeout = setTimeout(async () => {
      const results = await useSearchVendor({ name: search });
      if (results) setVendors(results);
    }, 300); // debounce 300ms

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
          Поставщики
        </h1>

        <div className="flex gap-3 w-full sm:w-auto flex-col sm:flex-row">
          {/* Поиск */}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск поставщика..."
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Кнопка создания */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Создать нового поставщика
          </button>
        </div>
      </header>

      {/* Таблица */}
      <div className="mt-6">
        {vendors.length ? (
          <VendorTable {...({ vendors } as any)} />
        ) : (
          <div className="text-center text-gray-400 py-20 border border-dashed border-gray-300 rounded-lg">
            Результаты поиска появятся здесь...
          </div>
        )}
      </div>

      {/* Модальное окно создания */}
      {isModalOpen && (
        <CreateVendorModal
            onClose={() => setIsModalOpen(false)}
            onCreate={(newVendor) => setVendors((prev) => [...prev, newVendor])}
        />
        )}

    </div>
  );
}
