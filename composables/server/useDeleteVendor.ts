// composables/useDeleteVendor.ts
import axios from '@/api/axios';
import { VendorDeleteInput } from './types';

export const useDeleteVendor = async (data: VendorDeleteInput): Promise<string | null> => {
  try {
    const res = await axios.delete<{ message: string }>('/vendors/', { data });
    return res.data.message;
  } catch (error: any) {
    console.error('Error deleting vendor:', error.response?.data || error.message);
    return null;
  }
};
