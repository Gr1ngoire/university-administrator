import type { State as DisciplinesState } from "./disciplines/state";
import type { State as FacultiesState } from "./faculties/state";

type RootState = {
  disciplines: DisciplinesState;
  faculties: FacultiesState;
};

export { type RootState };
