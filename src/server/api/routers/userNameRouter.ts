import { UniqueUserNameSchema } from "~/models/identity";
import { createTRPCRouter } from "../trpc";
import { publicProcedure } from "../trpc";

export const userNameRouter = createTRPCRouter({
    isAvailable: publicProcedure
    .input(UniqueUserNameSchema)
    .query(async () => {
        return { isAvailable: true }
    })
})
