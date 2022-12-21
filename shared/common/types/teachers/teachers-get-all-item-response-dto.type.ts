import {
  DepartmentsGetAllItemResponseDto,
  UsersGetAllItemAdminResponseDto,
} from "../types";

type TeachersGetAllItemResponseDto = {
  id: number;
  userId: number;
  user: UsersGetAllItemAdminResponseDto;
  departmentId: number;
  department: DepartmentsGetAllItemResponseDto;
};

export { type TeachersGetAllItemResponseDto };
