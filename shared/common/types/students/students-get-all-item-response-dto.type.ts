import { GroupsGetAllItemResponseDto } from "../types";

type StudentsGetAllItemResponseDto = {
  id: number;
  groupId: number;
  name: string;
  email: string;
  phone: string;
  group: GroupsGetAllItemResponseDto;
};

export { type StudentsGetAllItemResponseDto };
