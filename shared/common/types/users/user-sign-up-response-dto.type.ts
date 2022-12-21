import type { UserWithGrantDto } from "./user-with-grant-dto.type";

type UserSignUpResponseDto = {
  token: string;
  user: UserWithGrantDto;
};

export { type UserSignUpResponseDto };
