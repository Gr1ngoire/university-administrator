import {
  GroupsGetAllItemResponseDto,
  UsersGetAllItemResponseDto,
} from "../types";

type StudentsGetAllItemResponseDto = {
  id: number;
  userId: number;
  user: UsersGetAllItemResponseDto;
  groupId: number;
  group: GroupsGetAllItemResponseDto;
};

export { type StudentsGetAllItemResponseDto };
