import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const backendUrl = `${process.env.BACKEND_URL}/api/users${request.nextUrl.search}`;
    const headers = new Headers();
    const cookie = request.headers.get('cookie');
    if (cookie) {
        headers.set('cookie', cookie);
    }
    try {
        const backendResponse = await fetch(backendUrl, {
            method: "GET",
            headers,
            cache: 'no-store',
        });
        if (!backendResponse) {
            return new NextResponse(null, { status: 404 });
        }

        const data = await backendResponse.json();
        return NextResponse.json(data, { status: backendResponse.status });
    } catch (error) {
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}