// // src/app/api/vendors/route.ts
// import { NextRequest, NextResponse } from 'next/server';
// import { useCreateVendor } from '@/composables/server/useCreateVendor';
// import { useUpdateVendor } from '@/composables/server/useUpdateVendor';
// import { useDeleteVendor } from '@/composables/server/useDeleteVendor';
// import { useVendors } from '@/composables/server/useVendors';
// import { useSearchVendor } from '@/composables/server/useSearchVendor';

// export async function GET(req: NextRequest) {
//   const url = new URL(req.url);
//   const path = url.pathname;
//   const searchParams = Object.fromEntries(url.searchParams.entries());

//   try {
//     if (path.endsWith('/search')) {
//       // /api/vendors/search
//       const data = await useSearchVendor(searchParams);
//       return NextResponse.json(data);
//     } else {
//       // /api/vendors
//       const data = await useVendors(searchParams);
//       return NextResponse.json(data);
//     }
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const data = await useCreateVendor(body);
//     return NextResponse.json(data);
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// export async function PUT(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const data = await useUpdateVendor(body);
//     return NextResponse.json(data);
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }

// export async function DELETE(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const message = await useDeleteVendor(body);
//     return NextResponse.json({ message });
//   } catch (err: any) {
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }



import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    message: '✅ API работает! Привет от сервера Next.js 🚀',
    timestamp: new Date().toISOString(),
  });
}
