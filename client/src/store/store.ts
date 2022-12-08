import { ENV } from "@/common/enums/enums";
import type { InjectionKey } from "vue";
import { createLogger, createStore, Store } from "vuex";
import { module as disciplinesModule } from "./disciplines/module";
import type { RootState } from "./root-state";

const isInDevelopmentEnvironment =
  ENV.APP.APPLICATION_ENVIRONMENT !== "production";

const key: InjectionKey<Store<RootState>> = Symbol();

const store = createStore<RootState>({
  modules: { disciplinesModule },
  strict: isInDevelopmentEnvironment,
  plugins: isInDevelopmentEnvironment ? [createLogger()] : [],
});

export { store, key };
