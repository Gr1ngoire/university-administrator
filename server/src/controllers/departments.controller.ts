import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Delete,
  Param,
} from 'src/common/decorators/decorators';
import {
  ApiPath,
  DepartmentsApi,
  ExceptionsMessages,
} from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  CreateDepartmentValidationDto,
  UpdateDepartmentValidationDto,
  GetByIdParams,
} from 'src/common/validation-dtos/validation-dtos';
import { DepartmentsService } from 'src/services/services';

@Controller(ApiPath.DEPARTMENTS)
export class DepartmentsController {
  constructor(private departmentsService: DepartmentsService) {}

  @Get(DepartmentsApi.ROOT)
  getAll() {
    return this.departmentsService.getAll();
  }

  @Get(DepartmentsApi.$ID)
  async getById(@Param() params: GetByIdParams) {
    const { id } = params;
    const department = await this.departmentsService.getById(id);

    if (!department) {
      throw new NotFoundException(ExceptionsMessages.DEPARTMENT_NOT_FOUND);
    }

    return department;
  }

  @Post(DepartmentsApi.ROOT)
  create(@Body() department: CreateDepartmentValidationDto) {
    return this.departmentsService.create(department);
  }

  @Patch(DepartmentsApi.$ID)
  update(
    @Param() params: GetByIdParams,
    @Body() department: UpdateDepartmentValidationDto,
  ) {
    const { id } = params;

    return this.departmentsService.update(id, department);
  }

  @Delete(DepartmentsApi.$ID)
  delete(@Param() params: GetByIdParams) {
    const { id } = params;

    return this.departmentsService.delete(id);
  }
}
