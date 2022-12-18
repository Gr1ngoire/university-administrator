import { UsersGetAllItemResponseDto } from "../types";

type StudentsGetAllItemResponseDto = {
  id: number;
  userId: number;
  user: UsersGetAllItemResponseDto;
};

export { type StudentsGetAllItemResponseDto };
