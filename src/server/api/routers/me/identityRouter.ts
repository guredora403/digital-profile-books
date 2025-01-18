import { z } from "zod";
import { createTRPCRouter, authorizedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { IdentitySchema, IdentityWithUniqueUserNameSchema } from "~/models/identity";

export const identityRouter = createTRPCRouter({
    all: authorizedProcedure.query(async ({ ctx: { db, user } }) => {
        const myData = await db.user.findUnique({
            where: {
                id: user.id
            },
            include: {
                identities:true
            }
        })
        if(!myData) {
            throw new TRPCError({code: "FORBIDDEN", message: "user not found"})
        }
        return myData.identities
    }),
    new: authorizedProcedure
        .input(IdentityWithUniqueUserNameSchema)
        .mutation(async ({ input, ctx: { db, user } }) => {
            const newIdentity = await db.identity.create({
                data: {
                    displayName: input.displayName,
                    userName: input.userName,
                    userId: user.id
                }
            })
            return newIdentity
        }),
    delete: authorizedProcedure
        .input(z.object({id: z.number()}))
        .mutation(async ({ input, ctx: { db, user } }) => {
            const deleteUser = await db.identity.delete({
                where: {
                    id: input.id,
                    userId: user.id
                }
            })
            return true
        }),
})
