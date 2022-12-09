import type { AppEnvironment } from "./app-environment.enum";

const { ENVIRONMENT, API_PATH } = process.env;

const ENV = {
  API: {
    PATH: API_PATH as string,
  },
  APP: {
    APPLICATION_ENVIRONMENT: <AppEnvironment>ENVIRONMENT,
  },
};

export { ENV };
