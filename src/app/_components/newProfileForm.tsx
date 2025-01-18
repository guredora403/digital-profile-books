"use client";
import { useForm} from "react-hook-form";
import { Form, Button } from "react-aria-components";
import { Profile, ProfileSchema } from "~/models/profile";
import { TextField } from "./controlls/TextField";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export function NewProfileForm() {
  const {data, isPending, mutate} = api.me.profile.new.useMutation();
  const util = api.useUtils();
  const router = useRouter();
  const {
    control, 
    handleSubmit, 
    formState: { isValid, errors },
    setError,
    clearErrors
  } = useForm<Profile>({
    mode: "onBlur",
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      title: "",
      content: ""
    }
  });

  const onSubmit = (data: Profile) => {
    mutate(data, {
      onSuccess: () => {
        console.log("success");
        router.push("/profile");
      },
      onError: (error) => {
        console.log("error", error);
    }})
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField name="title" control={control} label="タイトル(*)"/>
      <TextField name="content" control={control} label="内容(*)"/>
      <Button type="submit" isDisabled={!isValid || isPending}>
        登録
      </Button>
    </Form>
  );
}
