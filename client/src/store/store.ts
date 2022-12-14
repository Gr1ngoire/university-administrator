import { ENV } from "@/common/enums/enums";
import type { InjectionKey } from "vue";
import { createLogger, createStore, Store } from "vuex";
import { departments } from "./departments/departments";
import { disciplines } from "./disciplines/disciplines";
import { faculties } from "./faculties/faculties";
import { groups } from "./groups/groups";
import { teachers } from "./teachers/teachers";
import type { RootState } from "./root-state";

const isInDevelopmentEnvironment =
  ENV.APP.APPLICATION_ENVIRONMENT !== "production";

const key: InjectionKey<Store<RootState>> = Symbol();

const store: Store<RootState> = createStore<RootState>({
  modules: { departments, disciplines, faculties, groups, teachers },
  strict: isInDevelopmentEnvironment,
  plugins: isInDevelopmentEnvironment ? [createLogger()] : [],
});

export { store, key };
