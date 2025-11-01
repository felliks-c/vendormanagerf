import { fetchTestStatus } from '@/composables/server/useTest';

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
