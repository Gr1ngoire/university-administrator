import {
  DepartmentsGetAllItemResponseDto,
  UsersGetAllItemResponseDto,
} from "../types";

type TeachersGetAllItemResponseDto = {
  id: number;
  userId: number;
  user: UsersGetAllItemResponseDto;
  departmentId: number;
  department: DepartmentsGetAllItemResponseDto;
};

export { type TeachersGetAllItemResponseDto };
