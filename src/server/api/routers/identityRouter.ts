import { z } from "zod";
import { createTRPCRouter, authorizedProcedure } from "../trpc";
import { IdentityInfo, IdentitySchema } from "~/models/identity";
import { Input } from "postcss";
import { TRPCError } from "@trpc/server";
import { OwnedIdentityInfo } from "~/models/identity";

export const identityRouter = createTRPCRouter({
    getIdentityInfo: authorizedProcedure
    .input(IdentitySchema.shape.userName)
    .query(async ({ input, ctx: { db, user } }) => {
        const identity = await db.identity.findFirst({
            where: {
                userName: input
            }
        })
        if(!identity) {
            throw new TRPCError({code: "NOT_FOUND", message: "The specified identity not found"})
        }
        if(identity.userId === user.id){
            return {
                id : identity.id,
                userName: identity.userName,
                displayName: identity.displayName,
            } as OwnedIdentityInfo;
        }
        const edge = await db.edgedUser.findUnique({
            where: {
                sourceId_targetUserId: {
                    sourceId: user.id,
                    targetUserId: identity.userId
                }
            },
            include: {
                targetIdentity: {
                    select: {
                        id: true,
                        userName: true,
                        displayName: true
                    }
                }
            },
        })
        return {
            id : identity.id,
            userName: identity.userName,
            displayName: identity.displayName,
            edged: !!edge,
            edgedToThisIdentity: identity.id === edge?.targetIdentityId, 
            edgedIdentity: edge?.targetIdentity
        } as IdentityInfo;
    }),
})
