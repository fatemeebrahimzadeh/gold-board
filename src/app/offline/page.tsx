export default function OfflinePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 px-6 text-white">
      <div className="max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-6 text-center shadow-xl">
        <h1 className="text-2xl font-black">آفلاین هستید</h1>
        <p className="mt-3 text-sm text-gray-300">
          اتصال اینترنت قطع شده و داده‌ی کش‌شده‌ای برای نمایش در دسترس نیست.
        </p>
        <p className="mt-2 text-xs text-gray-500">
          وقتی دوباره آنلاین شوید، برنامه قیمت‌ها را از سرور به‌روزرسانی می‌کند.
        </p>
      </div>
    </div>
  )
}
