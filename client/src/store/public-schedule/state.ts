import type { DataStatus } from "@/common/enums/enums";
import type { SchedulesGetAllItemResponseDto } from "@/common/types/types";

type State = {
  schedules: SchedulesGetAllItemResponseDto[];
  dataStatus: DataStatus;
};

export { type State };
