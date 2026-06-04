import { sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const tenants = sqliteTable('tenants', {
  id: text('id').primaryKey(),
  slug: text('slug').unique().notNull(), // شناسه یکتا برای URL
  shopName: text('shopName').notNull(),  // نام نمایشی
});