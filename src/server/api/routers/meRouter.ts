import { createTRPCRouter } from "../trpc";
import { identityRouter } from "./me/identityRouter";
import { profileRouter } from "./me/profileRouter";

export const meRouter = createTRPCRouter({
    identity: identityRouter,
    profile: profileRouter
})
