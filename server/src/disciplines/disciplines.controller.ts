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
  DisciplinesControllerParams,
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
  async getById(@Param(DisciplinesControllerParams.ID) id: string) {
    const discipline = await this.disciplinesService.getById(parseInt(id));

    if (!discipline) {
      throw new NotFoundException(ExceptionsMessages.DISCIPLINE_NOT_FOUD);
    }

    return discipline;
  }

  @Post(DisciplinesApi.ROOT)
  createDiscipline(@Body() discipline: CreateDisciplineValidationDto) {
    return this.disciplinesService.createDiscipline(discipline);
  }

  @Put(DisciplinesApi.$ID)
  async update(
    @Param(DisciplinesControllerParams.ID) id: string,
    @Body() discipline: UpdateDisciplineValidationDto,
  ) {
    return this.disciplinesService.update(parseInt(id), discipline);
  }

  @Delete(DisciplinesApi.$ID)
  async delete(@Param(DisciplinesControllerParams.ID) id: string) {
    return this.disciplinesService.delete(parseInt(id));
  }
}
