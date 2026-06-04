import { NextResponse } from 'next/server'
import { PriceData } from '@/types/price'

// ============================================================================
// LAYER 2 CACHE (Route Level): Server-to-Client
// 'force-dynamic' ensures Next.js doesn't freeze/statically optimize this route during build.
// ============================================================================
export const dynamic = 'force-dynamic'

const API_URL: string | undefined = process.env.PRICE_PROVIDER_URL
const API_KEY: string | undefined = process.env.TGJU_API_KEY

interface CoinGeckoResponse {
  tether?: {
    usd?: number
  }
}

async function getFreshPrices(): Promise<PriceData | null> {
  if (!API_URL || !API_KEY) return null

  try {
    // ==========================================
    // ARCHITECTURAL DECISION: Why native fetch instead of Axios here?
    // 1. Next.js extends native fetch to provide out-of-the-box server-side caching & revalidation controls.
    // 2. Native fetch is fully compatible with Edge Runtime and Serverless environments.
    // ==========================================
    // const response: Response = await fetch(API_URL, {
    //   headers: {
    //     'Authorization': `Bearer ${API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   // LAYER 1 CACHE (Fetch Level): Server-to-Provider
    //   cache: 'no-store',
    // })

    // if (!response.ok) return null
    // const rawData = (await response.json()) as CoinGeckoResponse

        const mockDollar = Math.floor(60000 + Math.random() * 1000);

    return {
      gold18k: 0, 
      gold24k: 0,
      coinEmami: 0, 
      coinBaharan: 0,
      // dollar: Number(rawData.tether?.usd || 0), 
      dollar: mockDollar,
      euro: 0,
      lastUpdated: new Date().toLocaleTimeString('fa-IR'),
    }
  } catch (error: unknown) {
    console.error('Error fetching fresh inside stream:', error)
    return null
  }
}

export async function GET(): Promise<NextResponse> {
  const encoder: TextEncoder = new TextEncoder()

  const stream: ReadableStream<Uint8Array> = new ReadableStream<Uint8Array>({
    async start(controller: ReadableStreamDefaultController<Uint8Array>): Promise<void> {
      
      const initialPrices: PriceData | null = await getFreshPrices()
      if (initialPrices) {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(initialPrices)}\n\n`))
      }

      const intervalId: NodeJS.Timeout = setInterval(async (): Promise<void> => {
        const freshPrices: PriceData | null = await getFreshPrices()
        if (freshPrices) {
          try {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(freshPrices)}\n\n`))
          } catch (err: unknown) {
            console.error('Stream enqueue error, client likely closed tab:', err)
            clearInterval(intervalId)
            controller.close()
          }
        }
      }, 3000)

      controller.close = (): void => {
        clearInterval(intervalId)
      }
    }
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache, no-transform',
      'Connection': 'keep-alive',
    },
  })
}