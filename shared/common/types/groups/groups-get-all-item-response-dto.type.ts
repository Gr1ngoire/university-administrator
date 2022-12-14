import { DepartmentsGetAllItemResponseDto } from "../types";

type GroupsGetAllItemResponseDto = {
  id: number;
  departmentId: number;
  name: string;
  course: number;
  department: DepartmentsGetAllItemResponseDto;
};

export { type GroupsGetAllItemResponseDto };
