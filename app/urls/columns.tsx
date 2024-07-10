import ActionsCell from "@/components/ActionsCell"
import type { Url } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export const columns: ColumnDef<Url>[] = [
  {
    accessorKey: "fullUrl",
    header: "Full URL",
    cell: ({ row }) => {
      const fullUrl: string = row.getValue("fullUrl")

      return (
        <Link href={fullUrl} className="hover:underline" target="_blank">
          {fullUrl}
        </Link>
      )
    },
  },
  {
    accessorKey: "shortUrl",
    header: "Short URL",
    cell: ({ row }) => {
      const shortUrl = row.getValue("shortUrl")
      const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${shortUrl}`

      return (
        <Link href={url} className="hover:underline" target="_blank">
          {url}
        </Link>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt")

      const formatted = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(createdAt)

      return formatted
    },
  },
  {
    accessorKey: "visitCount",
    header: "Visit Count",
    cell: ({ row }) => {
      const visitCount: number = row.getValue("visitCount")

      return visitCount
    },
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
]
