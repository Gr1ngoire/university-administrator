import { Abstract } from "../abstract/abstract.validator";
import type { CreateUserRequestDto } from "@/common/types/types";
import { ValidationError } from "@/exceptions/exceptions";
import {
  UniversityUserRoles,
  ValidationExceptionMessages,
} from "@/common/enums/enums";

class User extends Abstract<CreateUserRequestDto> {
  validate(toValidate: CreateUserRequestDto): void {
    const { name, surname, secondName, role, email, phone, password } =
      toValidate;

    this.validateName(name);
    this.validateSurname(surname);
    this.validateSecondName(secondName);
    this.validateRole(role);
    this.validateEmail(email);
    this.validateUkrainianPhone(phone);
    this.validatePassword(password);
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

  private validateSecondName(value: string): void {
    const validateField = "secondName";

    if (value.length === 0) {
      throw new ValidationError({
        field: validateField,
        message: ValidationExceptionMessages.SECOND_NAME_CAN_NOT_BE_EMPTY,
      });
    }
  }

  private validateRole(value: string): void {
    const validateField = "role";

    const possibleRoles = Object.values(
      UniversityUserRoles as Record<string, string>
    );

    if (!possibleRoles.includes(value)) {
      throw new ValidationError({
        field: validateField,
        message: ValidationExceptionMessages.ROLE_MUST_BE_STUDENT_OR_TEACHER,
      });
    }
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

  private validatePassword(value: string): void {
    const validateField = "password";

    const PASSWORD_VALIDATION =
      /^(?=.*[!&#%])(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,16}$/;
    if (!value.match(PASSWORD_VALIDATION)) {
      throw new ValidationError({
        field: validateField,
        message: ValidationExceptionMessages.PASSWORD_FORMAT,
      });
    }
  }
}

export { User };