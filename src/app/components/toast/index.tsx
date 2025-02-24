"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Toaster } from "react-hot-toast";

export const AppToaster = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted
    ? createPortal(
        <Toaster
          position="top-center"
          reverseOrder={false}
          containerStyle={{
            textAlign: "center",
            zIndex: "9999999",
            fontSize: "15px",
          }}
          toastOptions={{
            style: { background: "#101826", color: "white" },
          }}
        />,
        document.getElementById("toaster-root") as HTMLElement
      )
    : null;
};
