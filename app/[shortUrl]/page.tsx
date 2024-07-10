import { getShortUrl, onUrlVisit } from "@/lib/actions"
import { redirect } from "next/navigation"

type Props = {
  params: { shortUrl: string }
}

const ShortRedirect = async ({ params: { shortUrl } }: Props) => {
  const url = await getShortUrl(shortUrl)
  if (!url) redirect("/")

  await onUrlVisit({
    id: url.id,
    visitCount: url.visitCount + 1,
    lastVisitedAt: new Date(),
  })

  redirect(url.fullUrl)
}

export default ShortRedirect
