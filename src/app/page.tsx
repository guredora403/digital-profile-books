import Link from "next/link";
import { LatestPost } from "~/app/_components/post";
import { api, HydrateClient } from "~/trpc/server";
import { createClient } from "~/utils/supabase/server";
import UserMenu from "./_components/UserMenu";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <UserMenu/>
        <h1>ログイン済み</h1>
        <p>{user?.email}</p>
      </main>
    </HydrateClient>
  );
}
