import { Abstract } from "../abstract/abstract.validator";
import type { UserSignUpRequestDto } from "@/common/types/types";
import type { User } from "../user/user.validator";

class SignUp extends Abstract<UserSignUpRequestDto> {
  constructor(private userValidator: User) {
    super();
  }

  validate(toValidate: UserSignUpRequestDto): void {
    this.userValidator.validate(toValidate);
  }
}

export { SignUp };
