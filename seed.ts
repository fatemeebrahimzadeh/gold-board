// seed.ts
import { db } from './src/db';
import { tenants } from './src/db/schema';

async function seed() {
  await db.insert(tenants).values([
    { id: crypto.randomUUID(), shopName: 'طلا و جواهر کوروش', slug: 'kourosh-gold' },
    { id: crypto.randomUUID(), shopName: 'طلا و جواهر پارسیان', slug: 'parsian-gold' },
  ]);
  console.log("دیتا با موفقیت اضافه شد!");
}

seed();