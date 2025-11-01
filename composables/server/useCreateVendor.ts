// // composables/useCreateVendor.ts
// import axios from 'axios';
// import { Vendor, VendorCreateInput } from './types';
// import instance from '@/api/axios';

// export const useCreateVendor = async (data: VendorCreateInput): Promise<Vendor | null> => {
//   try {
//     const res = await axios.post<Vendor>(`${instance}/vendors/`, data);
//     return res.data;
//   } catch (error: any) {
//     console.error('Error creating vendor:', error.response?.data || error.message);
//     return null;
//   }
// };




// composables/server/useCreateVendor.ts
import { Vendor, VendorCreateInput } from './types';
import instance from '@/api/axios';

export const useCreateVendor = async (
  data: VendorCreateInput
): Promise<Vendor | null> => {
  try {
    // просто вызываем instance.post, он сам подставит baseURL из настроек
    const res = await instance.post<Vendor>('/vendors/', data);
    return res.data;
  } catch (error: any) {
    console.error('Error creating vendor:', error.response?.data || error.message);
    return null;
  }
};
