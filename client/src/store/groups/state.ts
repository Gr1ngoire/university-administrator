import type { DataStatus } from "@/common/enums/enums";
import type { GroupsGetAllItemResponseDto } from "@/common/types/types";

type State = {
  groups: GroupsGetAllItemResponseDto[];
  dataStatus: DataStatus;
};

export { type State };
