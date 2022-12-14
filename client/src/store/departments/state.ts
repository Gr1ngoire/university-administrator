import type { DataStatus } from "@/common/enums/enums";
import type { DepartmentsGetAllItemResponseDto } from "@/common/types/types";

type State = {
  departments: DepartmentsGetAllItemResponseDto[];
  dataStatus: DataStatus;
};

export { type State };
