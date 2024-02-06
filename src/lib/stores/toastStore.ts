import { type Writable, writable } from "svelte/store";

// toast type interface
export interface Toast {
  id: number;
  type: "info" | "success" | "warning" | "error";
  message: string;
  duration: number;
  dismissable: boolean;
}

export const toasts: Writable<Toast[]> = writable([]);
export function addToast(toast: Toast) {
  // create id to identify the toast
  const id = Math.floor(Math.random() * 10000);

  // define default values for the toast
  const defaults: Toast = {
    id,
    type: "info",
    message: "",
    duration: 3000,
    dismissable: true
  };

  // add the toast to the store, push it to the top of the array
  toasts.update((toasts) => [{ ...defaults, ...toast }, ...toasts]);

  // if the toast is dismissable, remove it after the duration
  if (toast.dismissable) {
    setTimeout(() => removeToast(id), toast.duration);
  }
}

export function removeToast(id: number) {
  toasts.update((toasts) => toasts.filter((toast) => toast.id !== id));
}

