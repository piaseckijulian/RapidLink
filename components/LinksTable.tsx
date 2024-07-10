"use client"

import { columns } from "@/app/links/columns"
import type { Link } from "@prisma/client"
import { DataTable } from "./ui/data-table"

interface Props {
  links: Link[] | undefined
}

const LinksTable = ({ links }: Props) => {
  return <DataTable columns={columns} data={links || []} />
}

export default LinksTable
