import { getUrl } from '@/lib/actions';
import { redirect } from 'next/navigation';

interface Props {
  params: { short: string };
}

const Page = async ({ params: { short } }: Props) => {
  const url = await getUrl(short);
  if (!url) redirect('/');

  redirect(url.full);
};

export default Page;
