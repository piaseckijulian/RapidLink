import { ClerkProvider } from "@clerk/nextjs"
import { UrlForm } from "./url-form"

const HomePage = () => {
  return (
    <>
      <h1 className="mt-10 mb-8 text-center font-bold text-4xl sm:text-5xl">
        Shorten URLs <span className="text-primary">rapidly.</span>
      </h1>

      <ClerkProvider dynamic>
        <UrlForm />
      </ClerkProvider>
    </>
  )
}

export default HomePage
