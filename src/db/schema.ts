import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const urls = pgTable("urls", {
  id: serial("id").primaryKey(),
  shortUrl: text("short_url").notNull().unique(),
  fullUrl: text("full_url").notNull(),
  userId: text("user_id"),
  visitCount: integer("visit_count").default(0).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at")
    .notNull()
    .$onUpdate(() => new Date()),
})

export type InsertUrl = typeof urls.$inferInsert
export type SelectUrl = typeof urls.$inferSelect
