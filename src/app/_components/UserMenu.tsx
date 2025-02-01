"use client"
import { createClient as supabaseBrowserClient } from "~/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { Button } from "react-aria-components";


export default function UserMenu() {
    const router = useRouter();
    const [supabase, setSupabase] = useState<ReturnType<typeof supabaseBrowserClient> | null>(null);
    const [user, setUser] = useState<User | null | "pending">("pending");
    useEffect(() => {
        const _client = supabaseBrowserClient();
        _client.auth.getUser()
        .then((user) => {
            console.log(user)
            void setUser(user.data.user)
        })
        setSupabase(_client)
        return () => {return}
    }, [])
    if(user === "pending") return <div>loading...</div>
    if(user !== null) return (
        <div className="flex flex-col items-center gap-2">
        <Button onPress={() => {
            console.log("signout")
            void supabase?.auth.signOut();
            router.refresh();
            router.push("/login")
        }}>sign out</Button>
        <p> ログイン済み: <span>{user.email}</span></p>
        </div>
    )
    return (
        <div className="flex flex-col items-center gap-2">
        <button onClick={() => {
            router.push("/login")
        }}>sign in</button>
        <p> ログインしていません</p>
        </div>
    )
}
