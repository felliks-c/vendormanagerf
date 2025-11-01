// import React from "react";

// type TestItem = { id: string | number; name: string };

// async function fetchServerTest(): Promise<TestItem[]> {
//     const res = await fetch("/api/test", { cache: "no-store" });
//     if (!res.ok) {
//         const text = await res.text();
//         throw new Error(`Fetch error: ${res.status} ${text}`);
//     }
//     return (await res.json()) ?? [];
// }

// export default async function Page(): Promise<JSX.Element> {
//     try {
//         const test = await fetchServerTest();
//         return (
//             <ul>
//                 {test.map((u) => (
//                     <li key={u.id}>{u.name}</li>
//                 ))}
//             </ul>
//         );
//     } catch (e) {
//         return <div>Ошибка: {(e as Error)?.message ?? "Unknown error"}</div>;
//     }
// }



import { fetchTestStatus } from '@/composables/useTest';

export default async function TestStatus() {
  let status = 'loading';

  try {
    const data = await fetchTestStatus();
    status = data.status;
  } catch (error) {
    status = 'error';
  }

  return (
    <div>
      {status === 'loading' && 'Загрузка...'} {/* Теоретически тут никогда не будет loading */}
      {status === 'success' && 'API работает!'}
      {status === 'error' && 'Ошибка при запросе API'}
    </div>
  );
}
