import LinksTable from '@/components/LinksTable';
import { getUserLinks } from '@/lib/actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

const LinksPage = async () => {
  const user = await currentUser();
  if (!user) redirect('/');

  const links = await getUserLinks(user.id);

  return (
    <>
      <h1 className="mb-8 mt-10 text-center text-4xl font-bold sm:text-5xl">
        Your links
      </h1>

      <LinksTable links={links!} />
    </>
  );
};

export default LinksPage;
