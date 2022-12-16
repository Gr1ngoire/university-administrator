import type { UpdateNewsRequestDto } from "./news";

type UpdateNewsRequestParams = {
  id: number;
  payload: UpdateNewsRequestDto;
};

export { type UpdateNewsRequestParams };
