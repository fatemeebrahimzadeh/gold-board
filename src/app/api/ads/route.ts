import { NextResponse } from 'next/server';
import { db } from '@/db';
import { ads } from '../../../../src/db/schema';

export async function GET() {
  try {
    const allAds = await db.select().from(ads);
    return NextResponse.json(allAds);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
  }
}