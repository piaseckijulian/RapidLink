import { useState } from "react"

export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<string | null>(null)

  const copy = async (text: string) => {
    if (!navigator.clipboard) {
      console.error("Clipboard not supported")

      return
    }

    await navigator.clipboard.writeText(text)
    setCopiedText(text)
  }

  return { copy, copiedText }
}
