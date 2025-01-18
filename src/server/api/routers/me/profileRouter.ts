import { z } from "zod";
import { createTRPCRouter, authorizedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { ProfileSchema } from "~/models/profile";

export const profileRouter = createTRPCRouter({
    all: authorizedProcedure.query(async({ ctx: {db, user}}) => {
        const mydata = await db.user.findUnique({
            where: {
                id: user.id
            },
            include: {
                profiles: true
            }
        })
        if(!mydata){
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "User not found"
            })
        }
        return mydata.profiles
    }),
    new: authorizedProcedure
        .input(ProfileSchema)
        .mutation(async({input, ctx: {db, user}}) => {
            const newProfile = db.profile.create({
                data: {
                    title: input.title,
                    content: input.content,
                    userId: user.id
                }
            })
            return newProfile
        }),
})
