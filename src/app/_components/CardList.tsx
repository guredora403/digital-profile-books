"use client";
import Link from "next/link";
import { api } from "~/trpc/react";

export default function CardList() {
    const [result] = api.me.cardbooks.all.useSuspenseQuery()
    return <>
        {result.map((card) => {
            return <div key={card.id}>
                <p>
                    <Link href={"/" + card.handleName}>{card.displayName} </Link>
                </p>
            </div>
        })}
    </>
}