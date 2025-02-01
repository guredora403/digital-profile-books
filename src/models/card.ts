import { z } from "zod";
import { type ProfileResponse } from "./profile";


export const CardHandleSchema = z.object({
    displayName: z.string().min(2, "表示名は２文字以上である必要があります。")
    .max(100, "表示名は100文字以下である必要があります。"),
    handleName: z.string().min(2, "IDは２文字以上である必要があります。")
    .max(50, "IDは100文字以下である必要があります。")
    .regex(/^[a-zA-Z0-9_]+$/, "IDは半角英数字とアンダースコアのみ使用できます。"),
},)

export type CardHandle = z.infer<typeof CardHandleSchema>;

export type CardInfo = {
    id: number;
    displayName: string;
    handleName: string;
    addedToCardBook: boolean;
    profiles: ProfileResponse[];
}

export type OwnedCardInfo = {
    id: number;
    handleName: string;
    displayName: string;
}

export function isOwnedCardInfo(card: CardInfo | OwnedCardInfo) {
    return !('addedToCardBook' in card)
}
