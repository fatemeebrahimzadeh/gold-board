import { db } from './src/db';
import { ads } from './src/db/schema';
import { randomUUID } from 'crypto';

async function seedAds() {
  const sampleAds = [
    {
      id: randomUUID(),
      tenantId: '74719e42-ebac-44bc-b892-5100b07503b2', // حتما با ID مغازه‌ات جایگزین کن
      title: 'تبلیغ اول',
      mediaUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb744033?w=800',
      duration: 5,
      order: 1,
    },
    {
      id: randomUUID(),
      tenantId: 'a01f6de9-cdf0-4241-b59f-0588729357c8',
      title: 'تبلیغ دوم',
      mediaUrl: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?w=800',
      duration: 7,
      order: 2,
    }
  ];

  await db.insert(ads).values(sampleAds);
  console.log("تبلیغات تستی با موفقیت اضافه شدند!");
}

seedAds();