import { api, HydrateClient } from "~/trpc/server";
import CardList from "../_components/CardList";

export default function identity(){
    void api.me.cardbooks.all.prefetch();
    return (
        <HydrateClient>
        <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
            <h1>名刺帳</h1>
            <CardList/>
        </main>
        </HydrateClient>
    );
}
