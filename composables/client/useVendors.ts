// composables/client/useVendors.ts
import axios from 'axios';
import { Vendor, VendorFilter } from '@/composables/server/types';

export const useVendors = async (filter: VendorFilter = {}): Promise<Vendor[] | null> => {
  try {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined) params.append(key, String(value));
    });

    const res = await axios.get<Vendor[]>('/api/vendors?' + params.toString());
    return res.data;
  } catch (err: any) {
    console.error('Error fetching vendors:', err.response?.data || err.message);
    return null;
  }
};
