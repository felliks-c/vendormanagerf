// composables/client/useCreateVendor.ts
import axios from '@/api/axios';
import { Vendor, VendorCreateInput } from '@/composables/server/types';

export const useCreateVendor = async (data: VendorCreateInput): Promise<Vendor | null> => {
  try {
    const res = await axios.post<Vendor>('/api/vendors', data);
    return res.data;
  } catch (err: any) {
    console.error('Error creating vendor:', err.response?.data || err.message);
    return null;
  }
};
