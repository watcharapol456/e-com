import { pgTable, serial, text, integer, varchar } from 'drizzle-orm/pg-core';
import { number } from 'zod';

export const stockInventory = pgTable('stock_inventory', {
  id: serial('id').primaryKey(),
  imgURL: text('imgURL'),
  labelName: varchar('label_name', { length: 255 }).notNull(),
  labelPrice: integer('label_price').notNull(),
  properties: text('properties'),
  stock: integer('stock').notNull(),
});
