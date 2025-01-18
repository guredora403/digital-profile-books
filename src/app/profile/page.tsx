import { api, HydrateClient } from "~/trpc/server";
import { ProfileList } from "../_components/ProfileList";
import Link from "next/link";


export default function profile(){
    void api.me.profile.all.prefetch();
    return (
        <HydrateClient>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <h1>プロフィール一覧</h1>
            <Link href="/profile/new">追加</Link>
            <ProfileList/>
        </main>
        </HydrateClient>
    );
}
