"use client"
import { OwnedCardInfo } from "~/models/card"

export function ShowOwnedCardInfo({ cardInfo: cardInfo }: {cardInfo: OwnedCardInfo}){
    return <div>
        <p>あなたのIDです。</p>
        <p>そのうち編集などができる予定。</p>
        <p>このページのURLを共有することで、あなたの名刺を見せることができます。</p>
    </div>
}
