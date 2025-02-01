"use client";
import { api } from "~/trpc/react";
import { type CardInfo,  isOwnedCardInfo } from "~/models/card";
import { ShowOwnedCardInfo } from "./ShowOwnedIdentityInfo";
import { ShowOtherCardInfo } from "./ShowOtherIdentityInfo";
import Link from "next/link";


export const ShowCardInfo = ({ handlename: handlename }: { handlename: string }) => {
    const [cardInfo, queryInfo] = api.card.getCardInfo.useSuspenseQuery(handlename);
    if(queryInfo.error?.data?.code === "NOT_FOUND"){
        return <div>
            <h2>対応する名刺が見つかりませんでした</h2>
            <p>指定されたIDに対応する名刺が見つかりませんでした。</p>
            <Link href="/"> ホームに戻る</Link>
        </div>
    }
    return <div>
        <h2>
            {cardInfo.displayName}
        </h2>
        <p>{cardInfo.handleName}</p>
        {isOwnedCardInfo(cardInfo) ? <ShowOwnedCardInfo cardInfo={cardInfo} /> : <ShowOtherCardInfo cardInfo={cardInfo as CardInfo} />}
    </div>
}
