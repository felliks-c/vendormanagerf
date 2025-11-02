// src/app/api/vendors/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { useUpdateVendor } from '@/composables/server/useUpdateVendor';
import { useDeleteVendor } from '@/composables/server/useDeleteVendor';
import { useVendors } from '@/composables/server/useVendors';

// ВНИМАНИЕ: params теперь Promise!
type Context = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, context: Context) {
    const params = await context.params;
    const id = Number(params.id);
    try {
        const { id } = await context.params; // await!
        const numId = Number(id);
        if (Number.isNaN(numId)) {
            return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
        }
        const data = await useVendors({ id: numId });
        return NextResponse.json(data?.[0] ?? null);
    } catch (err: any) {
        console.error('Error getting vendor:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PUT(req: NextRequest, context: Context) {
    const params = await context.params;
    const id = Number(params.id);
    const body = await req.json();

    try {
        const { id } = await context.params; // await!
        const body = await req.json();
        const data = await useUpdateVendor({ id, ...body });
        return NextResponse.json(data);
    } catch (err: any) {
        console.error('Error updating vendor:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const result = await useDeleteVendor({ id });
    if (result) {
      return NextResponse.json({ message: result });
    } else {
      return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
    }
  } catch (err: any) {
    console.error('API route error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}