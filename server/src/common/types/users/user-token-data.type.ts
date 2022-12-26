import { Grants } from "src/common/enums/enums";

type UserTokenData = {
  id: number;
  email: string;
  grant: Grants;
};

export { type UserTokenData };
