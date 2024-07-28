"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import { createUrl } from "@/lib/actions"
import { useCopyToClipboard } from "@/lib/hooks/copyToClipboard"
import { type UrlSchema, urlSchema } from "@/lib/validation"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"

export const UrlForm = () => {
  const form = useForm<UrlSchema>({
    resolver: zodResolver(urlSchema),
    defaultValues: { fullUrl: "" },
  })
  const { userId } = useAuth()
  const { copy, copiedText } = useCopyToClipboard()
  const [shortUrl, setShortUrl] = useState("")

  const onSubmit: SubmitHandler<UrlSchema> = async (data) => {
    try {
      const url = await createUrl(data.fullUrl, userId)

      if (!url) {
        form.setError("fullUrl", {
          message: "Failed to create a URL",
        })

        return
      }

      setShortUrl(`${process.env.NEXT_PUBLIC_SITE_URL}/${url.shortUrl}`)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="xs:flex xs:gap-2 max-xs:space-y-2">
          <FormField
            control={form.control}
            name="fullUrl"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="border-2 text-xl"
                    placeholder="Full URL"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="relative w-full">
            {shortUrl &&
              (copiedText === shortUrl ? (
                <Check
                  className="-translate-y-1/2 absolute top-1/2 right-3 z-10 transform cursor-pointer text-gray-900"
                  onClick={() => copy(shortUrl)}
                />
              ) : (
                <Copy
                  className="-translate-y-1/2 absolute top-1/2 right-3 z-10 transform cursor-pointer text-gray-900"
                  onClick={() => copy(shortUrl)}
                />
              ))}

            <Input
              value={shortUrl}
              className="border-2 text-xl"
              placeholder="Short URL"
              disabled={true}
            />
          </div>
        </div>

        <LoadingButton
          type="submit"
          className="w-full"
          loading={form.formState.isSubmitting}
        >
          Get URL
        </LoadingButton>
      </form>
    </Form>
  )
}
