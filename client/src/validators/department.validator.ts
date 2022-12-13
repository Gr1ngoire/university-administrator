import { ValidationExceptionMessages } from "@/common/enums/enums";
import type { CreateDepartmentRequestDto } from "@/common/types/types";
import { ValidationError } from "@/exceptions/exceptions";
import { Abstract } from "./abstract.validator";

class Department extends Abstract<CreateDepartmentRequestDto> {
  validate(toValidate: CreateDepartmentRequestDto): void {
    const { name, shortName } = toValidate;

    this.validateName(name);
    this.validateShortName(shortName);
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

  private validateShortName(value: string): void {
    const validateField = "shortName";

    if (value.length === 0) {
      throw new ValidationError({
        field: validateField,
        message: ValidationExceptionMessages.SHORTNAME_CAN_NOT_BE_EMPTY,
      });
    }
  }
}

export { Department };
