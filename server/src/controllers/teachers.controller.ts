import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  UseGuards,
} from 'src/common/decorators/decorators';
import {
  ApiPath,
  ExceptionsMessages,
  TeachersApi,
} from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  CreateTeacherValidationDto,
  GetByIdParams,
  UpdateTeacherValidationDto,
} from 'src/common/validation-dtos/validation-dtos';
import { AdminRoleGuard } from 'src/guards/guards';
import { TeachersService } from 'src/services/services';

@UseGuards(AdminRoleGuard)
@Controller(ApiPath.TEACHERS)
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Get(TeachersApi.ROOT)
  getAll() {
    return this.teachersService.getAll();
  }

  @Get(TeachersApi.$ID)
  async getById(@Param() params: GetByIdParams) {
    const { id } = params;
    const teacher = await this.teachersService.getById(id);

    if (!teacher) {
      throw new NotFoundException(ExceptionsMessages.TEACHER_NOT_FOUND);
    }

    return teacher;
  }

  @Post(TeachersApi.ROOT)
  create(@Body() teacher: CreateTeacherValidationDto) {
    return this.teachersService.create(teacher);
  }

  @Patch(TeachersApi.$ID)
  update(
    @Param() params: GetByIdParams,
    @Body() teacher: UpdateTeacherValidationDto,
  ) {
    const { id } = params;

    return this.teachersService.updateDepartment(id, teacher);
  }

  @Delete(TeachersApi.$ID)
  delete(@Param() params: GetByIdParams) {
    const { id } = params;

    return this.teachersService.delete(id);
  }
}
