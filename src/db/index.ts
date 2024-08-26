import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import "dotenv/config"
import * as schema from "./schema"

const sql = neon(process.env.DATABASE_URL || "")

export const db = drizzle(sql, { schema })
