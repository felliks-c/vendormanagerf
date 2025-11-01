'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus } from 'lucide-react';
import { useCreateVendor } from '@/composables/client/useCreateVendor';
import { Vendor, VendorCreateInput } from '@/composables/server/types';

interface Props {
  onClose: () => void;
  onCreate: (vendor: Vendor) => void;
}

export default function CreateVendorModal({ onClose, onCreate }: Props) {
  const [form, setForm] = useState<VendorCreateInput>({
    name: '',
    contactEmail: '',
    category: '',
    rating: 0,
  });
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (field: keyof VendorCreateInput, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setCreating(true);
    setError('');

    // Простая валидация
    if (!form.name || !form.contactEmail || !form.category) {
      setError('Пожалуйста, заполните все обязательные поля.');
      setCreating(false);
      return;
    }

    const ratingValue = Number(form.rating);
    if (isNaN(ratingValue) || ratingValue < 0 || ratingValue > 5) {
      setError('Рейтинг должен быть числом от 0 до 5.');
      setCreating(false);
      return;
    }

    const created = await useCreateVendor({
      ...form,
      rating: ratingValue,
    });

    setCreating(false);

    if (created) {
      onCreate(created);
      onClose();
    } else {
      setError('Ошибка при создании поставщика. Проверьте данные или соединение.');
    }
  };

  return (
    <AnimatePresence>
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
              Новый поставщик
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
                Название компании *
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Tech Supplies Inc."
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Email для связи *
              </label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                placeholder="contact@techsupplies.com"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Категория *
              </label>
              <select
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
              >
                <option value="">Выберите категорию</option>
                <option value="Tech">Технологии</option>
                <option value="Logistics">Логистика</option>
                <option value="Textile">Текстиль</option>
                <option value="Food">Продукты питания</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Рейтинг (0–5)
              </label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={form.rating}
                onChange={(e) => handleChange('rating', e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
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
              onClick={handleSubmit}
              disabled={creating}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 text-white transition ${
                creating
                  ? 'bg-blue-400 cursor-wait'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <Plus className="w-4 h-4" />
              {creating ? 'Создаём...' : 'Создать'}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
