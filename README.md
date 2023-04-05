# YGO Arena

Install the dependencies using pnpm:
```shell
pnpm install
```

Copy the provided .env.sample (no edit is needed)

Setup prisma db:
```
pnpm prisma migrate dev
pnpm prisma generate
```

Start the next application:
```shell
pnpm run dev
```

Visit http://localhost:3000 - you should see a random YuGiOh card.