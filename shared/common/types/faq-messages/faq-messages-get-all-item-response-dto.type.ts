import { UsersGetAllItemAdminResponseDto } from "../types";

type FaqMessagesGetAllItemResponseDto = {
  id: number;
  createdAt: string;
  message: string;
  authorId: number;
  author: UsersGetAllItemAdminResponseDto;
};

export { type FaqMessagesGetAllItemResponseDto };
