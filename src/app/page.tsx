'use client'

import { useEffect, useState } from 'react'
import { usePriceStore } from '@/store/usePriceStore'

import OfflineIndicator from '@/components/OfflineIndicator';

export default function Home() {
  const { prices, isLoading, error, connectToStream, disconnectStream } = usePriceStore()
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  )

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    connectToStream()
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      disconnectStream()
    }
  }, [connectToStream, disconnectStream])

  const isReallyLoading = isLoading && prices.lastUpdated === '';

  if (isReallyLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="text-xl font-bold animate-pulse">در حال اتصال به بازار زنده...</div>
      </div>
    )
  }

  return (
    <div className="p-8 bg-gray-950 text-white min-h-screen">
      <OfflineIndicator />
      {!isOnline && prices.lastUpdated && (
        <div className="mb-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          Offline mode: showing cached data from {prices.lastUpdated}.
        </div>
      )}
      {!isOnline && error && !prices.lastUpdated && (
        <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </div>
      )}
      <h1 className="text-xl font-bold mb-4">بورد لحظه‌ای قیمت‌ها</h1>
      <div className="p-4 bg-gray-900 rounded-lg max-w-sm">
        <p className="text-gray-400">قیمت تتر (دلار فیک نوسانی):</p>
        <p className="text-2xl font-black text-green-400 mt-1">
          {prices.dollar.toLocaleString('fa-IR')} تومان
        </p>
        <p className="text-xs text-gray-500 mt-3">آخرین آپدیت: {prices.lastUpdated}</p>
      </div>
    </div>
  )
}
