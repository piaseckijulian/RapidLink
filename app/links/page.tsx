import LinksTable from "@/components/LinksTable"
import { getUserLinks } from "@/lib/actions"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

const LinksPage = async () => {
  const user = await currentUser()
  if (!user) redirect("/")

  const links = await getUserLinks(user.id)

  return (
    <>
      <h1 className="mt-10 mb-8 text-center font-bold text-4xl sm:text-5xl">
        Your links
      </h1>

      <LinksTable links={links} />
    </>
  )
}

export default LinksPage
