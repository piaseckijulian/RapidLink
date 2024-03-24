import UrlTable from '@/components/UrlTable';
import { getUserUrls } from '@/lib/actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const Page = async () => {
  const user = await currentUser();
  if (!user) redirect('/');

  const urls = await getUserUrls(user.id);

  return (
    <>
      <h1 className="mb-8 mt-10 text-center text-4xl font-bold sm:text-5xl">
        Your links
      </h1>

      <UrlTable urls={urls || []} />
    </>
  );
};

export default Page;
