import { FacultiesGetAllItemResponseDto } from "../types";

type DepartmentsGetAllItemResponseDto = {
  id: number;
  facultyId: number;
  name: string;
  shortName: string;
  faculty: FacultiesGetAllItemResponseDto;
};

export { type DepartmentsGetAllItemResponseDto };
