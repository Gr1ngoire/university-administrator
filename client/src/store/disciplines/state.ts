import type { DataStatus } from "@/common/enums/enums";
import type { DisciplinesGetAllItemResponseDto } from "@/common/types/types";

type State = {
  disciplines: DisciplinesGetAllItemResponseDto[];
  dataStatus: DataStatus;
};

export { type State };
