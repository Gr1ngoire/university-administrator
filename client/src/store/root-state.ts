import type { State as AdministrationState } from "./administration/state";

type RootState = {
  administration: AdministrationState;
};

export { type RootState };
