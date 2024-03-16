'use client';

import { columns } from '@/app/urls/columns';
import { type Url } from '@prisma/client';
import { DataTable } from './ui/data-table';

interface Props {
  urls: Url[];
}

const UrlTable = ({ urls }: Props) => {
  return <DataTable columns={columns} data={urls} />;
};

export default UrlTable;
