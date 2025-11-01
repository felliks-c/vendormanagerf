'use client';

import axios from 'axios';
import { useState } from 'react';

export default function TestApiPage() {
  const [result, setResult] = useState<string>('');

  const handleClick = async () => {
    try {
      const res = await axios.get('/api/test');
      setResult(res.data.message);
    } catch (err: any) {
      console.error(err);
      setResult(`Ошибка: ${err.response?.status || err.message}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Проверка API</h1>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Проверить API
      </button>
      {result && <p className="mt-4 text-lg">{result}</p>}
    </div>
  );
}
