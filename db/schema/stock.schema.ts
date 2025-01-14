import { pgTable, serial, text, integer, varchar } from 'drizzle-orm/pg-core';

export const stockInventory = pgTable('stock_inventory', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 255 }).notNull(),
  imgURL: text('imgURL'),
  labelName: varchar('label_name', { length: 255 }).notNull(),
  labelPrice: integer('label_price').notNull(),
  features: text('features'),
  ingredients: text('ingredients'),
  properties: text('properties'),
  usage: text('usage'),
  registrationNumber: text('registration_number'),
  brand: varchar('brand', { length: 255 }),
  benefits: text('benefits'),
  warnings: text('warnings'),
  quantity : text ('quantity'),
});
