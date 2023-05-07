"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bindersRouter = void 0;
const trpc_1 = require("../trpc");
const zod_1 = require("zod");
const prisma_1 = require("@/server/prisma");
exports.bindersRouter = (0, trpc_1.router)({
    exporter: trpc_1.publicProcedure
        .input(zod_1.z.object({
        mainDeckCards: zod_1.z.string().cuid().array().default([]),
        sideDeckCards: zod_1.z.string().cuid().array().default([]),
        extraDeckCards: zod_1.z.string().cuid().array().default([])
    })).mutation(async ({ input }) => {
        const { mainDeckCards, sideDeckCards, extraDeckCards } = input;
        let ydkFile = [];
        // #main
        ydkFile.push("#main");
        for await (const cardId of mainDeckCards) {
            const card = await prisma_1.prisma.card.findUnique({
                where: {
                    id: cardId
                }
            });
            if (!card) { // TODO: should report back to user.
                continue;
            }
            ydkFile.push(`${card.konamiId}`);
        }
        ydkFile.push('');
        ydkFile.push("#extra");
        for await (const cardId of extraDeckCards) {
            const card = await prisma_1.prisma.card.findUnique({
                where: {
                    id: cardId
                }
            });
            if (!card) { // TODO: should report back to user.
                continue;
            }
            ydkFile.push(`${card.konamiId}`);
        }
        ydkFile.push('');
        ydkFile.push("!side");
        for await (const cardId of sideDeckCards) {
            const card = await prisma_1.prisma.card.findUnique({
                where: {
                    id: cardId
                }
            });
            if (!card) { // TODO: should report back to user.
                continue;
            }
            ydkFile.push(`${card.konamiId}`);
        }
        ydkFile.push('');
        return ydkFile.join("\n");
    })
});
