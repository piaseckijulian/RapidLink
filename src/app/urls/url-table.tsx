"use client"

import { DataTable } from "@/components/ui/data-table"
import type { Url } from "@prisma/client"
import { columns } from "./columns"

type Props = {
  urls: Url[] | undefined
}

export const UrlTable = ({ urls }: Props) => {
  return <DataTable columns={columns} data={urls || []} />
}
