// composables/client/useUpdateVendor.ts
import axios from 'axios';
import { Vendor, VendorUpdateInput } from '@/composables/server/types';

export const useUpdateVendor = async (data: VendorUpdateInput): Promise<Vendor | null> => {
  try {
    const res = await axios.put<Vendor>('/api/vendors', data);
    return res.data;
  } catch (err: any) {
    console.error('Error updating vendor:', err.response?.data || err.message);
    return null;
  }
};
