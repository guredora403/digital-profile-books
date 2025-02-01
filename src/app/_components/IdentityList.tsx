"use client";
import { api } from "~/trpc/react";

export default function IdentityList() {
    const [result] = api.me.cardHandle.all.useSuspenseQuery();
    return <>
        {result.map((identity) => {
            return <div key={identity.id}>
                <p>{identity.displayName}</p>
                <p>{identity.handleName}</p>
            </div>
        })}
    </>
}