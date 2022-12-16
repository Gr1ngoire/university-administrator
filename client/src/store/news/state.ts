import type { DataStatus } from "@/common/enums/enums";
import type { NewsGetAllItemResponseDto } from "@/common/types/types";

type State = {
  news: NewsGetAllItemResponseDto[];
  dataStatus: DataStatus;
};

export { type State };
