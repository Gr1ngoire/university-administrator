import { Abstract } from "../abstract/abstract.validator";
import type { CreateTeacherRequestDto } from "@/common/types/types";
import { ValidationError } from "@/exceptions/exceptions";
import { ValidationExceptionMessages } from "@/common/enums/enums";

class Teacher extends Abstract<CreateTeacherRequestDto> {
  validate(toValidate: CreateTeacherRequestDto): void {
    const { name, surname, email, phone } = toValidate;

    this.validateEmail(email);
    this.validateUkrainianPhone(phone);
    this.validateName(name);
    this.validateSurname(surname);
  }

  private validateEmail(value: string): void {
    const validateField = "email";

    if (value.length === 0) {
      throw new ValidationError({
        field: validateField,
        message: ValidationExceptionMessages.EMAIL_CAN_NOT_BE_EMPTY,
      });
    }

    const EMAIL_FORMAT_VALIDATION = /\w+@\w+\.\w+/;
    if (!value.match(EMAIL_FORMAT_VALIDATION)) {
      throw new ValidationError({
        field: validateField,
        message: ValidationExceptionMessages.EMAIL_SHOULD_BE_IN_PROPER_FORMAT,
      });
    }
  }

  private validateUkrainianPhone(value: string): void {
    const validateField = "phone";

    if (value.length === 0) {
      throw new ValidationError({
        field: validateField,
        message: ValidationExceptionMessages.PHONE_CAN_NOT_BE_EMPTY,
      });
    }

    const UKRAINIAN_PHONE_FORMAT_VALIDATION = /^\+380\d{9}$/;
    if (!value.match(UKRAINIAN_PHONE_FORMAT_VALIDATION)) {
      throw new ValidationError({
        field: validateField,
        message: ValidationExceptionMessages.PHONE_SHOULD_BE_IN_PROPER_FORMAT,
      });
    }
  }

  private validateName(value: string): void {
    const validatedField = "name";

    if (value.length === 0) {
      throw new ValidationError({
        field: validatedField,
        message: ValidationExceptionMessages.NAME_CAN_NOT_BE_EMPTY,
      });
    }
  }

  private validateSurname(value: string): void {
    const validateField = "surname";

    if (value.length === 0) {
      throw new ValidationError({
        field: validateField,
        message: ValidationExceptionMessages.SURNAME_CAN_NOT_BE_EMPTY,
      });
    }
  }
}

export { Teacher };
