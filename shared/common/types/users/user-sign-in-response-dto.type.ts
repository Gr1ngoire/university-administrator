import type { UserWithGrantDto } from "./user-with-grant-dto.type";

type UserSignInResponseDto = {
  token: string;
  user: UserWithGrantDto;
};

export { type UserSignInResponseDto };
