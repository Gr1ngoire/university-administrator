import { CreateUserRequestDto } from "../types";
type SignInRequestDto = Pick<CreateUserRequestDto, "email" | "password">;

export { type SignInRequestDto };
