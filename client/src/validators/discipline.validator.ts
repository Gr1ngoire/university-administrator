import { ValidationExceptionMessages } from "@/common/enums/enums";
import type { CreateDisciplineRequestDto } from "@/common/types/types";
import { ValidationError } from "@/exceptions/exceptions";
import { Abstract } from "./abstract.validator";

class Discipline extends Abstract<CreateDisciplineRequestDto> {
  validate(toValidate: CreateDisciplineRequestDto): void {
    const { name } = toValidate;

    this.validateName(name);
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

export { Discipline };
