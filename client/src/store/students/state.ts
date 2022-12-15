import type { DataStatus } from "@/common/enums/enums";
import type { StudentsGetAllItemResponseDto } from "@/common/types/types";

type State = {
  students: StudentsGetAllItemResponseDto[];
  dataStatus: DataStatus;
};

export { type State };
