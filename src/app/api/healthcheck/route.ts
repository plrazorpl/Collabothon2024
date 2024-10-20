import { NextResponse, NextRequest } from 'next/server';

// Define GET request handler
export async function GET() {
  return NextResponse.json({ message: 'Hello, Next.js API with App Router!' });
}


export async function POST(request: NextRequest) {
    const body = await request.json();
    return NextResponse.json({ message: `Hello, ${body.name}!` });
  }