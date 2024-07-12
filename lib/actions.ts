"use server"

import db from "@/lib/db"
import { nanoid } from "nanoid"
import { revalidatePath } from "next/cache"

export const createUrl = async (
  fullUrl: string,
  userId: string | null = null,
) => {
  try {
    const shortUrl = nanoid(6)
    const url = await db.url.create({ data: { fullUrl, shortUrl, userId } })

    revalidatePath("/urls")

    return url
  } catch (error) {
    console.error(error)
  }
}

export const getShortUrl = async (shortUrl: string) => {
  try {
    return await db.url.findUnique({ where: { shortUrl } })
  } catch (error) {
    console.error(error)
  }
}

export const getUserUrls = async (userId: string) => {
  try {
    return await db.url.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    })
  } catch (error) {
    console.error(error)
  }
}

export const deleteUrl = async (id: string) => {
  try {
    const url = await db.url.delete({ where: { id } })

    revalidatePath("/urls")

    return url
  } catch (error) {
    console.error(error)
  }
}

type OnUrlVisitParams = {
  id: string
  visitCount: number
  lastVisitedAt: Date
}

export const onUrlVisit = async ({
  id,
  lastVisitedAt,
  visitCount,
}: OnUrlVisitParams) => {
  try {
    return await db.url.update({
      where: { id },
      data: { visitCount, lastVisitedAt },
    })
  } catch (error) {
    console.error(error)
  }
}
