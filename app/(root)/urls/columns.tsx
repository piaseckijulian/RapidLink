import ActionsCell from '@/components/ActionsCell';
import type { Url } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

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
    cell: ActionsCell
  }
];
