'use client';

import { deleteURL } from '@/actions';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

interface Props {
  id: string;
}

const DeleteButton = ({ id }: Props) => {
  const router = useRouter();

  return (
    <Button
      size="icon"
      className="bg-blue-700 hover:bg-blue-900"
      onClick={() => {
        deleteURL(id);
        router.refresh();
      }}
      aria-label="Delete URL"
    >
      <Trash2 />
    </Button>
  );
};

export default DeleteButton;
