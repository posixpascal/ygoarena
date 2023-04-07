import {publicProcedure, router} from "@/server/trpc";
import {prisma} from "@/server/prisma";

export const setsRouter = router({
    random: publicProcedure.query(async () => {
        const setCount = await prisma.cardSet.count();
        const skip = Math.floor(Math.random() * setCount);
        return prisma.cardSet.findFirst({
            take: 1,
            skip
        })
    })
});