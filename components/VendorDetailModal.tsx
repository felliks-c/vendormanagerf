// components/VendorDetailModal.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Vendor, VendorUpdateInput } from '@/composables/server/types';
import { useUpdateVendor } from '@/composables/client/useUpdateVendor';
import { X, Save, AlertCircle } from 'lucide-react';

interface Props {
  vendor: Vendor | null;
  onClose: () => void;
  onUpdate: (vendor: Vendor) => void;
}

export default function VendorDetailModal({ vendor, onClose, onUpdate }: Props) {
  const [form, setForm] = useState<Partial<Vendor>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Синхронизация form с vendor
  useEffect(() => {
    if (vendor) {
      setForm(vendor);
      setError('');
    }
  }, [vendor]);

  if (!vendor) return null;

  const handleChange = (field: keyof Vendor, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!vendor) return;

    setSaving(true);
    setError('');

    const updateData: VendorUpdateInput = {
      id: vendor.id,
      name: form.name,
      contactEmail: form.contactEmail,
      category: form.category,
      rating: form.rating !== undefined ? Number(form.rating) : undefined,
    };

    try {
      const updated = await useUpdateVendor(updateData);
      if (updated) {
        onUpdate(updated);
        onClose();
      } else {
        setError('Не удалось обновить данные');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка сервера');
    } finally {
      setSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {vendor && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
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

            {/* Ошибка */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-sm text-red-700 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                {error}
              </div>
            )}

            {/* Форма */}
            <div className="space-y-4">
              {/* Название */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Название
                </label>
                <input
                  type="text"
                  value={form.name || ''}
                  onChange={(e) => handleChange('name', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email контакта
                </label>
                <input
                  type="email"
                  value={form.contactEmail || ''}
                  onChange={(e) => handleChange('contactEmail', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-500"
                />
              </div>

              {/* Категория */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Категория
                </label>
                <select
                  value={form.category || ''}
                  onChange={(e) => handleChange('category', e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-500"
                >
                  <option value="">Выберите категорию</option>
                  <option value="electronics">Электроника</option>
                  <option value="logistics">Логистика</option>
                  <option value="textile">Текстиль</option>
                </select>
              </div>

              {/* Рейтинг */}
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Рейтинг (0–5)
                </label>
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating ?? ''}
                  onChange={(e) => handleChange('rating', Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-500"
                />
              </div>
            </div>

            {/* Кнопки */}
            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={onClose}
                disabled={saving}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 text-white transition ${
                  saving ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {saving ? (
                  <>
                    <Save className="w-4 h-4 animate-spin" />
                    Сохранение...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Сохранить
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}