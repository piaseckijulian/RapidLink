import { z } from "zod"

const message = "Please enter a valid URL!"

export const urlSchema = z.object({
  fullUrl: z.string().min(1, message).url(message),
})

export type UrlSchema = z.infer<typeof urlSchema>
