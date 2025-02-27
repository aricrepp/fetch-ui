"use client";

import {
  showSuccessNotification,
  showErrorNotification,
} from "@/utils/notifications";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FormFields, schema } from "./schema";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { useLoginMutation } from "@/utils/service/rtkQuery";

export const LoginForm = () => {
  const router = useRouter();

  const [trigger] = useLoginMutation();

  const loginForm = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const handleOnSubmit = async (formField: FormFields) => {
    try {
      const payload = await trigger(formField).unwrap();
      if (payload.message === "OK") {
        showSuccessNotification("Login Successful");
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      showErrorNotification({ message: "Failed to login" });
      router.push("/");
      router.refresh();
    }
  };

  return (
    <form
      className="flex justify-center items-center bg-gray-500 w-dvw h-dvh"
      onSubmit={loginForm.handleSubmit(handleOnSubmit)}
    >
      <Card className="w-[350px] h-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...loginForm.register("name")} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" {...loginForm.register("email")} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Login</Button>
        </CardFooter>
      </Card>
    </form>
  );
};
