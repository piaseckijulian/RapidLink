# 🚀 RapidLink

![GitHub Repo stars](https://img.shields.io/github/stars/piaseckijulian/RapidLink?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/piaseckijulian/RapidLink?style=for-the-badge)
![GitHub watchers](https://img.shields.io/github/watchers/piaseckijulian/RapidLink?style=for-the-badge)

RapidLink swiftly shortens long URLs for convenient sharing. 🚀

<img src="./public/thumbnail.png" alt="Image of RapidLink" width="800" height="400" />

## 🔗 Links

- [Live Demo](https://julian-rapidlink.vercel.app)

## 📐 Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- TanStack React Table
- Drizzle ORM
- Clerk
- React Hook Form
- Zod
- NanoID

## ✨ Quick Start

Here’s how to set up the project on your local machine.

**Prerequisites**

Ensure that the following are installed on your machine:

- [Git](https://git-scm.com)
- [Docker](https://docker.com)
- [Node.js](https://nodejs.org/en)
- [pnpm](https://pnpm.io)

**Cloning the Repository**

```bash
git clone https://github.com/piaseckijulian/RapidLink.git
cd RapidLink
```

**Installation**

```bash
pnpm i
```

**Create Local Database**

```bash
docker run --name rapidlink-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

**Set Up Environment Variables**

Duplicate the `.env.example` file and rename it to `.env`. Insert your environmental variables there.

`NEXT_PUBLIC_SITE_URL` is the URL of your website. For local development, you can set it to `http://localhost:3000`.

You can obtain both the `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` from [Clerk's website](https://clerk.com).

Set `DATABASE_URL` to the URL of your database. For local development, you can set it to `postgresql://postgres:password@localhost:5432/postgres`.

After setting the `DATABASE_URL`, you should apply the schema by running the following command.

```bash
pnpm db:push
```

**Running the Project**

```bash
pnpm dev
```

That's it! - You're good to go. The projest should be live on http://localhost:3000

## 🌐 License

This software is licensed under the [MIT License](https://github.com/piaseckijulian/RapidLink/blob/main/LICENSE)
