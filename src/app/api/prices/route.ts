import { NextResponse } from 'next/server'

// ============================================================================
// LAYER 2 CACHE (Route Level): Server-to-Client
// 'force-dynamic' ensures Next.js doesn't freeze/statically optimize this route during build.
// Every time a user hits this API, the server wakes up and completely re-runs this GET function.
// ============================================================================
export const dynamic = 'force-dynamic'

const API_URL = process.env.PRICE_PROVIDER_URL
const API_KEY = process.env.TGJU_API_KEY

export async function GET() {
  if (!API_URL || !API_KEY) {
    return NextResponse.json(
      { error: 'Server configuration missing' },
      { status: 500 }
    )
  }

  try {
    // ==========================================
    // ARCHITECTURAL DECISION: Why native fetch instead of Axios here?
    // 1. Next.js extends native fetch to provide out-of-the-box server-side 
    //    caching & revalidation controls (e.g., cache: 'no-store' for live prices).
    // 2. Native fetch is fully compatible with Edge Runtime and Serverless environments,
    //    avoiding Axios's Node.js dependency overhead and reducing cold start times.
    // 3. Keeps the server bundle lightweight without unnecessary third-party abstractions.
    // ==========================================
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      // ============================================================================
      // LAYER 1 CACHE (Fetch Level): Server-to-Provider
      // 'no-store' bypasses the Next.js Data Cache, forcing our server to fetch 
      // fresh data from the third-party API instead of reusing a cached response.
      //
      // SUMMARY OF BOTH LAYERS:
      // - 'cache: no-store' guarantees our server gets fresh data from the provider.
      // - 'force-dynamic' guarantees the client gets fresh execution from our server.
      // ============================================================================
      cache: 'no-store',
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch prices from provider' },
        { status: response.status }
      )
    }

    const rawData = await response.json()

    // ⚠️ TODO: CURRENTLY USING MOCK MAPPING (COINGECKO TETHER AS USD)
    // When switching to the real Gold API (e.g., TGJU), remap this object 
    // to match the real provider's JSON structure (e.g., rawData.gold_18k.value)
    const normalizedPrices = {
      gold18k: 0,
      coinEmami: 0,
      dollar: Number(rawData.tether?.usd || 0),
      lastUpdated: new Date().toLocaleTimeString('fa-IR'),
    }

    return NextResponse.json(normalizedPrices)

  } catch (error) {
    console.error('API Route Error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}