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

    const SCHEDULE_TIME_VALIDATION =
      /^([1-9]|1[0-2])\.([1-9]|1[0-9]|2[0-9]|3[0-1])\.([1-9][0-9]*) ([1-9]|1[0-9]|2[0-4]):([1-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/;
    if (!value.match(SCHEDULE_TIME_VALIDATION)) {
      throw new ValidationError({
        field: validatedField,
        message: ValidationExceptionMessages.TIME_FIELD_FORMAT,
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
