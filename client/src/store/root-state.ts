import type { State as DisciplinesState } from "./disciplines/state";
import type { State as FacultiesState } from "./faculties/state";
import type { State as TeachersState } from "./teachers/state";

type RootState = {
  disciplines: DisciplinesState;
  faculties: FacultiesState;
  teachers: TeachersState;
};

export { type RootState };
