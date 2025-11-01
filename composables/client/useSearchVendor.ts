// composables/client/useVendorSearch.ts
import axios from 'axios';
import { Vendor, VendorSearchFilter } from '@/composables/server/types';

export const useSearchVendor = async (filter: VendorSearchFilter): Promise<Vendor[] | null> => {
  try {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const res = await axios.get<Vendor[]>('/api/vendors/search?' + params.toString());
    return res.data;
  } catch (err: any) {
    console.error('Error searching vendors:', err.response?.data || err.message);
    return null;
  }
};
