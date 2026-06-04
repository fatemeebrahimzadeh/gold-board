import { create } from 'zustand'

export interface PriceData {
  gold18k: number
  gold24k: number
  coinEmami: number
  coinBaharan: number
  dollar: number
  euro: number
  lastUpdated: string
}

interface PriceState {
  prices: PriceData
  isConnected: boolean
  setPrices: (newPrices: Partial<PriceData>) => void
  setConnectionStatus: (status: boolean) => void
}

export const usePriceStore = create<PriceState>((set) => ({
  prices: {
    gold18k: 0,
    gold24k: 0,
    coinEmami: 0,
    coinBaharan: 0,
    dollar: 0,
    euro: 0,
    lastUpdated: '',
  },
  isConnected: false,
  
  setPrices: (newPrices) =>
    set((state) => ({
      prices: { ...state.prices, ...newPrices, lastUpdated: new Date().toLocaleTimeString('fa-IR') },
    })),
    
  setConnectionStatus: (status) => set({ isConnected: status }),
}))