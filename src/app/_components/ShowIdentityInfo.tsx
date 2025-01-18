"use client";
import { api } from "~/trpc/react";
import { IdentityInfo, OwnedIdentityInfo, isOwnedIdentityInfo } from "~/models/identity";
import { ShowOwnedIdentityInfo } from "./ShowOwnedIdentityInfo";
import { ShowOtherIdentityInfo } from "./ShowOtherIdentityInfo";

export const ShowIdentityInfo = ({ userid: userid }: { userid: string }) => {
    const [identityInfo] = api.identity.getIdentityInfo.useSuspenseQuery(userid);
    return <div>
        <h2>
            {identityInfo.displayName}
        </h2>
        <p>{identityInfo.userName}</p>
        {isOwnedIdentityInfo(identityInfo) ? <ShowOwnedIdentityInfo identityInfo={identityInfo} /> : <ShowOtherIdentityInfo identityInfo={identityInfo as IdentityInfo} />}
    </div>
}
