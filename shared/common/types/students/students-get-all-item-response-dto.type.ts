import {
  GroupsGetAllItemResponseDto,
  UsersGetAllItemAdminResponseDto,
} from "../types";

type StudentsGetAllItemResponseDto = {
  id: number;
  userId: number;
  user: UsersGetAllItemAdminResponseDto;
  groupId: number;
  group: GroupsGetAllItemResponseDto;
};

export { type StudentsGetAllItemResponseDto };
