import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from 'src/common/decorators/decorators';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import { ExceptionsMessages, SchedulesApi } from 'src/common/enums/enums';
import { SchedulesService } from './schedules.service';
import {
  CreateScheduleValidationDto,
  GetByIdParams,
  UpdateScheduleValidationDto,
} from 'src/common/validation-dtos/validation-dtos';

@Controller(SchedulesApi.SCHEDULES)
export class SchedulesController {
  constructor(private groupsService: SchedulesService) {}

  @Get(SchedulesApi.ROOT)
  getAll() {
    return this.groupsService.getAll();
  }

  @Get(SchedulesApi.$ID)
  async getById(@Param() params: GetByIdParams) {
    const { id } = params;
    const schedule = await this.groupsService.getById(id);

    if (!schedule) {
      throw new NotFoundException(ExceptionsMessages.SCHEDULE_NOT_FOUND);
    }

    return schedule;
  }

  @Post(SchedulesApi.ROOT)
  create(@Body() group: CreateScheduleValidationDto) {
    return this.groupsService.create(group);
  }

  @Put(SchedulesApi.$ID)
  update(
    @Param() params: GetByIdParams,
    @Body() group: UpdateScheduleValidationDto,
  ) {
    const { id } = params;

    return this.groupsService.update(id, group);
  }

  @Delete(SchedulesApi.$ID)
  delete(@Param() params: GetByIdParams) {
    const { id } = params;

    return this.groupsService.delete(id);
  }
}
