import CreateUrlForm from '@/components/CreateUrlForm';

const Home = () => {
  return (
    <>
      <h1 className="mb-8 mt-10 text-center text-4xl font-bold sm:text-5xl">
        Shorten links <span className="text-primary">rapidly.</span>
      </h1>

      <CreateUrlForm />
    </>
  );
};

export default Home;
