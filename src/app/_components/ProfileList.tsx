"use client";
import { api } from "~/trpc/react";
import { ProfileView } from "./ProfileView";

export function ProfileList() {
    const [profiles] = api.me.profile.all.useSuspenseQuery();
    return <ProfileView profiles={profiles} />;
}
