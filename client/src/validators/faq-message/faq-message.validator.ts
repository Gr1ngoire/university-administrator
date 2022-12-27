import { ValidationExceptionMessages } from "@/common/enums/enums";
import type { CreateFaqMessageRequestDto } from "@/common/types/types";
import { ValidationError } from "@/exceptions/exceptions";
import { Abstract } from "../abstract/abstract.validator";

class FaqMessage extends Abstract<CreateFaqMessageRequestDto> {
  validate(toValidate: CreateFaqMessageRequestDto): void {
    const { message } = toValidate;

    this.validateMessage(message);
  }

  private validateMessage(value: string): void {
    const validatedField = "message";

    if (value.length === 0) {
      throw new ValidationError({
        field: validatedField,
        message: ValidationExceptionMessages.MESSAGE_CAN_NOT_BE_EMPTY,
      });
    }
  }
}

export { FaqMessage };
