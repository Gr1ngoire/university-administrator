import type { DataStatus } from "@/common/enums/enums";
import type {
  GroupsGetAllItemResponseDto,
  SchedulesGetAllItemResponseDto,
} from "@/common/types/types";

type State = {
  schedules: SchedulesGetAllItemResponseDto[];
  groups: GroupsGetAllItemResponseDto[];
  dataStatus: DataStatus;
};

export { type State };
