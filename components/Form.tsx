'use client';

import { createURL } from '@/actions';
import { useAuth } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './ui/button';
import { Input } from './ui/input';

const urlRegex = new RegExp(
  '^(?:(?:(?:https?|ftp):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?[a-z0-9\\u00a1-\\uffff]\\.)+(?:[a-z\\u00a1-\\uffff]{2,}\\.?))(?::\\d{2,5})?(?:[/?#]\\S*)?$',
  'i'
);
const message = 'Please enter a valid URL!';

const urlSchema = z.object({
  fullURL: z.string().min(1, message).regex(urlRegex, message)
});

type urlSchemaType = z.infer<typeof urlSchema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<urlSchemaType>({
    resolver: zodResolver(urlSchema),
    defaultValues: { fullURL: '' }
  });
  const { userId } = useAuth();
  const [shortURL, setShortURL] = useState('');
  const router = useRouter();

  const onSubmit: SubmitHandler<urlSchemaType> = async data => {
    const url = await createURL(data.fullURL, userId);
    setShortURL(url.short);
    if (userId) router.refresh();
  };

  return (
    <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit(onSubmit)}>
      <Input
        type="text"
        placeholder="Enter URL"
        className="border-blue-700 bg-zinc-800 text-lg text-white placeholder:text-gray-200 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-blue-700 md:max-w-lg"
        autoComplete="off"
        {...register('fullURL')}
      />

      {errors.fullURL && (
        <p className="text-lg font-semibold text-red-600 sm:text-xl">
          {errors.fullURL.message}
        </p>
      )}

      <Button
        type="submit"
        className="bg-blue-700 font-bold hover:bg-blue-900 xs:text-xl"
      >
        Get URL
      </Button>

      {!userId && shortURL && (
        <Link
          href={shortURL}
          target="_blank"
          className="mt-5 text-base font-bold text-white transition duration-200 max-xs:text-center xs:text-2xl sm:text-3xl"
        >
          /<span className="text-blue-500">{shortURL}</span>
        </Link>
      )}
    </form>
  );
};

export default Form;
