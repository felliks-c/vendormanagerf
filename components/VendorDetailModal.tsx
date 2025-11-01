'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vendor } from '@/composables/server/types';
import { useUpdateVendor } from '@/composables/client/useUpdateVendor';
import { X, Save } from 'lucide-react';

interface Props {
  vendor: Vendor | null;
  onClose: () => void;
  onUpdate: (vendor: Vendor) => void;
}

export default function VendorDetailModal({ vendor, onClose, onUpdate }: Props) {
  const [form, setForm] = useState<Vendor | null>(vendor);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  if (!vendor || !form) return null;

  const handleChange = (field: keyof Vendor, value: string) => {
    setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
  };

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    setError('');
    const updated = await useUpdateVendor(form);
    setSaving(false);

    if (updated) {
      onUpdate(updated);
      onClose();
    } else {
      setError('Не удалось обновить данные. Проверьте соединение.');
    }
  };

  return (
    <AnimatePresence>
      {vendor && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Заголовок */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Редактировать поставщика #{vendor.id}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Форма */}
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Название
                </label>
                <input
                  type="text"
                  value={form.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Категория
                </label>
                <input
                  type="text"
                  value={form.category || ''}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm text-center mt-1">{error}</p>
              )}
            </div>

            {/* Кнопки */}
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-white transition ${
                  saving
                    ? 'bg-blue-400 cursor-wait'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                <Save className="w-4 h-4" />
                {saving ? 'Сохраняем...' : 'Сохранить'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
