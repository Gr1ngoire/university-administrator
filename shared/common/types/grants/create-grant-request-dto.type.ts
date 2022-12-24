import { Grants } from "../../enums/enums";

type CreateGrantRequestDto = {
  userId: number;
  grant: Grants;
  granterId: number;
};

export { type CreateGrantRequestDto };
