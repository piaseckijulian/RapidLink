"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { SelectUrl } from "@/db/schema"
import type { Row } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { ConfirmDeleteDialog } from "./confirm-delete-dialog"

export const ActionsCell = ({ row }: { row: Row<SelectUrl> }) => {
  const [isOpen, setIsOpen] = useState(false)
  const url = row.original

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            className="cursor-pointer"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteDialog isOpen={isOpen} setIsOpen={setIsOpen} id={url.id} />
    </>
  )
}
