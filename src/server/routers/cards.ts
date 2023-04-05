import {protectedProcedure, publicProcedure, router} from "../trpc";
import {prisma} from "@/server/prisma";

export const cardsRouter = router({
    random: publicProcedure.query(async () => {
        const cardCount = await prisma.card.count();
        const skip = Math.floor(Math.random() * cardCount);
        return prisma.card.findFirst({
            take: 1,
            skip
        })
    })
});