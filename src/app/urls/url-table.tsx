"use client"

import { DataTable } from "@/components/ui/data-table"
import type { SelectUrl } from "@/db/schema"
import { columns } from "./columns"

type Props = {
  urls: SelectUrl[] | undefined
}

export const UrlTable = ({ urls }: Props) => {
  return <DataTable columns={columns} data={urls || []} />
}
