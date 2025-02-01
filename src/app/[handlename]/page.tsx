import { api } from "~/trpc/server";
import { ShowCardInfo } from "../_components/ShowIdentityInfo";
import { type CardInfo,  isOwnedCardInfo } from "~/models/card";
import { ShowOwnedCardInfo } from "../_components/ShowOwnedIdentityInfo";
import { ShowOtherCardInfo } from "../_components/ShowOtherIdentityInfo";
import Link from "next/link";
import { TRPCError } from "@trpc/server";
import JsonPrity from "react-json-pretty";

const BaseComponent = function ({ children }: {children: React.ReactNode}) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <h1>詳細</h1>
            {children}
        </main>
    )
}

export default async function IdentityInfo({ params }: {params: Promise<{handlename: string}>}) {
    const handlename = (await params).handlename
    try {
        const cardInfo = await api.card.getCardInfo(handlename)
        
        return (
            <BaseComponent>
                {isOwnedCardInfo(cardInfo) ? <ShowOwnedCardInfo cardInfo={cardInfo} /> : <ShowOtherCardInfo cardInfo={cardInfo as CardInfo} />}
            </BaseComponent>
        )
    }
    catch(e) {
        if (e instanceof TRPCError) {
            if (e.code === 'NOT_FOUND') {
                return <BaseComponent>
                    <h2>対応する名刺が見つかりませんでした</h2>
                    <p>指定されたIDに対応する名刺が見つかりませんでした。</p>
                    <Link href="/"> ホームに戻る</Link>
                </BaseComponent>
            }
        }
        else {
            throw e
        }
    }
}

