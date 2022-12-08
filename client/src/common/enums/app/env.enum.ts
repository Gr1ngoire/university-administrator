import type { AppEnvironment } from "./app-environment.enum";

const { ENVIRONMENT } = process.env;

const ENV = {
  APP: {
    APPLICATION_ENVIRONMENT: <AppEnvironment>ENVIRONMENT,
  },
};

export { ENV };
