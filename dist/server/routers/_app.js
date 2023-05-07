"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const trpc_1 = require("../trpc");
const binders_1 = require("@/server/routers/binders");
const cards_1 = require("@/server/routers/cards");
const sets_1 = require("@/server/routers/sets");
exports.appRouter = (0, trpc_1.router)({
    binders: binders_1.bindersRouter,
    cards: cards_1.cardsRouter,
    sets: sets_1.setsRouter
});
