import type { DataStatus } from "@/common/enums/enums";
import type { TeachersGetAllItemResponseDto } from "@/common/types/types";

type State = {
  teachers: TeachersGetAllItemResponseDto[];
  dataStatus: DataStatus;
};

export { type State };
