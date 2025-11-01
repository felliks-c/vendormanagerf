// composables/client/useDeleteVendor.ts
import axios from 'axios';
import { VendorDeleteInput } from '@/composables/server/types';

export const useDeleteVendor = async (data: VendorDeleteInput): Promise<string | null> => {
  try {
    const res = await axios.delete<{ message: string }>('/api/vendors', { data });
    return res.data.message;
  } catch (err: any) {
    console.error('Error deleting vendor:', err.response?.data || err.message);
    return null;
  }
};
