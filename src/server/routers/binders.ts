import {protectedProcedure, publicProcedure, router} from "../trpc";
import {z} from 'zod';
export const bindersRouter = router({
    downloader: publicProcedure
        .input(z.object({
            setIds: z.string().array()
        })).mutation(({input}) => {
        return 1;
    })
});