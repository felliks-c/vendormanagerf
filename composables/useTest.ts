// // /home/felix/work/My portfolio/vendormanagerf/composables/useTest.ts
// import axios from "@/api/axios";

// export interface TestItem {
//     id: string | number;
//     name: string;
// }

// export default async function fetchTest(): Promise<TestItem[]> {
//     try {
//         const res = await axios.get<TestItem[]>("/test");
//         return res.data ?? [];
//     } catch {
//         return [];
//     }
// }




import axios from '@/api/axios';

export async function fetchTestStatus() {
  try {
    const response = await axios.get('/test');
    return response.data; // {status: "success"}
  } catch (error) {
    console.error('Error fetching test status:', error);
    return { status: 'error' }; // удобно для UI
  }
}
