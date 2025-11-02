// app/api/vendors/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { useCreateVendor } from '@/composables/server/useCreateVendor';
import { useVendors } from '@/composables/server/useVendors';



export async function GET(req: NextRequest) {
  const searchParams = Object.fromEntries(new URL(req.url).searchParams.entries());
  try {
    const data = await useVendors(searchParams);
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = await useCreateVendor(body);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('Error creating vendor:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
