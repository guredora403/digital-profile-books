"use client"
import { Button } from "react-aria-components";
import { type CardInfo } from "~/models/card";
import { api } from "~/trpc/react";
import { ProfileView } from "./ProfileView";
import JSONPretty from "react-json-pretty";

export const ShowOtherCardInfo = ({ cardInfo: cardInfo }: { cardInfo: CardInfo }) => {
    const createMutation = api.me.cardbooks.create.useMutation();
    const removeMutation = api.me.cardbooks.delete.useMutation();
    const util = api.useUtils();    
    return <div>
        {cardInfo.addedToCardBook ? 
        <Button onPress={(_) => {
            removeMutation.mutate({targetId: cardInfo.id}, {
                onSuccess: () => {
                    void util.invalidate()
                },
                onError: (error) => {
                    //todo: error again
                    console.error(error)
                }
            });
        }}>登録解除</Button>: 
        <Button onPress={(_) => {
            createMutation.mutate({targetId: cardInfo.id}, {
                onSuccess: () => {
                    void util.invalidate()
                },
                onError: (error) => {
                    //todo: show error
                    console.error(error)
                }
            });
        }} isPending={createMutation.isPending}>名刺帳に登録</Button>}
        <p>{(cardInfo.addedToCardBook ? "登録済み" : "未登録")}</p>
        <h2>名刺の内容</h2>
        <ProfileView profiles={cardInfo.profiles} />
    </div>
}
