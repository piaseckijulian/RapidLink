"use client"

import { createUrl } from "@/lib/actions"
import { type UrlSchema, urlSchema } from "@/lib/validation"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import copy from "clipboard-copy"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import { LoadingButton } from "../components/ui/loading-button"

export const UrlForm = () => {
  const form = useForm<UrlSchema>({
    resolver: zodResolver(urlSchema),
    defaultValues: { fullUrl: "" },
  })
  const { userId } = useAuth()
  const [creatingUrlProgress, setCreatingUrlProgress] = useState(false)
  const [shortUrl, setShortUrl] = useState("")
  const [isCopied, setIsCopied] = useState(false)

  const onSubmit: SubmitHandler<UrlSchema> = async (data) => {
    try {
      setIsCopied(false)
      setCreatingUrlProgress(true)

      const url = await createUrl(data.fullUrl, userId)

      if (!url) {
        console.error("Failed to create a URL!")
        return
      }

      setShortUrl(`${process.env.NEXT_PUBLIC_SITE_URL}/${url.shortUrl}`)
    } catch (error) {
      console.error(error)
    } finally {
      setCreatingUrlProgress(false)
    }
  }

  const copyUrl = async () => {
    try {
      await copy(shortUrl)
      setIsCopied(true)
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
              (isCopied ? (
                <Check
                  className="-translate-y-1/2 absolute top-1/2 right-3 z-10 transform cursor-pointer text-gray-900"
                  onClick={copyUrl}
                />
              ) : (
                <Copy
                  className="-translate-y-1/2 absolute top-1/2 right-3 z-10 transform cursor-pointer text-gray-900"
                  onClick={copyUrl}
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
          loading={form.formState.isSubmitting}
          disabled={creatingUrlProgress}
          type="submit"
          className="w-full"
        >
          Get URL
        </LoadingButton>
      </form>
    </Form>
  )
}
