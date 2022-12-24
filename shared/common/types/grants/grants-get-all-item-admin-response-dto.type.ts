import { UsersGetAllItemAdminResponseDto } from "../types";

type GrantsGetAllItemAdminResponseDto = {
  id: number;
  userId: number;
  user: UsersGetAllItemAdminResponseDto;
  grant: string;
  granterId: number | null;
  granter: UsersGetAllItemAdminResponseDto | null;
};

export { type GrantsGetAllItemAdminResponseDto };
