import { api, HydrateClient } from "~/trpc/server";
import { ShowIdentityInfo } from "../_components/ShowIdentityInfo";


export default async function IdentityInfo({ params }: {params: Promise<{userid: string}>}) {
    const userid = (await params).userid
    void api.identity.getIdentityInfo.prefetch(userid)
    return (
        <HydrateClient>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <h1>詳細</h1>
            <ShowIdentityInfo userid={userid}/>
        </main>
        </HydrateClient>
    )
}
