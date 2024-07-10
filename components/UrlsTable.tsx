"use client"

import { columns } from "@/app/urls/columns"
import type { Url } from "@prisma/client"
import { DataTable } from "./ui/data-table"

type Props = {
  urls: Url[] | undefined
}

const UrlsTable = ({ urls }: Props) => {
  return <DataTable columns={columns} data={urls || []} />
}

export default UrlsTable
