"use client";
import { api } from "~/trpc/react";

export default function IdentityList() {
    const [result] = api.me.identity.all.useSuspenseQuery();
    return <>
        {result.map((identity) => {
            return <div key={identity.id}>
                <p>{identity.displayName}</p>
                <p>{identity.userName}</p>
            </div>
        })}
    </>
}