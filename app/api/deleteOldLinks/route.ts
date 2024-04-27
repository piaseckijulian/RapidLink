import db from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
  if (
    req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return Response.json('Unauthorized', { status: 401 });
  }

  try {
    /*
      Delete every link that:
        - hasn't got an author and hasn't been visited for more than 3 months
    */

    await db.link.deleteMany({
      where: {
        userId: null,
        OR: [
          { lastVisitedAt: null },
          {
            lastVisitedAt: {
              lt: new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000)
            }
          }
        ]
      }
    });

    return Response.json('Successfully deleted old links', { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json('Something went wrong', { status: 500 });
  }
};
