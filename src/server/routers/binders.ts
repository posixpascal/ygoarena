import {protectedProcedure, publicProcedure, router} from "../trpc";

export const bindersRouter = router({
    test: publicProcedure.query(() => {
        return 1;
    })
});