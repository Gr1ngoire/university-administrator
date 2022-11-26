import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateDisciplineValidationDto,
  UpdateDisciplineValidationDto,
} from 'src/common/validation-dtos/validation-dtos';
import {
  DisciplinesApi,
  ControllerParams,
  ExceptionsMessages,
} from 'src/common/enums/enums';
import { DisciplinesService } from './disciplines.service';

@Controller(DisciplinesApi.DISCIPLINES)
export class DisciplinesController {
  constructor(private disciplinesService: DisciplinesService) {}

  @Get(DisciplinesApi.ROOT)
  getAll() {
    return this.disciplinesService.getAll();
  }

  @Get(DisciplinesApi.$ID)
  async getById(@Param(ControllerParams.ID) id: string) {
    const discipline = await this.disciplinesService.getById(parseInt(id));

    if (!discipline) {
      throw new NotFoundException(ExceptionsMessages.DISCIPLINE_NOT_FOUD);
    }

    return discipline;
  }

  @Post(DisciplinesApi.ROOT)
  create(@Body() discipline: CreateDisciplineValidationDto) {
    return this.disciplinesService.create(discipline);
  }

  @Put(DisciplinesApi.$ID)
  update(
    @Param(ControllerParams.ID) id: string,
    @Body() discipline: UpdateDisciplineValidationDto,
  ) {
    return this.disciplinesService.update(parseInt(id), discipline);
  }

  @Delete(DisciplinesApi.$ID)
  delete(@Param(ControllerParams.ID) id: string) {
    return this.disciplinesService.delete(parseInt(id));
  }
}
