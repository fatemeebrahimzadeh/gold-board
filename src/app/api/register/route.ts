import { db } from '@/db';
import { tenants } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { shopName, slug } = await req.json();
  
  await db.insert(tenants).values({
    id: crypto.randomUUID(),
    shopName,
    slug,
  });

  return NextResponse.json({ success: true });
}