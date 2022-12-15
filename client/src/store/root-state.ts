import type { State as DepartmentsState } from "./departments/state";
import type { State as DisciplinesState } from "./disciplines/state";
import type { State as FacultiesState } from "./faculties/state";
import type { State as GroupsState } from "./groups/state";
import type { State as SchedulesState } from "./schedules/state";
import type { State as StudentsState } from "./students/state";
import type { State as TeachersState } from "./teachers/state";

type RootState = {
  departments: DepartmentsState;
  disciplines: DisciplinesState;
  faculties: FacultiesState;
  groups: GroupsState;
  schedules: SchedulesState;
  students: StudentsState;
  teachers: TeachersState;
};

export { type RootState };
