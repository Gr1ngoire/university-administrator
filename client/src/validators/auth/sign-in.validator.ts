import { Abstract } from "../abstract/abstract.validator";
import type { UserSignInRequestDto } from "@/common/types/types";
import type { User } from "../user/user.validator";

class SignIn extends Abstract<UserSignInRequestDto> {
  constructor(private userValidator: User) {
    super();
  }

  validate(toValidate: UserSignInRequestDto): void {
    const { email, password } = toValidate;
    this.userValidator.validateEmail(email);
    this.userValidator.validatePassword(password);
  }
}

export { SignIn };
