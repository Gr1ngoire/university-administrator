import type { DataStatus } from "@/common/enums/enums";
import type { FaqMessagesGetAllItemResponseDto } from "@/common/types/types";

type State = {
  faqMessages: FaqMessagesGetAllItemResponseDto[];
  dataStatus: DataStatus;
};

export { type State };
