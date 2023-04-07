import {router} from "../trpc";
import {bindersRouter} from "@/server/routers/binders";
import {cardsRouter} from "@/server/routers/cards";
import {setsRouter} from "@/server/routers/sets";

export const appRouter = router({
    binders: bindersRouter,
    cards: cardsRouter,
    sets: setsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
