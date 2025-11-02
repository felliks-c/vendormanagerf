// composables/client/useSearchVendor.ts
import axios from '@/api/axios';
import { Vendor } from '@/composables/server/types';

interface SearchFilter {
  name?: string;
  limit?: number;
  offset?: number;
}

export const useSearchVendor = async (filter: SearchFilter): Promise<Vendor[] | null> => {
  try {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        params.append(key, String(value));
      }
    });

    const res = await axios.get<Vendor[]>('/api/vendors/search', { params });
    return res.data;
  } catch (err: any) {
    console.error('Error searching vendors:', err.response?.data || err.message);
    return null;
  }
};