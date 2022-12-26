import type { Grants } from "shared/common/enums/enums";

type UserWithGrantDto = {
  id: number;
  name: string;
  surname: string;
  secondName: string;
  phone: string;
  email: string;
  grant: Grants;
};

export { type UserWithGrantDto };
