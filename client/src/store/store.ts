import { ENV } from "@/common/enums/enums";
import type { InjectionKey } from "vue";
import { createLogger, createStore, Store } from "vuex";
import { administration } from "./administration/administration";
import { news } from "./news/news";
import type { RootState } from "./root-state";

const isInDevelopmentEnvironment =
  ENV.APP.APPLICATION_ENVIRONMENT !== "production";

const key: InjectionKey<Store<RootState>> = Symbol();

const store: Store<RootState> = createStore<RootState>({
  modules: {
    administration,
    news,
  },
  strict: isInDevelopmentEnvironment,
  plugins: isInDevelopmentEnvironment ? [createLogger()] : [],
});

export { store, key };
