// composables/server/useVendors.ts
import axios from '@/api/axios';
import { Vendor, VendorFilter } from './types';

export const useVendors = async (filter: VendorFilter = {}): Promise<Vendor[] | null> => {
  try {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, String(value));
    });

    const res = await axios.get<Vendor[]>('/vendors/', { params });
    return res.data;
  } catch (error: any) {
    console.error('Error fetching vendors:', error.response?.data || error.message);
    return null;
  }
};
