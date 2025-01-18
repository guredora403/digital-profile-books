"use client"
import { createClient } from "~/utils/supabase/client"
import { Auth } from "@supabase/auth-ui-react"
import { useEffect, useState } from "react"
import { env } from "~/env"

export default function Page() {
    const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null)
    useEffect(() => {
        setSupabase(createClient())
        return () => {}
    }, [])
    return <div>
        <h1>Supabase Auth</h1>
        {supabase && <Auth supabaseClient={supabase} providers={["github", "discord"]} onlyThirdPartyProviders={(env.NODE_ENV === "development")} redirectTo="http://localhost:3000/auth/callback"/>}
    </div>
}
