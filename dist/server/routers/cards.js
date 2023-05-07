"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardsRouter = void 0;
const trpc_1 = require("../trpc");
const prisma_1 = require("@/server/prisma");
const zod_1 = require("zod");
exports.cardsRouter = (0, trpc_1.router)({
    random: trpc_1.publicProcedure
        .input(zod_1.z.object({
        amount: zod_1.z.number().optional(),
        cardSets: zod_1.z.string().cuid().array().optional()
    }))
        .query(async ({ input: { amount = 1, cardSets = [] } }) => {
        const cards = await prisma_1.prisma.cardsInCardSet.findMany({
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
            .sort(() => Math.random() > 0.5 ? 1 : -1)
            .slice(0, amount);
        return await prisma_1.prisma.card.findMany({
            where: {
                id: {
                    in: shuffledCards
                }
            },
        });
    })
});
