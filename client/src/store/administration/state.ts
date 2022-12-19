import type { DataStatus } from "@/common/enums/enums";
import type {
  DepartmentsGetAllItemResponseDto,
  DisciplinesGetAllItemResponseDto,
  FacultiesGetAllItemResponseDto,
  GroupsGetAllItemResponseDto,
  SchedulesGetAllItemResponseDto,
  StudentsGetAllItemResponseDto,
  TeachersGetAllItemResponseDto,
  UsersGetAllItemResponseDto,
} from "@/common/types/types";

type State = {
  departments: DepartmentsGetAllItemResponseDto[];
  disciplines: DisciplinesGetAllItemResponseDto[];
  faculties: FacultiesGetAllItemResponseDto[];
  groups: GroupsGetAllItemResponseDto[];
  schedules: SchedulesGetAllItemResponseDto[];
  students: StudentsGetAllItemResponseDto[];
  teachers: TeachersGetAllItemResponseDto[];
  users: UsersGetAllItemResponseDto[];
  dataStatus: DataStatus;
};

export { type State };
