import { create } from 'zustand'
import { PriceData } from '@/types/price'

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

export const usePriceStore = create<PriceState>((set, get) => ({
  prices: {
    gold18k: 0,
    gold24k: 0,
    coinEmami: 0,
    coinBaharan: 0,
    dollar: 0,
    euro: 0,
    lastUpdated: '',
  },
  isLoading: true, 
  isConnected: false,
  error: null,
  eventSource: null,
  
  setPrices: (newPrices) =>
    set((state) => ({
      prices: { ...state.prices, ...newPrices, lastUpdated: new Date().toLocaleTimeString('fa-IR') },
    })),
    
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
        
        set((state) => ({
          prices: { 
            ...state.prices, 
            ...freshPrices 
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
      set({ 
        isConnected: false, 
        error: 'خطا در دریافت زنده قیمت‌ها. در حال تلاش برای اتصال مجدد...' 
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