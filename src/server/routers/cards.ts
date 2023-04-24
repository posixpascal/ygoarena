import {publicProcedure, router} from "../trpc";
import {prisma} from "@/server/prisma";
import {z} from 'zod';

export const cardsRouter = router({
    random: publicProcedure
        .input(z.object({
            amount: z.number().optional(),
            cardSets: z.string().cuid().array().optional()
        }))
        .query(async ({input: {amount = 1, cardSets = []}}) => {
            const cards = await prisma.cardsInCardSet.findMany({
                where: {
                    cardSetId: {
                        in: cardSets
                    },
                },
                select: {
                    cardId: true
                }
            });

            const shuffledCards = cards
                .map(cardInSet => cardInSet.cardId)
                .sort(() => Math.random() > 0.5 ? 1 : -1);

            return await prisma.card.findMany({
                where: {
                    id: {
                        in: shuffledCards
                    }
                },
                take: amount
            })
        })
});
