// composables/useUpdateVendor.ts
import axios from 'axios';
import { Vendor, VendorUpdateInput } from './types';

export const useUpdateVendor = async (data: VendorUpdateInput): Promise<Vendor | null> => {
  try {
    const res = await axios.put<Vendor>('/vendors/', data);
    return res.data;
  } catch (error: any) {
    console.error('Error updating vendor:', error.response?.data || error.message);
    return null;
  }
};
