import { toast } from "vue3-toastify";

class Notification {
  success(message: string): void {
    toast.success(message);
  }

  error(message: string): void {
    toast.error(message);
  }
}

export { Notification };
