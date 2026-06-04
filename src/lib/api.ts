export async function fetchAds() {
  const response = await fetch('/api/ads');
  
  if (!response.ok) {
    throw new Error('مشکلی در دریافت تبلیغات پیش آمد');
  }
  
  return response.json();
}