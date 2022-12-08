import { AppEnvironment } from "./app-environment.enum";

const { MODE } = process.env;

const ENV = {
  APP: {
    APPLICATION_MODE: MODE,
  },
};

export { ENV };
