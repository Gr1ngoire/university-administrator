import { Grants } from "../../enums/enums";

type UpdateGrantRequestDto = {
  grant: Grants;
  granterId: number;
};

export { type UpdateGrantRequestDto };
