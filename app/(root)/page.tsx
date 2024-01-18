import { getUsersURLs } from '@/actions';
import Form from '@/components/Form';
import UrlTable from '@/components/UrlTable';
import { currentUser } from '@clerk/nextjs';

const Home = async () => {
  const user = await currentUser();
  const urls = await getUsersURLs(user?.id || '');

  return (
    <>
      <h1 className="mb-6 mt-10 text-center text-4xl font-bold text-white sm:text-[46px]">
        Cut your URLs <span className="text-blue-500">Rapidly</span>
      </h1>

      <Form />

      {user && (
        <div className="mt-10">
          {urls.length ? (
            <UrlTable urls={urls} />
          ) : (
            <p className="text-center text-3xl font-semibold text-white">
              You don&apos;t have any URLs
            </p>
          )}
        </div>
      )}
    </>
  );
};

export default Home;
