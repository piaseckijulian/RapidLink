import { getShortLink, linkVisit } from '@/lib/actions';
import { redirect } from 'next/navigation';

interface Props {
  params: { short: string };
}

const ShortRedirect = async ({ params: { short } }: Props) => {
  const link = await getShortLink(short);
  if (!link) redirect('/');

  await linkVisit({
    id: link.id,
    visitCount: link.visitCount + 1,
    lastVisitedAt: new Date()
  });

  redirect(link.full);
};

export default ShortRedirect;
