// src/app/api/vendors/search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { useSearchVendor } from '@/composables/server/useSearchVendor';

export async function GET(req: NextRequest) {
  const searchParams = Object.fromEntries(new URL(req.url).searchParams.entries());
  try {
    const data = await useSearchVendor(searchParams);
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('Error searching vendors:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
