'use server';

import prisma from '@/prisma/client';
import { URL } from '@/types';
import shortId from 'short-unique-id';

export const createURL = async (
  full: string,
  authorId: string | null = null
): Promise<URL> => {
  try {
    const short = new shortId({ length: 6 }).rnd();
    return await prisma.url.create({ data: { full, short, authorId } });
  } catch (error: any) {
    // Short URL must be unique
    if (error.code === 'P2002') return await createURL(full, authorId);
    throw new Error(error);
  }
};

export const getURL = async (short: string) => {
  return await prisma.url.findFirst({ where: { short } });
};

export const getUsersURLs = async (userId: string) => {
  return await prisma.url.findMany({
    where: { authorId: userId },
    orderBy: { createdAt: 'desc' }
  });
};

export const deleteURL = async (id: string) => {
  return await prisma.url.delete({ where: { id } });
};
