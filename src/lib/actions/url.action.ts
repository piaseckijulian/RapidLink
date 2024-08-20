"use server"

import db from "@/lib/db"
import { currentUser } from "@clerk/nextjs/server"
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
  if (userId) {
    const user = await currentUser()

    if (userId !== user?.id) {
      throw new Error("Unauthorized")
    }
  }

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
  const user = await currentUser()

  if (!user) throw new Error("Unauthorized")

  try {
    const url = await db.url.delete({ where: { id } })

    revalidatePath("/urls")

    return url
  } catch (error) {
    console.error(error)
  }
}

export const onUrlVisit = async (id: string, visitCount: number) => {
  try {
    return await db.url.update({
      where: { id },
      data: { visitCount },
    })
  } catch (error) {
    console.error(error)
  }
}
