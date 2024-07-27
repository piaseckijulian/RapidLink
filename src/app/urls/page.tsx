import { getUserUrls } from "@/lib/actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { UrlTable } from "./url-table"

const UrlsPage = async () => {
  const user = await currentUser()
  if (!user) redirect("/")

  const urls = await getUserUrls(user.id)

  return (
    <>
      <h1 className="mt-10 mb-8 text-center font-bold text-4xl sm:text-5xl">
        Your URLs
      </h1>

      <UrlTable urls={urls} />
    </>
  )
}

export default UrlsPage
