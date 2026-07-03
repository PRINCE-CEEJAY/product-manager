import { integer, pgTable, varchar, real } from "drizzle-orm/pg-core";

export const productTable = pgTable("productTable", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 255 }).notNull(),
  image: varchar({length: 255}).notNull(),
  price: real().notNull(),
  category: varchar({length: 40}).notNull()
});
