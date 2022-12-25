import { Grants } from "../../enums/enums";
import { UsersGetAllItemAdminResponseDto } from "../types";

type GrantsGetAllItemAdminResponseDto = {
  id: number;
  userId: number;
  user: UsersGetAllItemAdminResponseDto;
  grant: Grants;
  granterId: number | null;
  granter: UsersGetAllItemAdminResponseDto | null;
};

export { type GrantsGetAllItemAdminResponseDto };
