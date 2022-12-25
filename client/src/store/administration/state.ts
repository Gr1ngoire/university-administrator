import type { DataStatus } from "@/common/enums/enums";
import type {
  DepartmentsGetAllItemResponseDto,
  DisciplinesGetAllItemResponseDto,
  FacultiesGetAllItemResponseDto,
  GrantsGetAllItemAdminResponseDto,
  GroupsGetAllItemResponseDto,
  SchedulesGetAllItemResponseDto,
  StudentsGetAllItemResponseDto,
  TeachersGetAllItemResponseDto,
  UsersGetAllItemAdminResponseDto,
} from "@/common/types/types";

type State = {
  departments: DepartmentsGetAllItemResponseDto[];
  disciplines: DisciplinesGetAllItemResponseDto[];
  faculties: FacultiesGetAllItemResponseDto[];
  grants: GrantsGetAllItemAdminResponseDto[];
  groups: GroupsGetAllItemResponseDto[];
  schedules: SchedulesGetAllItemResponseDto[];
  students: StudentsGetAllItemResponseDto[];
  teachers: TeachersGetAllItemResponseDto[];
  users: UsersGetAllItemAdminResponseDto[];
  dataStatus: DataStatus;
};

export { type State };
