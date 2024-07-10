import ActionsCell from "@/components/ActionsCell"
import type { Link as LinkType } from "@prisma/client"
import type { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"

export const columns: ColumnDef<LinkType>[] = [
  {
    accessorKey: "full",
    header: "Full Link",
    cell: ({ row }) => {
      const fullLink: string = row.getValue("full")

      return (
        <Link href={fullLink} className="hover:underline" target="_blank">
          {fullLink}
        </Link>
      )
    },
  },
  {
    accessorKey: "short",
    header: "Short Link",
    cell: ({ row }) => {
      const shortLink = row.getValue("short")
      const link = `${process.env.NEXT_PUBLIC_SITE_URL}/${shortLink}`

      return (
        <Link href={link} className="hover:underline" target="_blank">
          {link}
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
