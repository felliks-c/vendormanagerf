// composables/useCreateVendor.ts
import axios from 'axios';
import { Vendor, VendorCreateInput } from './types';

export const useCreateVendor = async (data: VendorCreateInput): Promise<Vendor | null> => {
  try {
    const res = await axios.post<Vendor>('/vendors/', data);
    return res.data;
  } catch (error: any) {
    console.error('Error creating vendor:', error.response?.data || error.message);
    return null;
  }
};
