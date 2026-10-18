import { createContext, useContext } from "react";

export const ToastContext = createContext<((message: string) => void) | null>(
  null,
);

export const useToast = () => {
  const toast = useContext(ToastContext);
  if (!toast) throw new Error("useToast must be called inside <ToastProvider>.");
  return toast;
};
