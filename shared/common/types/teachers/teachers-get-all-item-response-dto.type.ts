import { UsersGetAllItemResponseDto } from "../types";

type TeachersGetAllItemResponseDto = {
  id: number;
  userId: number;
  user: UsersGetAllItemResponseDto;
};

export { type TeachersGetAllItemResponseDto };
