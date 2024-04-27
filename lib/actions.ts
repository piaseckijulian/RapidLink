'use server';

import db from '@/lib/db';
import { nanoid } from 'nanoid';
import { revalidatePath } from 'next/cache';

export const createLink = async (
  full: string,
  userId: string | null = null
) => {
  try {
    const short = nanoid(6);
    const link = await db.link.create({ data: { full, short, userId } });

    revalidatePath('/links');

    return link;
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
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteLink = async (id: string) => {
  try {
    const link = await db.link.delete({ where: { id } });

    revalidatePath('/links');

    return link;
  } catch (error) {
    console.error(error);
  }
};

interface LinkVisitParams {
  id: string;
  visitCount: number;
  lastVisitedAt: Date;
}

export const linkVisit = async ({
  id,
  lastVisitedAt,
  visitCount
}: LinkVisitParams) => {
  try {
    return await db.link.update({
      where: { id },
      data: { visitCount, lastVisitedAt }
    });
  } catch (error) {
    console.error(error);
  }
};
