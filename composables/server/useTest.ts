// composables/server/useTest.ts

import axios from '@/api/axios';

export async function useTestStatus() {
  try {
    const response = await axios.get('/test');
    return response.data; // {status: "success"}
  } catch (error) {
    console.error('Error fetching test status:', error);
    return { status: 'error' }; // удобно для UI
  }
}
