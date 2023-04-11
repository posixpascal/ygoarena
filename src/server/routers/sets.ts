import {publicProcedure, router} from "@/server/trpc";
import {prisma} from "@/server/prisma";
import {Prisma} from "@prisma/client";
import {z} from 'zod';

export const setsRouter = router({
    cardsInSet: publicProcedure.input(z.object({
        setIds: z.string().cuid().array(),
        amount: z.number().default(400)
    })).query(async ({input}) => {
       const {setIds, amount} = input;
       const cardsInSets = await prisma.cardsInCardSet.findMany({
           where: {
               cardSetId: {
                   in: setIds
               }
           },
           select: {
               cardId: true
           },
       });

       const cards = await prisma.card.findMany({
           where: {
               id: {
                   in: cardsInSets.map(cardSet => cardSet.cardId)
               }
           }
       });

       const deckmasterCards = cards.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, amount);
       return deckmasterCards;
    }),
    random: publicProcedure.query(async () => {
        const setCount = await prisma.cardSet.count();
        const skip = Math.floor(Math.random() * setCount);
        return prisma.cardSet.findFirst({
            take: 1,
            skip
        })
    }),
    summary: publicProcedure.input(z.object({
        setIds: z.string().cuid().array()
    })).query(async ({input}) => {
        const {setIds} = input;

        const totalCards = await prisma.cardsInCardSet.count({
            where: {
                cardSetId: {
                    in: setIds
                }
            }
        });

        const sets = await prisma.cardSet.findMany({
            where: {
                id: {
                    in: setIds
                }
            },
            select: {
                name: true
            }
        });

        const names = sets.map(set => set.name);

        return {
            totalCards,
            names
        }
    }),
    details: publicProcedure.input(z.object({
        id: z.string().cuid()
    })).query(async ({input}) => {
        const {id} = input;

        return {
            cards: await prisma.cardsInCardSet.count({
                where: {
                    cardSetId: id
                }
            })
        }
    }),
    list: publicProcedure.input(z.object({
        name: z.string().optional(),
        cursor: z.number().default(1),
        limit: z.number(),
    })).query(async ({input}) => {
        const {name, limit, cursor} = input;
        const query : Prisma.CardSetFindManyArgs = {
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
            }
        }

        return {
            items: await prisma.cardSet.findMany(query),
            nextPage: cursor + 1
        };
    })
});