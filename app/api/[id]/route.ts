// app/api/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { useUpdateVendor } from '@/composables/server/useUpdateVendor';
import { useDeleteVendor } from '@/composables/server/useDeleteVendor';
import { useVendors } from '@/composables/server/useVendors';

export const runtime = 'nodejs'; // ← важно для Vercel

type Context = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, context: Context) {
  try {
    const params = await context.params; // ← ТОЛЬКО ОДИН РАЗ!
    const id = Number(params.id);

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const data = await useVendors({ id });
    return NextResponse.json(data?.[0] ?? null);
  } catch (err: any) {
    console.error('GET vendor error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, context: Context) {
  try {
    const params = await context.params; // ← ТОЛЬКО ОДИН РАЗ!
    const id = Number(params.id);
    const body = await req.json();

    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const data = await useUpdateVendor({ id, ...body });
    return NextResponse.json(data);
  } catch (err: any) {
    console.error('PUT vendor error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: Context) {
  try {
    const params = await context.params; // ← ТОЛЬКО ОДИН РАЗ!
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
    console.error('DELETE vendor error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}