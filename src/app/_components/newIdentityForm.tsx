"use client";
import { useForm} from "react-hook-form";
import { Form, Button } from "react-aria-components";
import { CardHandle, CardHandleSchema} from "~/models/card";
import { TextField } from "./controlls/TextField";
import { api } from "~/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { TRPCClientError } from "@trpc/client";


export function NewIdentityForm() {
  const {data, isPending, mutate} = api.me.cardHandle.new.useMutation();
  const util = api.useUtils();
  const router = useRouter();
  const {
    control, 
    handleSubmit, 
    formState: { isValid, errors },
    setError,
    clearErrors
  } = useForm<CardHandle>({
    mode: "onBlur",
    resolver: zodResolver(CardHandleSchema),
    defaultValues: {
      displayName: "",
      handleName: ""
    }
  });

  const onSubmit = (data: CardHandle) => {
    mutate(data, {
      onSuccess: () => {
        console.log("success");
        void util.invalidate();
        router.push("/cardhandle");
      },
      onError: (error) => {
        console.log("error", error);
    }})
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <TextField name="displayName" control={control} label="表示名(*)"/>
      <TextField name="handleName" control={control} label="ID(*)(半角英数字)"/>
      <Button type="submit" isDisabled={!isValid || isPending}>
        登録
      </Button>
    </Form>
  );
}
