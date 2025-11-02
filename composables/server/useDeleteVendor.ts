// // composables/useDeleteVendor.ts
// import axios from '@/api/axios';
// import { VendorDeleteInput } from './types';

// export const useDeleteVendor = async (data: VendorDeleteInput): Promise<string | null> => {
//   try {
//     const res = await axios.delete<{ message: string }>('/vendors/', { data });
//     return res.data.message;
//   } catch (error: any) {
//     console.error('Error deleting vendor:', error.response?.data || error.message);
//     return null;
//   }
// };







// composables/server/useDeleteVendor.ts
import axios from '@/api/axios';
import { VendorDeleteInput } from './types';

export const useDeleteVendor = async (input: VendorDeleteInput): Promise<string | null> => {
  try {
    // FastAPI: DELETE /vendors/ + body
    const res = await axios.delete<{ message: string }>('/vendors/', {
      data: input, // ← body: { id: 4 }
    });
    return res.data.message;
  } catch (error: any) {
    console.error('Server: Delete failed:', error.response?.data || error.message);
    return null;
  }
};