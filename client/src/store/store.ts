import { ENV } from "@/common/enums/enums";
import type { InjectionKey } from "vue";
import { createLogger, createStore, Store } from "vuex";
import { administration } from "./administration/administration";
import { auth } from "./auth/auth";
import { faq } from "./faq/faq";
import { news } from "./news/news";
import { publicSchedule } from "./public-schedule/public-schedule";
import type { RootState } from "./root-state";

const isInDevelopmentEnvironment =
  ENV.APP.APPLICATION_ENVIRONMENT !== "production";

const key: InjectionKey<Store<RootState>> = Symbol();

const store: Store<RootState> = createStore<RootState>({
  modules: {
    administration,
    auth,
    faq,
    news,
    publicSchedule,
  },
  strict: isInDevelopmentEnvironment,
  plugins: isInDevelopmentEnvironment ? [createLogger()] : [],
});

export { store, key };
