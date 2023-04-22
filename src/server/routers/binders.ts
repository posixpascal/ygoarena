import {protectedProcedure, publicProcedure, router} from "../trpc";
import {z} from 'zod';
import {prisma} from "@/server/prisma";
export const bindersRouter = router({
    exporter: publicProcedure
        .input(z.object({
            mainDeckCards: z.string().cuid().array().default([]),
            sideDeckCards: z.string().cuid().array().default([]),
            extraDeckCards: z.string().cuid().array().default([])
        })).mutation(async({input}) => {
            const {mainDeckCards, sideDeckCards, extraDeckCards} = input;

            let ydkFile = [];

            // #main
            ydkFile.push("#main");
            for await (const cardId of mainDeckCards){
                const card = await prisma.card.findUnique({
                    where: {
                        id: cardId
                    }
                });

                if (!card){ // TODO: should report back to user.
                    continue;
                }

                ydkFile.push(card.konamiId);
            }

            ydkFile.push('');






            ydkFile.push("#extra");
            for await (const cardId of extraDeckCards){
                const card = await prisma.card.findUnique({
                    where: {
                        id: cardId
                    }
                });

                if (!card){ // TODO: should report back to user.
                    continue;
                }

                ydkFile.push(card.konamiId);
            }

            ydkFile.push('');



            ydkFile.push("!side");
            for await (const cardId of sideDeckCards){
                const card = await prisma.card.findUnique({
                    where: {
                        id: cardId
                    }
                });

                if (!card){ // TODO: should report back to user.
                    continue;
                }

                ydkFile.push(card.konamiId);
            }

            ydkFile.push('');

            return ydkFile.join("\n");
    })
});