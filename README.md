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
- Prisma
- Clerk
- React Hook Form
- Zod
- NanoID

## ✨ Usage

```bash
git clone https://github.com/piaseckijulian/RapidLink.git
cd RapidLink
docker run --name rapidlink-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
pnpm dev
```

Next, duplicate the `.env.example` file, rename the duplicate to `.env`, and then input your environmental variables there.

```bash
pnpm db:push
```

That's it! - You're good to go. You can add new features, fix bugs etc.

## 🌐 License

This software is licensed under the [MIT License](https://github.com/piaseckijulian/RapidLink/blob/main/LICENSE)
