import { UserWithGrantDto } from "../types";

type FaqMessagesGetAllItemResponseDto = {
  id: number;
  createdAt: string;
  message: string;
  authorId: number;
  author: UserWithGrantDto;
};

export { type FaqMessagesGetAllItemResponseDto };
