import { ENV } from "@/common/enums/enums";
import type { InjectionKey } from "vue";
import { createLogger, createStore, Store } from "vuex";
import { disciplines } from "./disciplines/disciplines";
import { faculties } from "./faculties/faculties";
import type { RootState } from "./root-state";

const isInDevelopmentEnvironment =
  ENV.APP.APPLICATION_ENVIRONMENT !== "production";

const key: InjectionKey<Store<RootState>> = Symbol();

const store: Store<RootState> = createStore<RootState>({
  modules: { disciplines, faculties },
  strict: isInDevelopmentEnvironment,
  plugins: isInDevelopmentEnvironment ? [createLogger()] : [],
});

export { store, key };
