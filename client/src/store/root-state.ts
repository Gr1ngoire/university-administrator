import type { State as DepartmentsState } from "./departments/state";
import type { State as DisciplinesState } from "./disciplines/state";
import type { State as FacultiesState } from "./faculties/state";
import type { State as TeachersState } from "./teachers/state";

type RootState = {
  departments: DepartmentsState;
  disciplines: DisciplinesState;
  faculties: FacultiesState;
  teachers: TeachersState;
};

export { type RootState };
