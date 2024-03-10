'use client';

import { createUrl } from '@/lib/actions';
import { useAuth } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import copy from 'clipboard-copy';
import { Check, Copy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { LoadingButton } from './ui/loading-button';

const urlRegex = new RegExp(
  '^(?:(?:(?:https?|ftp):)?\\/\\/)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z0-9\\u00a1-\\uffff][a-z0-9\\u00a1-\\uffff_-]{0,62})?[a-z0-9\\u00a1-\\uffff]\\.)+(?:[a-z\\u00a1-\\uffff]{2,}\\.?))(?::\\d{2,5})?(?:[/?#]\\S*)?$',
  'i'
);
const message = 'Please enter a valid URL!';

const urlSchema = z.object({
  fullURL: z.string().min(1, message).regex(urlRegex, message)
});

type urlSchemaType = z.infer<typeof urlSchema>;

const CreateUrlForm = () => {
  const form = useForm<urlSchemaType>({
    resolver: zodResolver(urlSchema),
    defaultValues: { fullURL: '' }
  });
  const { userId } = useAuth();
  const [creatingUrlProgress, setCreatingUrlProgress] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<urlSchemaType> = async data => {
    try {
      setIsCopied(false);
      setCreatingUrlProgress(true);
      const url = await createUrl(data.fullURL, userId);

      if (!url) {
        console.error('Failed to create a URL');
        return;
      }

      setShortUrl(`${process.env.NEXT_PUBLIC_WEBSITE_URL}/${url.short}`);
    } catch (error) {
      console.error(error);
    } finally {
      setCreatingUrlProgress(false);
      router.refresh();
    }
  };

  const copyUrl = async () => {
    try {
      await copy(shortUrl);
      setIsCopied(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="max-xs:space-y-2 xs:flex xs:gap-2">
          <FormField
            control={form.control}
            name="fullURL"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    className="border-2 text-xl"
                    placeholder="Full URL"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="relative w-full">
            {shortUrl &&
              (isCopied ? (
                <Check className="absolute right-3 top-1/2 z-10 -translate-y-1/2 transform text-gray-900" />
              ) : (
                <Copy
                  className="absolute right-3 top-1/2 z-10 -translate-y-1/2 transform cursor-pointer text-gray-900"
                  onClick={copyUrl}
                />
              ))}
            <Input
              value={shortUrl}
              className="border-2 text-xl"
              placeholder="Short URL"
              disabled={true}
            />
          </div>
        </div>

        <LoadingButton
          loading={form.formState.isSubmitting}
          disabled={creatingUrlProgress}
          type="submit"
          className="w-full text-lg font-medium"
        >
          Get URL
        </LoadingButton>
      </form>
    </Form>
  );
};

export default CreateUrlForm;
