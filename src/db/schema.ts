import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const tenants = sqliteTable('tenants', {
  id: text('id').primaryKey(),
  shopName: text('shopName').notNull(),
  slug: text('slug').notNull().unique(),
});

export const ads = sqliteTable('ads', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  mediaUrl: text('mediaUrl').notNull(),
  duration: integer('duration').default(5),
  order: integer('order').default(0),
});