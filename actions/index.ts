'use server';

import db from '@/db';
import type { Url } from '@prisma/client';
import shortId from 'short-unique-id';

export const createUrl = async (
  full: string,
  authorId: string | null = null
): Promise<Url> => {
  try {
    const short = new shortId({ length: 6 }).rnd();
    return await db.url.create({ data: { full, short, authorId } });
  } catch (error: any) {
    // Short URL must be unique
    if (error.code === 'P2002') return await createUrl(full, authorId);
    throw new Error(error);
  }
};

export const getUrl = async (short: string) => {
  return await db.url.findFirst({ where: { short } });
};

export const getUserUrls = async (userId: string) => {
  return await db.url.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: 'desc' }
  });
};

export const deleteUrl = async (id: string) => {
  return await db.url.delete({ where: { id } });
};
