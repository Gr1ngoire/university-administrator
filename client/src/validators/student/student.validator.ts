import { Abstract } from "../abstract/abstract.validator";
import type { CreateStudentRequestDto } from "@/common/types/types";
import { ValidationError } from "@/exceptions/exceptions";
import { ValidationExceptionMessages } from "@/common/enums/enums";

class Student extends Abstract<CreateStudentRequestDto> {
  validate(toValidate: CreateStudentRequestDto): void {
    const { email, phone, name } = toValidate;

    this.validateEmail(email);
    this.validateUkrainianPhone(phone);
    this.validateName(name);
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
}

export { Student };
