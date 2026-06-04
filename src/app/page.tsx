'use client'

import { useEffect } from 'react'
import { usePriceStore } from '@/store/usePriceStore'

export default function Home() {
  const { prices, isLoading, connectToStream, disconnectStream } = usePriceStore()

  useEffect(() => {
    connectToStream()
    
    return () => {
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