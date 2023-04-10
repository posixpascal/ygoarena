import {protectedProcedure, publicProcedure, router} from "../trpc";
import {prisma} from "@/server/prisma";
import { z } from 'zod';
import { Card } from "@prisma/client";

export const cardsRouter = router({
    random: publicProcedure
        .input(z.object({ amount: z.number().optional(), setIDs: z.number().array().optional() }))
        .query(async ({ input: { amount = 1, setIDs = [] } }) => {
        return getRandomCards(amount);
    })
});

const getRandomCards = async (amount: number, setIDs: number[] = []): Promise<Card[]> => {
    const cards = await prisma.card.findMany({
        take: 30, // TODO: Replace with "prisma.cardsInCardSet.length"
    });
    return getRandomEntries(cards, amount);
}

const getRandomEntries = (array: any[], amount: number) => {
    const randomCards = [];
    const maxIndex = array.length - 1;
    const usedIndexes = new Set();

    while (randomCards.length < amount && randomCards.length < array.length) {
        const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
        if (!usedIndexes.has(randomIndex)) {
            randomCards.push(array[randomIndex]);
            usedIndexes.add(randomIndex);
        }
    }

    return randomCards;
}
