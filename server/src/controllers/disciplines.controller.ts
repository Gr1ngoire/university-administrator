import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from 'src/common/decorators/decorators';
import {
  CreateDisciplineValidationDto,
  GetByIdParams,
  UpdateDisciplineValidationDto,
} from 'src/common/validation-dtos/validation-dtos';
import {
  ApiPath,
  DisciplinesApi,
  ExceptionsMessages,
} from 'src/common/enums/enums';
import { DisciplinesService } from 'src/services/services';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import { AdminRoleGuard } from 'src/guards/guards';

@UseGuards(AdminRoleGuard)
@Controller(ApiPath.DISCIPLINES)
export class DisciplinesController {
  constructor(private disciplinesService: DisciplinesService) {}

  @Get(DisciplinesApi.ROOT)
  getAll() {
    return this.disciplinesService.getAll();
  }

  @Get(DisciplinesApi.$ID)
  async getById(@Param() params: GetByIdParams) {
    const { id } = params;

    const discipline = await this.disciplinesService.getById(id);

    if (!discipline) {
      throw new NotFoundException(ExceptionsMessages.DISCIPLINE_NOT_FOUD);
    }

    return discipline;
  }

  @Post(DisciplinesApi.ROOT)
  create(@Body() discipline: CreateDisciplineValidationDto) {
    return this.disciplinesService.create(discipline);
  }

  @Patch(DisciplinesApi.$ID)
  update(
    @Param() params: GetByIdParams,
    @Body() discipline: UpdateDisciplineValidationDto,
  ) {
    const { id } = params;

    return this.disciplinesService.update(id, discipline);
  }

  @Delete(DisciplinesApi.$ID)
  delete(@Param() params: GetByIdParams) {
    const { id } = params;

    return this.disciplinesService.delete(id);
  }
}
