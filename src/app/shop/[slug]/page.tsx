// src/app/shop/[slug]/page.tsx
import { db } from '@/db';
import { tenants } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ShopPage({ params }: PageProps) {
  const { slug } = await params;

  const shop = await db
    .select()
    .from(tenants)
    .where(eq(tenants.slug, slug))
    .get();

  if (!shop) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-slate-950 text-white font-sans">
      <h1 className="text-8xl font-black mb-6 tracking-tighter text-yellow-400">
        {shop.shopName}
      </h1>
      <p className="text-2xl text-slate-400">
        خوش آمدید - تابلو اختصاصی
      </p>
    </div>
  );
}