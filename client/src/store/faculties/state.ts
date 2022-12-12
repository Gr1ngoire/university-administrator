import type { DataStatus } from "@/common/enums/enums";
import type { FacultiesGetAllItemResponseDto } from "@/common/types/types";

type State = {
  faculties: FacultiesGetAllItemResponseDto[];
  dataStatus: DataStatus;
};

export { type State };
