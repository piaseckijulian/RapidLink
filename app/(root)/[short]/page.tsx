import { getURL } from '@/actions';
import { redirect } from 'next/navigation';

interface Props {
  params: { short: string };
}

const UrlPage = async ({ params: { short } }: Props) => {
  const url = await getURL(short);
  if (!url) redirect('/');

  redirect(url.full);
};

export default UrlPage;
