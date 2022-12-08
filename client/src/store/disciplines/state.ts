import type { DataStatus } from "@/common/enums/enums";
import type { DisciplinesGetAllItemRequestDto } from "@/common/types/types";

type State = {
  disciplines: DisciplinesGetAllItemRequestDto[];
  dataStatus: DataStatus;
};

export { type State };
