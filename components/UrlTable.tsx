import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { URL } from '@/types';
import Link from 'next/link';
import DeleteButton from './DeleteButton';

interface Props {
  urls: URL[];
}

const UrlTable = ({ urls }: Props) => {
  return (
    <Table className="border border-white text-lg text-white">
      <TableHeader>
        <TableRow className="hover:bg-zinc-900">
          <TableHead className="border-r text-white">Full URL</TableHead>
          <TableHead className="border-r text-white">Short URL</TableHead>
          <TableHead className="w-[5%] text-white">Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {urls.map(url => (
          <TableRow key={url.id} className="hover:bg-zinc-900">
            <TableCell className="border-r">
              <Link href={url.full} className="hover:underline" target="_blank">
                {url.full}
              </Link>
            </TableCell>

            <TableCell className="border-r">
              <Link href={url.short} className="hover:underline" target="_blank">
                {process.env.NEXT_PUBLIC_WEBSITE_URL}/{url.short}
              </Link>
            </TableCell>

            <TableCell className="flex items-center justify-center">
              <DeleteButton id={url.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UrlTable;
