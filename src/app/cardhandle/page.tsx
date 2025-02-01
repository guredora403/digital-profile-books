import { api, HydrateClient } from "~/trpc/server";
import IdentityList from "../_components/IdentityList";
import Link from "next/link";

export default function cardhandle(){
    void api.me.cardHandle.all.prefetch();
    return (
        <HydrateClient>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <h1>名刺ID一覧</h1>
            <Link href="/cardhandle/new">追加</Link>
            <IdentityList/>
        </main>
        </HydrateClient>
    );
}
