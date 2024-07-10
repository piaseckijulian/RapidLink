"use client"

import { createLink } from "@/lib/actions"
import { useAuth } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import copy from "clipboard-copy"
import { Check, Copy } from "lucide-react"
import { useState } from "react"
import { type SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { LoadingButton } from "./ui/loading-button"

const linkRegex =
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i

const message = "Please enter a valid link!"

const linkSchema = z.object({
  fullLink: z.string().min(1, message).regex(linkRegex, message),
})

type linkSchemaType = z.infer<typeof linkSchema>

const CreateLinkForm = () => {
  const form = useForm<linkSchemaType>({
    resolver: zodResolver(linkSchema),
    defaultValues: { fullLink: "" },
  })
  const { userId } = useAuth()
  const [creatingLinkProgress, setCreatingLinkProgress] = useState(false)
  const [shortLink, setShortLink] = useState("")
  const [isCopied, setIsCopied] = useState(false)

  const onSubmit: SubmitHandler<linkSchemaType> = async (data) => {
    try {
      setIsCopied(false)
      setCreatingLinkProgress(true)
      const link = await createLink(data.fullLink, userId)

      if (!link) {
        console.error("Failed to create a link!")
        return
      }

      setShortLink(`${process.env.NEXT_PUBLIC_SITE_URL}/${link.short}`)
    } catch (error) {
      console.error(error)
    } finally {
      setCreatingLinkProgress(false)
    }
  }

  const copyLink = async () => {
    try {
      await copy(shortLink)
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
            name="fullLink"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="border-2 text-xl"
                    placeholder="Full Link"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="relative w-full">
            {shortLink &&
              (isCopied ? (
                <Check
                  className="-translate-y-1/2 absolute top-1/2 right-3 z-10 transform cursor-pointer text-gray-900"
                  onClick={copyLink}
                />
              ) : (
                <Copy
                  className="-translate-y-1/2 absolute top-1/2 right-3 z-10 transform cursor-pointer text-gray-900"
                  onClick={copyLink}
                />
              ))}
            <Input
              value={shortLink}
              className="border-2 text-xl"
              placeholder="Short Link"
              disabled={true}
            />
          </div>
        </div>

        <LoadingButton
          loading={form.formState.isSubmitting}
          disabled={creatingLinkProgress}
          type="submit"
          className="w-full"
        >
          Get Link
        </LoadingButton>
      </form>
    </Form>
  )
}

export default CreateLinkForm
