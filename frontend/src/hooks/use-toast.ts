"use client";

import { useCallback } from "react";
import { ToastProps } from "@/components/ui/toaster";

type ToastOptions = Omit<ToastProps, "id">;
const generateId = () => Math.random().toString(36).substring(2, 9);

export const useToast = () => {
  const toast = useCallback((options: ToastOptions) => {
    const id = generateId();
    
    const toastEvent = new CustomEvent("toast", {
      detail: {
        id,
        ...options,
      },
    });

    document.dispatchEvent(toastEvent);

    return {
      id,
      dismiss: () => {
        const dismissEvent = new CustomEvent("dismiss-toast", {
          detail: { id },
        });
        document.dispatchEvent(dismissEvent);
      },
    };
  }, []);

  return { toast };
};