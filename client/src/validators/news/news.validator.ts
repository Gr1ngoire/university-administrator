import type { CreateNewsRequestDto } from "@/common/types/types";
import { ValidationExceptionMessages } from "@/common/enums/enums";
import { ValidationError } from "@/exceptions/exceptions";
import { Abstract } from "../abstract/abstract.validator";

class News extends Abstract<CreateNewsRequestDto> {
  validate(toValidate: CreateNewsRequestDto): void {
    const { title, content } = toValidate;

    this.validateTitle(title);
    this.validateContent(content);
  }

  private validateTitle(value: string): void {
    const validateField = "title";

    if (value.length === 0) {
      throw new ValidationError({
        field: validateField,
        message: ValidationExceptionMessages.TITLE_CAN_NOT_BE_EMPTY,
      });
    }
  }

  private validateContent(value: string): void {
    const validateField = "content";

    if (value.length === 0) {
      throw new ValidationError({
        field: validateField,
        message: ValidationExceptionMessages.CONTENT_CAN_NOT_BE_EMPTY,
      });
    }
  }
}

export { News };
