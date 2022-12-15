import { Abstract } from "../abstract/abstract.validator";
import type { CreateScheduleRequestDto } from "@/common/types/types";
import { ValidationError } from "@/exceptions/exceptions";
import { ValidationExceptionMessages } from "@/common/enums/enums";

class Schedule extends Abstract<CreateScheduleRequestDto> {
  validate(toValidate: CreateScheduleRequestDto): void {
    const { time, classroom } = toValidate;

    this.validateTime(time);
    this.validateClassroom(classroom);
  }

  private validateTime(value: string): void {
    const validatedField = "time";

    if (value.length === 0) {
      throw new ValidationError({
        field: validatedField,
        message: ValidationExceptionMessages.TIME_CAN_NOT_BE_EMPTY,
      });
    }
  }

  private validateClassroom(value: string): void {
    const validatedField = "classroom";

    if (value.length === 0) {
      throw new ValidationError({
        field: validatedField,
        message: ValidationExceptionMessages.CLASSROOM_CAN_NOT_BE_EMPTY,
      });
    }
  }
}

export { Schedule };
