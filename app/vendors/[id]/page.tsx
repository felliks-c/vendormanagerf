// app/vendors/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Vendor } from '@/composables/server/types';
import { useVendors } from '@/composables/client/useVendors';
import { useUpdateVendor } from '@/composables/client/useUpdateVendor';
import { Loader2, ArrowLeft, Save, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function VendorDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<Partial<Vendor>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Загрузка поставщика по ID
  useEffect(() => {
    const fetchVendor = async () => {
      setLoading(true);
      setError('');
      try {
        const numId = Number(id);
        if (isNaN(numId)) throw new Error('Invalid ID');

        const data = await useVendors({ id: numId });
        if (data && data.length > 0) {
          const v = data[0];
          setVendor(v);
          setForm(v);
        } else {
          setError('Поставщик не найден');
        }
      } catch (err: any) {
        setError(err.message || 'Ошибка загрузки');
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [id]);

  // Сохранение
  const handleSave = async () => {
    if (!vendor || !form) return;

    setSaving(true);
    setError('');

    try {
      const updated = await useUpdateVendor({
        id: vendor.id,
        ...form,
      });

      if (updated) {
        setVendor(updated);
        setEditing(false);
      } else {
        setError('Не удалось сохранить изменения');
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка сохранения');
    } finally {
      setSaving(false);
    }
  };

  // Отмена
  const handleCancel = () => {
    setForm(vendor || {});
    setEditing(false);
    setError('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error && !vendor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-red-200 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900">{error}</p>
          <button
            onClick={() => router.push('/vendors')}
            className="mt-4 px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Назад к списку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Хедер */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/vendors')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Назад
          </button>

          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              Редактировать
            </button>
          )}
        </div>

        {/* Карточка */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              {editing ? 'Редактирование поставщика' : 'Детали поставщика'}
            </h1>
            <span className="text-sm text-gray-500">ID: {vendor?.id}</span>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Название */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Название
              </label>
              {editing ? (
                <input
                  type="text"
                  value={form.name || ''}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                />
              ) : (
                <p className="text-lg font-medium text-gray-900">{vendor?.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email контакта
              </label>
              {editing ? (
                <input
                  type="email"
                  value={form.contactEmail || ''}
                  onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                />
              ) : (
                <p className="text-gray-600">{vendor?.contactEmail || '—'}</p>
              )}
            </div>

            {/* Категория */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Категория
              </label>
              {editing ? (
                <select
                  value={form.category || ''}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                >
                  <option value="">Выберите категорию</option>
                  <option value="electronics">Электроника</option>
                  <option value="logistics">Логистика</option>
                  <option value="textile">Текстиль</option>
                </select>
              ) : (
                <p className="text-gray-600 capitalize">{vendor?.category || '—'}</p>
              )}
            </div>

            {/* Рейтинг */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Рейтинг
              </label>
              {editing ? (
                <input
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={form.rating || 0}
                  onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
                />
              ) : (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-2xl ${
                        i < Math.floor(vendor?.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-gray-600">({vendor?.rating || 0})</span>
                </div>
              )}
            </div>
          </div>

          {/* Кнопки редактирования */}
          {editing && (
            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition"
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className={`px-4 py-2 rounded-md flex items-center gap-2 text-white transition ${
                  saving ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
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
          )}
        </motion.div>
      </div>
    </div>
  );
}