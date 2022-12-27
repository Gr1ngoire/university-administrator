import { toast } from "vue3-toastify";

class Notification {
  error(message: string): void {
    toast.error(message);
  }
}

export { Notification };
