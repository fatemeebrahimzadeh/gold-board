const ADS_CACHE_KEY = 'gold-board-ads-cache'

type CachedAds = unknown[]

function loadCachedAds(): CachedAds | null {
  if (typeof window === 'undefined') return null

  try {
    const cachedValue = window.localStorage.getItem(ADS_CACHE_KEY)
    if (!cachedValue) return null
    return JSON.parse(cachedValue) as CachedAds
  } catch {
    return null
  }
}

function saveCachedAds(ads: CachedAds): void {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(ADS_CACHE_KEY, JSON.stringify(ads))
  } catch {
    // Ignore storage quota and privacy mode errors.
  }
}

export async function fetchAds() {
  try {
    const response = await fetch('/api/ads')

    if (!response.ok) {
      throw new Error('مشکلی در دریافت تبلیغات پیش آمد')
    }

    const ads = await response.json()
    saveCachedAds(ads)
    return ads
  } catch (error) {
    const cachedAds = loadCachedAds()
    if (cachedAds) return cachedAds
    throw error
  }
}
