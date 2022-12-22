import type { UpdateUserRequestDto } from "./users";

type UpdateUserRequestParams = {
  id: number;
  payload: UpdateUserRequestDto;
};

export { type UpdateUserRequestParams };
