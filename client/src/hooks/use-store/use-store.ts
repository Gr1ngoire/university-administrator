import { Store, useStore as initialUseStore } from "vuex";
import { key } from "@/store/store";
import type { RootState } from "@/store/root-state";

const useStore: () => Store<RootState> = () => {
  return initialUseStore(key);
};

export { useStore };
