import { getShortUrl, onUrlVisit } from "@/lib/actions/url.action"
import { redirect } from "next/navigation"

type Props = {
  params: Promise<{ shortUrl: string }>
}

const ShortRedirect = async ({ params }: Props) => {
  const shortUrl = (await params).shortUrl

  const url = await getShortUrl(shortUrl)
  if (!url) redirect("/")

  await onUrlVisit(url.id, url.visitCount + 1)

  redirect(url.fullUrl)
}

export default ShortRedirect
