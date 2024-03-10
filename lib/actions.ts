'use server';

import db from '@/lib/db';
import shortId from 'short-unique-id';

export const createUrl = async (full: string, authorId: string | null = null) => {
  try {
    const short = new shortId({ length: 6 }).rnd();
    return await db.url.create({ data: { full, short, authorId } });
  } catch (error) {
    console.error(error);
  }
};

export const getUrl = async (short: string) => {
  try {
    return await db.url.findUnique({ where: { short } });
  } catch (error) {
    console.error(error);
  }
};

export const getUserUrls = async (userId: string) => {
  try {
    return await db.url.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUrl = async (id: string) => {
  try {
    return await db.url.delete({ where: { id } });
  } catch (error) {
    console.error(error);
  }
};
