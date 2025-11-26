import { NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

export async function GET() {
  const events = storage.getAllEvents();
  return NextResponse.json(events);
}
