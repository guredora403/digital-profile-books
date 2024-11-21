"use client"
import { createClient as supabaseBrowserClient } from "~/utils/supabase/client";

export default function UserMenu() {
    return (
        <div className="flex flex-col items-center gap-2">
        <button onClick={() => {
            console.log("signout")
            const browserSupabase = supabaseBrowserClient()
            browserSupabase.auth.signOut();
        }}>sign out</button>
        </div>
    )
}
