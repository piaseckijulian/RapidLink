'use client';

import ConfirmDeleteDialog from '@/components/ConfirmDeleteDialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import type { Url } from '@prisma/client';
import { ColumnDef, Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

const ActionsCellComponent = ({ row }: { row: Row<Url> }) => {
  const [isOpen, setIsOpen] = useState(false);
  const url = row.original;

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
          <DropdownMenuItem onClick={() => setIsOpen(true)} className="cursor-pointer">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDeleteDialog isOpen={isOpen} setIsOpen={setIsOpen} id={url.id} />
    </>
  );
};

export const columns: ColumnDef<Url>[] = [
  {
    accessorKey: 'full',
    header: 'Full URL',
    cell: ({ row }) => {
      const fullUrl: string = row.getValue('full');

      return (
        <Link href={fullUrl} className="hover:underline" target="_blank">
          {fullUrl}
        </Link>
      );
    }
  },
  {
    accessorKey: 'short',
    header: 'Short URL',
    cell: ({ row }) => {
      const shortUrl = row.getValue('short');
      const url = `${process.env.NEXT_PUBLIC_WEBSITE_URL}/${shortUrl}`;

      return (
        <Link href={url} className="hover:underline" target="_blank">
          {url}
        </Link>
      );
    }
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      const createdAt: Date = row.getValue('createdAt');

      const formatted = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(createdAt);

      return formatted;
    }
  },
  {
    id: 'actions',
    cell: ActionsCellComponent
  }
];
