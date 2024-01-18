'use client';

import { deleteURL } from '@/actions';
import { useRouter } from 'next/navigation';
import { FaTrashAlt } from 'react-icons/fa';
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
    >
      <FaTrashAlt />
    </Button>
  );
};

export default DeleteButton;
