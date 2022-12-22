import type { DataStatus } from "@/common/enums/enums";
import type { UserWithGrantDto } from "@/common/types/types";

type State = {
  currentUser: UserWithGrantDto | null;
  dataStatus: DataStatus;
};

export { type State };
