import { ValidationExceptionMessages } from "@/common/enums/enums";
import type { CreateGroupRequestDto } from "@/common/types/types";
import { ValidationError } from "@/exceptions/exceptions";
import { Abstract } from "./abstract.validator";

class Group extends Abstract<CreateGroupRequestDto> {
  validate(toValidate: CreateGroupRequestDto): void {
    const { name, course } = toValidate;

    this.validateName(name);
    this.validateCourse(course);
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

  private validateCourse(value: number): void {
    const validateField = "course";

    if (value < 1 || value > 6) {
      throw new ValidationError({
        field: validateField,
        message: ValidationExceptionMessages.COURSE_MUST_BELONG_INTERVAL,
      });
    }

    if (!Number.isInteger(value)) {
      throw new ValidationError({
        field: validateField,
        message: ValidationExceptionMessages.COURSE_MUST_BE_AN_INTEGER,
      });
    }
  }
}

export { Group };
