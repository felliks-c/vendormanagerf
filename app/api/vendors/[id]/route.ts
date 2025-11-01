// src/app/api/vendors/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { useUpdateVendor } from '@/composables/server/useUpdateVendor';
import { useDeleteVendor } from '@/composables/server/useDeleteVendor';
import { useVendors } from '@/composables/server/useVendors'; // будем использовать для получения одного

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await useVendors({ id: params.id });
    return NextResponse.json(data?.[0] ?? null);
  } catch (err: any) {
    console.error('Error getting vendor:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const data = await useUpdateVendor({ id: params.id, ...body });
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('Error updating vendor:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const message = await useDeleteVendor({ id: params.id });
    return NextResponse.json({ message });
  } catch (err: any) {
    console.error('Error deleting vendor:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
