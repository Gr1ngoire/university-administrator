import type { UpdateStudentRequestDto } from "./students";

type UpdateStudentRequestParams = {
  id: number;
  payload: UpdateStudentRequestDto;
};

export { type UpdateStudentRequestParams };
