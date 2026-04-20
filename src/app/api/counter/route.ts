import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.counterapi.dev/v1/legal-check-calculators-shri/visitor-count/up', {
      cache: 'no-store',
    });
    
    if (!response.ok) throw new Error('CounterAPI failed');
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Counter Proxy Error:', error);
    // Fallback value so the UI doesn't break
    return NextResponse.json({ count: 4215 });
  }
}
