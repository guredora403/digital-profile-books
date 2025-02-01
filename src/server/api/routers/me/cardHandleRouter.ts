import { z } from "zod";
import { createTRPCRouter, authorizedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { CardHandleSchema } from "~/models/card";

export const cardHandleRouter = createTRPCRouter({
    all: authorizedProcedure.query(async ({ ctx: { db, user } }) => {
        const myData = await db.user.findUnique({
            where: {
                id: user.id
            },
            include: {
                cardHandles:true
            }
        })
        if(!myData) {
            throw new TRPCError({code: "FORBIDDEN", message: "user not found"})
        }
        return myData.cardHandles
    }),
    new: authorizedProcedure
        .input(CardHandleSchema)
        .mutation(async ({ input, ctx: { db, user } }) => {
            const newCardHandle = await db.cardHandle.create({
                data: {
                    displayName: input.displayName,
                    handleName: input.handleName,
                    ownerId: user.id
                }
            })
            return newCardHandle
        }),
    delete: authorizedProcedure
        .input(z.object({id: z.number()}))
        .mutation(async ({ input, ctx: { db, user } }) => {
            const deleteUser = await db.cardHandle.delete({
                where: {
                    id: input.id,
                    ownerId: user.id
                }
            })
            return true
        }),
})
