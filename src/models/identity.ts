import { z } from "zod";


export const IdentitySchema = z.object({
    displayName: z.string().min(2).max(100),
    userName: z.string().min(2).max(100)
},)

export const IdentityWithUniqueUserNameSchema = IdentitySchema.extend({
    userName: IdentitySchema.shape.userName.refine(async (userName) => {
        if (typeof window === 'undefined') {
            const { db } = await import('~/server/db');
            const exist = await db.identity.findUnique({where: {userName}})
            return !exist
        }
        return true
    }, {message: "ユーザー名がすでに利用されています。"})
})

export type Identity = z.infer<typeof IdentitySchema>;

export const UniqueUserNameSchema = IdentityWithUniqueUserNameSchema.shape.userName

export type IdentityInfo = {
    id: number;
    userName: String;
    displayName: String;
    edged: boolean;
    edgedToThisIdentity: boolean;
    edgedIdentity?: Identity & {
        id: number;
    };
}

export type OwnedIdentityInfo = {
    id: number;
    userName: String;
    displayName: String;
}

export function isOwnedIdentityInfo(identity: IdentityInfo | OwnedIdentityInfo) {
    return !('edged' in identity)
}
