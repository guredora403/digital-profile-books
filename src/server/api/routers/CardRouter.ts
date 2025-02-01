import { z } from "zod";
import { createTRPCRouter, authorizedProcedure } from "../trpc";
import { type CardInfo, CardHandleSchema } from "~/models/card";
import { Input } from "postcss";
import { TRPCError } from "@trpc/server";
import type { OwnedCardInfo } from "~/models/card";

export const cardRouter = createTRPCRouter({
    getCardInfo: authorizedProcedure
    .input(CardHandleSchema.shape.handleName)
    .query(async ({ input, ctx: { db, user } }) => {
        const card = await db.cardHandle.findFirst({
            where: {
                handleName: input
            },
            include: {
                owner: {
                    select: {
                        profiles: {
                            select: {
                                id: true,
                                title: true,
                                content: true
                            }
                        }
                    }
                }
            }
        })
        if(!card) {
            throw new TRPCError({code: "NOT_FOUND", message: "The specified identity not found"})
        }
        if(card.ownerId === user.id){
            return {
                id : card.id,
                handleName: card.handleName,
                displayName: card.displayName,
            } as OwnedCardInfo;
        }
        const entry = await db.cardBookEntry.findUnique({
            where: {
                ownerId_cardHandleId: {
                    ownerId: user.id,
                    cardHandleId: card.id
                }
            },
            include: {
                card: {
                    select: {
                        id: true,
                        handleName: true,
                        displayName: true
                    }
                }
            },
        })
        return {
            id : card.id,
            handleName: card.handleName,
            displayName: card.displayName,
            addedToCardBook: !!entry,
            profiles: card.owner.profiles
        } as CardInfo;
    }),
})
