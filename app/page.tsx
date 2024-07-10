import CreateLinkForm from "@/components/CreateLinkForm"

const HomePage = () => {
  return (
    <>
      <h1 className="mt-10 mb-8 text-center font-bold text-4xl sm:text-5xl">
        Shorten links <span className="text-primary">rapidly.</span>
      </h1>

      <CreateLinkForm />
    </>
  )
}

export default HomePage
