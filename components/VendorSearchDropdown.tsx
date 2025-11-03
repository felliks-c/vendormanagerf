// components/VendorSearchDropdown.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Vendor } from '@/composables/server/types';
import { useSearchVendor } from '@/composables/client/useSearchVendor';
import { Search, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import debounce from 'lodash/debounce';

export default function VendorSearchDropdown() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Дебаунс поиска
  const debouncedSearch = debounce(async (search: string) => {
    if (!search.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const data = await useSearchVendor({ name: search, limit: 5 });
    setResults(data || []);
    setLoading(false);
  }, 500);

  useEffect(() => {
    debouncedSearch(query);
    return () => debouncedSearch.cancel();
  }, [query]);

  // Закрытие при клике вне
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (vendor: Vendor) => {
    setQuery('');
    setResults([]);
    setOpen(false);
    router.push(`/vendors/${vendor.id}`);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setOpen(false);
  };

  return (
    <div className="relative w-full sm:w-64" ref={inputRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 " />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Поиск поставщика..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-700"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
        )}
        {query && !loading && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {open && (results.length > 0 || loading) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-64 overflow-y-auto"
          >
            {loading ? (
              <div className="p-4 text-center text-gray-500">
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              </div>
            ) : (
              results.map((vendor) => (
                <button
                  key={vendor.id}
                  onClick={() => handleSelect(vendor)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 transition flex items-center justify-between border-b border-gray-100 last:border-0"
                >
                  <div>
                    <div className="font-medium text-gray-900">{vendor.name}</div>
                    <div className="text-sm text-gray-500">{vendor.category || 'Без категории'}</div>
                  </div>
                  <div className="text-xs text-gray-400">ID: {vendor.id}</div>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {open && !loading && results.length === 0 && query && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 text-center text-gray-500">
          Ничего не найдено
        </div>
      )}
    </div>
  );
}