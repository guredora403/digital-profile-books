"use client";
import { useForm} from "react-hook-form";
import { Form, Button } from "react-aria-components";
import { Identity, IdentitySchema} from "~/models/identity";
import { TextField } from "./controlls/TextField";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const isUserNameAvailable = async (userName: String) => {
  console.log("isUserNameAvailable", userName);
  return true
}

export function NewIdentityForm() {
  const {data, isPending, mutate} = api.me.identity.new.useMutation();
  const util = api.useUtils();
  const router = useRouter();
  const {
    control, 
    handleSubmit, 
    formState: { isValid, errors },
    setError,
    clearErrors
  } = useForm<Identity>({
    mode: "onBlur",
    resolver: zodResolver(IdentitySchema.extend({
      userName: IdentitySchema.shape.userName.refine(async (userName) => {
        try {
          const result = await util.userName.isAvailable.fetch(userName);
          return result.isAvailable;
        } catch (error) {
          console.log(error);
          return false;
        }
      }, { message: "ユーザー名は既に使用されています。"})
    })),
    defaultValues: {
      displayName: "",
      userName: ""
    }
  });

  const onSubmit = (data: Identity) => {
    mutate(data, {
      onSuccess: () => {
        console.log("success");
        router.push("/identity");
      },
      onError: (error) => {
        console.log("error", error);
    }})
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField name="displayName" control={control} label="表示名(*)"/>
      <TextField name="userName" control={control} label="ユーザー名(*)"/>
      <Button type="submit" isDisabled={!isValid || isPending}>
        登録
      </Button>
    </Form>
  );
}
