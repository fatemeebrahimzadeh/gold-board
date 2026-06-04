import { db } from '@/db';
import { tenants, ads } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

import AdCarousel from '@/components/AdCarousel';

export default async function ShopPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const [shop] = await db.select().from(tenants).where(eq(tenants.slug, slug));
  if (!shop) notFound();

  const initialAds = await db.select().from(ads);

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-8">{shop.shopName}</h1>
      <p className="text-2xl text-slate-400">
        خوش آمدید - تابلو اختصاصی
      </p>
      {initialAds.length > 0 ? (
        <AdCarousel serverAds={initialAds} />
      ) : (
        <p>تبلیغی موجود نیست.</p>
      )}
    </div>
  );
}