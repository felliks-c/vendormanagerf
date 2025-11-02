// src/app/vendors/page.tsx
'use client';

import { useState } from 'react';
import VendorTable from '@/components/VendorTable';
import CreateVendorModal from '@/components/CreateVendorModal';
import VendorSearchDropdown from '@/components/VendorSearchDropdown';

export default function VendorsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 sm:mb-0">
          Поставщики
        </h1>

        <div className="flex gap-3 w-full sm:w-auto flex-col sm:flex-row">
          <VendorSearchDropdown />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Создать нового поставщика
          </button>
        </div>
      </header>

      <div className="mt-6">
        <VendorTable />
      </div>

      {isModalOpen && (
        <CreateVendorModal
          onClose={() => setIsModalOpen(false)}
          onCreate={() => {
            setIsModalOpen(false);
            // Можно обновить таблицу, если нужно
          }}
        />
      )}
    </div>
  );
}