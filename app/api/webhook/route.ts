import prisma from '@/prisma/client';
import { WebhookEvent } from '@clerk/nextjs/server';
import { headers } from 'next/headers';
import { Webhook } from 'svix';

export const POST = async (req: Request) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) throw new Error('WEBHOOK_SECRET variable NOT found');

  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature)
    return new Response('No Svix headers', { status: 400 });

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    }) as WebhookEvent;
  } catch (err) {
    return new Response('Error occurred when validating Webhook', { status: 400 });
  }

  interface User {
    id: string;
    username: string;
    image_url: string;
  }

  const eventType = evt.type;
  const { id, username, image_url: imageUrl }: User = payload.data;

  switch (eventType) {
    case 'user.created':
      await prisma.user.create({ data: { id, username, imageUrl } });
      break;
    case 'user.updated':
      await prisma.user.update({ where: { id }, data: { username, imageUrl } });
      break;
    case 'user.deleted':
      await prisma.url.deleteMany({ where: { authorId: payload.data.id } });
      await prisma.user.delete({ where: { id } });
      break;
    default:
      return new Response('Unexpected event type!', { status: 400 });
  }

  return new Response('', { status: 200 });
};
