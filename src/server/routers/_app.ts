import {router} from "../trpc";
import {bindersRouter} from "@/server/routers/binders";
import {cardsRouter} from "@/server/routers/cards";

export const appRouter = router({
    binders: bindersRouter,
    cards: cardsRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;
