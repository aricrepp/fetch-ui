import { toast } from "react-hot-toast";
import { ToastNotification } from "@/types";

export const showSuccessNotification = (message: string) =>
  toast.success(message);

export const showErrorNotification = (args: ToastNotification) => {
  const message = args.message;
  toast.error(message ?? "Something went wrong");
};

export const showInfoNotification = (message: string) => toast(message);
