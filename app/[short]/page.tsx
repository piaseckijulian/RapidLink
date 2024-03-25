import { getShortLink, updateVisitCount } from '@/lib/actions';
import { redirect } from 'next/navigation';

interface Props {
  params: { short: string };
}

const ShortRedirect = async ({ params: { short } }: Props) => {
  const link = await getShortLink(short);
  if (!link) redirect('/');

  await updateVisitCount(link.id, link.visitCount + 1);

  redirect(link.full);
};

export default ShortRedirect;
