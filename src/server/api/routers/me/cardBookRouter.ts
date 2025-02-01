import { z } from "zod";
import { createTRPCRouter, authorizedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const cardBookRouter = createTRPCRouter({
    all: authorizedProcedure.query(async ({ ctx: { db, user } }) => {
        const entryes = await db.cardBookEntry.findMany({
            where: {
                ownerId: user.id
            },
            include: {
                card: {
                    select: {
                        id: true,
                        displayName: true,
                        handleName: true
                    }
                }
            }
        })
        return entryes.map((entry) => entry.card);
    }),
    create: authorizedProcedure
        .input(z.object({targetId: z.number()}))
        .mutation(async ({ input, ctx: { db, user } }) => {
            const { targetId: targetId } = input
            const cardHandle = await db.cardHandle.findUnique({
                where: {
                    id: targetId
                }
            })
            if (!cardHandle) {
                throw new TRPCError({code: "NOT_FOUND", message: "Identity not found"})
            }
            if(cardHandle.ownerId === user.id) {
                throw new TRPCError({code: "BAD_REQUEST", message: "Cannot edge self"})
            }
            try {
                const created = await db.cardBookEntry.create({
                    data: {
                        ownerId: user.id,
                        cardHandleId: targetId
                    }
                })
                return {success: true}
            } catch(e) {
                if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
                    // todo: メッセージちゃんと書く
                    throw new TRPCError({code: "BAD_REQUEST", message: "Edge already exists"})
                }
            }
        }),
        delete: authorizedProcedure
        .input(z.object({targetId: z.number()}))
        .mutation(async ({ input, ctx: { db, user } }) => {
            const { targetId } = input
            const cardhandle = await db.cardHandle.findUnique({
                where: {
                    id: targetId
                }
            })
            if (!cardhandle) {
                throw new TRPCError({code: "NOT_FOUND", message: "Identity not found"})
            }
            const deleted = await db.cardBookEntry.delete({
                where: {
                    ownerId_cardHandleId: {
                        ownerId: user.id,
                        cardHandleId: targetId
                    },
                }
            })
        return {
            success: true,
            deleted: deleted.cardHandleId
        }
    }),
})
