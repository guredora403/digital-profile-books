import { createTRPCRouter } from "../trpc";
import { cardBookRouter } from "./me/cardBookRouter";
import { cardHandleRouter } from "./me/cardHandleRouter";
import { profileRouter } from "./me/profileRouter";

export const meRouter = createTRPCRouter({
    cardHandle: cardHandleRouter,
    profile: profileRouter,
    cardbooks: cardBookRouter
})
