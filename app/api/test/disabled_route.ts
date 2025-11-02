import { NextResponse } from 'next/server';
import { useTestStatus } from '@/composables/server/useTest';

export async function GET() {
    if (process.env.NODE_ENV !== 'development') {
        return new NextResponse(null, { status: 404 });
    }

    const response = await useTestStatus();
    return NextResponse.json(response);
    // return NextResponse.json({ message: 'API работает!' });
}
