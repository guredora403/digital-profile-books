import { z } from "zod";
import { createTRPCRouter, authorizedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const edgesRouter = createTRPCRouter({
    all: authorizedProcedure.query(async ({ ctx: { db, user } }) => {
        const edges = await db.edgedUser.findMany({
            where: {
                sourceId: user.id
            },
            include: {
                targetIdentity: {
                    select: {
                        id: true,
                        displayName: true,
                        userName: true
                    }
                }
            }
        })
        return edges.map((edge) => edge.targetIdentity);
    }),
    create: authorizedProcedure
        .input(z.object({targetId: z.number()}))
        .mutation(async ({ input, ctx: { db, user } }) => {
            const { targetId } = input
            const identity = await db.identity.findUnique({
                where: {
                    id: targetId
                }
            })
            if (!identity) {
                throw new TRPCError({code: "NOT_FOUND", message: "Identity not found"})
            }
            if(identity.userId === user.id) {
                throw new TRPCError({code: "BAD_REQUEST", message: "Cannot edge self"})
            }
            try {
                const created = await db.edgedUser.create({
                    data: {
                        sourceId: user.id,
                        targetUserId: identity.userId,
                        targetIdentityId: targetId
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
})
