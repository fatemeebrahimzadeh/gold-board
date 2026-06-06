import { create } from 'zustand'
import { PriceData } from '@/types/price'

const PRICE_CACHE_KEY = 'gold-board-price-cache'

function loadCachedPrices(): PriceData | null {
  if (typeof window === 'undefined') return null

  try {
    const cachedValue = window.localStorage.getItem(PRICE_CACHE_KEY)
    if (!cachedValue) return null
    return JSON.parse(cachedValue) as PriceData
  } catch {
    return null
  }
}

function saveCachedPrices(prices: PriceData): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(PRICE_CACHE_KEY, JSON.stringify(prices))
  } catch {
    // Ignore storage quota and privacy mode errors.
  }
}

interface PriceState {
  prices: PriceData
  isLoading: boolean
  isConnected: boolean
  error: string | null 
  eventSource: EventSource | null 
  setPrices: (newPrices: Partial<PriceData>) => void
  setConnectionStatus: (status: boolean) => void
  connectToStream: () => void 
  disconnectStream: () => void
}

const defaultPrices: PriceData = {
    gold18k: 0,
    gold24k: 0,
    coinEmami: 0,
    coinBaharan: 0,
    dollar: 0,
    euro: 0,
    lastUpdated: '',
}

const initialPrices = loadCachedPrices() || defaultPrices

export const usePriceStore = create<PriceState>((set, get) => ({
  prices: initialPrices,
  isLoading: true, 
  isConnected: false,
  error: null,
  eventSource: null,
  
  setPrices: (newPrices) =>
    set((state) => {
      const nextPrices = {
        ...state.prices,
        ...newPrices,
        lastUpdated: new Date().toLocaleTimeString('fa-IR'),
      }

      saveCachedPrices(nextPrices)

      return { prices: nextPrices }
    }),
    
  setConnectionStatus: (status) => set({ isConnected: status }),

  // ============================================================================
  // SSE STREAM MANAGEMENT
  // ============================================================================
  connectToStream: () => {
    if (get().eventSource) return

    const source = new EventSource(`${window.location.origin}/api/prices`)

    source.onmessage = (event: MessageEvent) => {
      try {
        const freshPrices = JSON.parse(event.data) as Partial<PriceData>
        const currentPrices = get().prices
        const nextPrices = {
          ...currentPrices,
          ...freshPrices,
        }

        saveCachedPrices({
          ...nextPrices,
          lastUpdated: nextPrices.lastUpdated || new Date().toLocaleTimeString('fa-IR'),
        })

        set(() => ({
          prices: {
            ...nextPrices,
            lastUpdated: nextPrices.lastUpdated || new Date().toLocaleTimeString('fa-IR'),
          },
          isLoading: false,
          isConnected: true,
          error: null,
        }))
      } catch (err) {
        console.error('Error parsing stream data in Zustand:', err)
      }
    }

    source.onerror = (err: Event) => {
      console.error('SSE connection error in Zustand:', err)
      const cachedPrices = loadCachedPrices()
      set({ 
        isConnected: false, 
        isLoading: false,
        prices: cachedPrices || get().prices,
        error: cachedPrices
          ? 'آفلاین هستید. داده‌های کش‌شده نمایش داده می‌شوند.'
          : 'خطا در دریافت زنده قیمت‌ها. داده‌ای برای نمایش آفلاین نداریم.' 
      })
    }

    set({ eventSource: source })
  },

  disconnectStream: () => {
    const source = get().eventSource
    if (source) {
      source.close() // بستن لوله برای جلوگیری از نشتی حافظه سرور و مرورگر
      set({ eventSource: null, isConnected: false })
    }
  },
}))
