import {
  DisciplinesGetAllItemResponseDto,
  GroupsGetAllItemResponseDto,
  TeachersGetAllItemResponseDto,
} from "../types";

type SchedulesGetAllItemResponseDto = {
  id: number;
  teacherId: number;
  disciplineId: number;
  groupId: number;
  time: string;
  classroom: string;
  teacher: TeachersGetAllItemResponseDto;
  discipline: DisciplinesGetAllItemResponseDto;
  group: GroupsGetAllItemResponseDto;
};

export { type SchedulesGetAllItemResponseDto };
