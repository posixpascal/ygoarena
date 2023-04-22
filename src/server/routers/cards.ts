import {protectedProcedure, publicProcedure, router} from "../trpc";
import {prisma} from "@/server/prisma";
import { z } from 'zod';
import { Card } from "@prisma/client";

export const cardsRouter = router({
    random: publicProcedure
        .input(z.object({
            amount: z.number().optional(),
            cardSets: z.string().cuid().array().optional()
        }))
        .query(async ({ input: { amount = 1, cardSets = [] } }) => {
        return getRandomCards(amount, cardSets);
    })
});

const getRandomCards = async (amount: number, cardSets: string[] = []): Promise<Card[]> => {
    const cards = await prisma.cardsInCardSet.findMany({
        where: {
            cardSetId: {
                in: cardSets
            }
        }
    });

    const randomCardIds: string[] = [];
    const maxIndex = cards.length - 1;
    const usedIndexes = new Set();

    while (randomCardIds.length < amount && randomCardIds.length < cards.length) {
        const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
        if (!usedIndexes.has(randomIndex)) {
            randomCardIds.push(cards[randomIndex].cardId);
            usedIndexes.add(randomIndex);
        }
    }

    return await prisma.card.findMany({
        where: {
            id: {
                in: randomCardIds
            }
        }
    })
}
