import { z } from "zod";


export const ProfileSchema = z.object({
    title: z.string().min(2).max(50),
    content: z.string().min(1).max(1000)
},)

export type Profile = z.infer<typeof ProfileSchema>;

export type ProfileResponse = Profile & {
    id: number;
};
