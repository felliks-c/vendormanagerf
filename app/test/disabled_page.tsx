'use client';

import { useState } from 'react';
import { useTest } from '@/composables/client/useTest';

export default function ApiTestPage() {

    // if (process.env.NODE_ENV !== 'development') {
    //     return new NextResponse(null, { status: 404 });
    // }
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleCheckApi = async () => {
        setLoading(true);
        try {
            const vendors = await useTest();
            if (vendors === null) {
                setResponse({ error: 'Ошибка при получении поставщиков' });
            } else {
                setResponse(vendors);
            }
        } catch (err: any) {
            console.error('Ошибка при обращении к composable:', err);
            setResponse({ error: err?.message || 'Неизвестная ошибка' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 bg-neutral-950 text-white">
            <h1 className="text-2xl font-bold">🧪 Проверка API (через composable)</h1>

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
