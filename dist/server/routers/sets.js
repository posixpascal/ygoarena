"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setsRouter = void 0;
const trpc_1 = require("@/server/trpc");
const prisma_1 = require("@/server/prisma");
const zod_1 = require("zod");
exports.setsRouter = (0, trpc_1.router)({
    cardsInSet: trpc_1.publicProcedure.input(zod_1.z.object({
        setIds: zod_1.z.string().cuid().array(),
        amount: zod_1.z.number().default(400)
    })).query(async ({ input }) => {
        const { setIds, amount } = input;
        const cardsInSets = await prisma_1.prisma.cardsInCardSet.findMany({
            where: {
                cardSetId: {
                    in: setIds
                }
            },
            select: {
                cardId: true
            },
        });
        const cards = await prisma_1.prisma.card.findMany({
            where: {
                id: {
                    in: cardsInSets.map(cardSet => cardSet.cardId)
                }
            }
        });
        const deckmasterCards = cards.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, amount);
        return deckmasterCards;
    }),
    random: trpc_1.publicProcedure.query(async () => {
        const setCount = await prisma_1.prisma.cardSet.count();
        const skip = Math.floor(Math.random() * setCount);
        return prisma_1.prisma.cardSet.findFirst({
            take: 1,
            skip
        });
    }),
    summary: trpc_1.publicProcedure.input(zod_1.z.object({
        setIds: zod_1.z.string().cuid().array()
    })).query(async ({ input }) => {
        const { setIds } = input;
        const totalCards = await prisma_1.prisma.cardsInCardSet.count({
            where: {
                cardSetId: {
                    in: setIds
                }
            }
        });
        const sets = await prisma_1.prisma.cardSet.findMany({
            where: {
                id: {
                    in: setIds
                }
            },
            select: {
                id: true,
                name: true,
                image: true,
                _count: true,
                code: true
            }
        });
        return {
            totalCards,
            sets
        };
    }),
    details: trpc_1.publicProcedure.input(zod_1.z.object({
        id: zod_1.z.string().cuid()
    })).query(async ({ input }) => {
        const { id } = input;
        return {
            cards: await prisma_1.prisma.cardsInCardSet.count({
                where: {
                    cardSetId: id
                }
            })
        };
    }),
    list: trpc_1.publicProcedure.input(zod_1.z.object({
        name: zod_1.z.string().optional(),
        cursor: zod_1.z.number().default(1),
        limit: zod_1.z.number(),
    })).query(async ({ input }) => {
        const { name, limit, cursor } = input;
        const query = {
            take: limit,
            skip: cursor * limit
        };
        if (name) {
            query.skip = 0;
            query.where = {
                OR: [
                    {
                        name: {
                            contains: name
                        }
                    },
                    {
                        code: name
                    }
                ],
            };
        }
        return {
            items: await prisma_1.prisma.cardSet.findMany(query),
            nextPage: cursor + 1
        };
    })
});
