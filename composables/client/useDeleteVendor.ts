// composables/client/useDeleteVendor.ts
import axios from '@/api/axios';
import { VendorDeleteInput } from '@/composables/server/types';

export const useDeleteVendor = async (data: VendorDeleteInput): Promise<string | null> => {
  try {
    // Клиент → Next.js API → FastAPI
    const res = await axios.delete<{ message: string }>(`/api/vendors/${data.id}`);
    return res.data.message;
  } catch (err: any) {
    console.error('Error deleting vendor:', err.response?.data || err.message);
    return null;
  }
};