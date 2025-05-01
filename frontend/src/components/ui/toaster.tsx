"use client";

import { useEffect, useState } from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastTitle,
} from "@/components/ui/toast";

export type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  variant?: "default" | "destructive" | "success" | "warning";
  action?: React.ReactNode;
  duration?: number;
};

export const Toaster = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    const handleToast = (event: CustomEvent<ToastProps>) => {
      const {
        id,
        title,
        description,
        variant,
        action,
        duration = 5000,
      } = event.detail;

      setToasts((prevToasts) => [
        ...prevToasts,
        { id, title, description, variant, action, duration },
      ]);

      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id)
        );
      }, duration);
    };

    document.addEventListener("toast", handleToast as EventListener);

    return () =>
      document.removeEventListener("toast", handleToast as EventListener);
  }, []);

  const handleClose = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div className="fixed top-0 z-[100] flex flex-col gap-2 p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col-reverse md:max-w-[420px]">
      {toasts.map(({ id, title, description, variant, action }) => (
        <Toast key={id} variant={variant} className="group">
          <div className="flex-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose onClick={() => handleClose(id)} />
        </Toast>
      ))}
    </div>
  );
};
