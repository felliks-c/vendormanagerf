// composables/useVendorSearch.ts
import axios from 'axios';
import { Vendor, VendorSearchFilter } from './types';

export const useVendorSearch = async (filter: VendorSearchFilter): Promise<Vendor[] | null> => {
  try {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    const res = await axios.get<Vendor[]>('/vendors/search', { params });
    return res.data;
  } catch (error: any) {
    console.error('Error searching vendors:', error.response?.data || error.message);
    return null;
  }
};
