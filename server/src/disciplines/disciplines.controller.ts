import { Controller, Post, Body } from '@nestjs/common';
import { DisciplinesApi } from 'src/common/enums/api/api';
import { CreateDisciplineDto } from 'src/common/validation-dtos/validation-dtos';
import { DisciplinesService } from './disciplines.service';

@Controller(DisciplinesApi.DISCIPLINES)
export class DisciplinesController {
  constructor(private disciplinesService: DisciplinesService) {}

  @Post(DisciplinesApi.ROOT)
  async createDiscipline(@Body() discipline: CreateDisciplineDto) {
    const newDiscipline = await this.disciplinesService.createDiscipline(
      discipline.name,
    );

    return newDiscipline;
  }
}
