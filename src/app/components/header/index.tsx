"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  showSuccessNotification,
  showErrorNotification,
} from "@/utils/notifications";
import { useRouter } from "next/navigation";
import { useLogoutMutation } from "@/utils/service/rtkQuery";
import { deleteSession } from "@/utils/service";

export const Header = () => {
  const router = useRouter();
  const [trigger] = useLogoutMutation();

  const handleSignOut = async () => {
    try {
      const response = await trigger("");

      if (response) {
        deleteSession();
        showSuccessNotification("Logged Out");
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      showErrorNotification({ message: "Failed to logout" });
      router.push("/");
      router.refresh();
    }
  };
  return (
    <header className="fixed top-0 right-4 bg-[#f4fbfd] flex justify-center items-center w-dvw h-[80px] z-[50]">
      <div className="relative w-1/2 flex justify-center items-center gap-4 font-bold">
        <Link href="/">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
      <div className="relative w-1/2 flex justify-center items-center gap-4">
        <Link href="/login">Login</Link>|
        <Button onClick={handleSignOut}>Signout</Button>
      </div>
    </header>
  );
};
