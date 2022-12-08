import type { State as DisciplinesState } from "./disciplines/state";

type RootState = {
  disciplines: DisciplinesState;
};

export { type RootState };
