"use server"

import { db } from "@/db"
import { urls } from "@/db/schema"
import { currentUser } from "@clerk/nextjs/server"
import { desc, eq } from "drizzle-orm"
import { nanoid } from "nanoid"
import { revalidatePath } from "next/cache"

export const createUrl = async (
  fullUrl: string,
  userId: string | null = null,
) => {
  if (userId) {
    const user = await currentUser()

    if (userId !== user?.id) {
      throw new Error("Unauthorized")
    }
  }

  try {
    const shortUrl = nanoid(6)
    await db.insert(urls).values({ fullUrl, shortUrl, userId })

    revalidatePath("/urls")

    return { shortUrl }
  } catch (error) {
    console.error(error)
  }
}

export const getShortUrl = async (shortUrl: string) => {
  try {
    return await db.query.urls.findFirst({
      where: eq(urls.shortUrl, shortUrl),
    })
  } catch (error) {
    console.error(error)
  }
}

export const getUserUrls = async (userId: string) => {
  if (userId) {
    const user = await currentUser()

    if (userId !== user?.id) {
      throw new Error("Unauthorized")
    }
  }

  try {
    return await db
      .select()
      .from(urls)
      .where(eq(urls.userId, userId))
      .orderBy(desc(urls.createdAt))
  } catch (error) {
    console.error(error)
  }
}

export const deleteUrl = async (id: number) => {
  const user = await currentUser()

  if (!user) throw new Error("Unauthorized")

  try {
    await db.delete(urls).where(eq(urls.id, id))

    revalidatePath("/urls")
  } catch (error) {
    console.error(error)
  }
}

export const onUrlVisit = async (id: number, visitCount: number) => {
  try {
    await db.update(urls).set({ visitCount }).where(eq(urls.id, id))
  } catch (error) {
    console.error(error)
  }
}
