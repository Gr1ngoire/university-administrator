import type { AppEnvironment } from "./app-environment.enum";

const { VITE_ENVIRONMENT, VITE_API_PATH } = import.meta.env;

const ENV = {
  API: {
    PATH: VITE_API_PATH,
  },
  APP: {
    APPLICATION_ENVIRONMENT: <AppEnvironment>VITE_ENVIRONMENT,
  },
};

export { ENV };
