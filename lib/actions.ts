'use server';

import db from '@/lib/db';
import shortId from 'short-unique-id';

export const createLink = async (full: string, authorId: string | null = null) => {
  try {
    const short = new shortId({ length: 6 }).rnd();
    return await db.link.create({ data: { full, short, authorId } });
  } catch (error) {
    console.error(error);
  }
};

export const getShortLink = async (short: string) => {
  try {
    return await db.link.findUnique({ where: { short } });
  } catch (error) {
    console.error(error);
  }
};

export const getUserLinks = async (userId: string) => {
  try {
    return await db.link.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteLink = async (id: string) => {
  try {
    return await db.link.delete({ where: { id } });
  } catch (error) {
    console.error(error);
  }
};

export const updateVisitCount = async (id: string, newVisitCount: number) => {
  try {
    return await db.link.update({
      where: { id },
      data: { visitCount: newVisitCount }
    });
  } catch (error) {
    console.error(error);
  }
};
