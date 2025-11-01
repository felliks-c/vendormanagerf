// import TestStatus from '@/components/TestPage';

// export default function HomePage() {
//   return (
//     <div>
//       <h1>Статус тестового API</h1>
//       <TestStatus />
//     </div>
//   );
// }





'use client';

import { useState } from 'react';
import axios from 'axios';

export default function ApiTestPage() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCheckApi = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api');
      setResponse(res.data);
    } catch (err: any) {
      console.error('Ошибка при обращении к API:', err);
      setResponse({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-neutral-950 text-white">
      <h1 className="text-2xl font-bold">🧪 Проверка API</h1>

      <button
        onClick={handleCheckApi}
        disabled={loading}
        className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition disabled:opacity-50"
      >
        {loading ? '⏳ Проверяем...' : 'Проверить API'}
      </button>

      {response && (
        <pre className="p-4 bg-neutral-900 rounded-lg w-[90%] max-w-lg overflow-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
