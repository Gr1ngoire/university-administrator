import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from 'src/common/decorators/decorators';
import { ExceptionsMessages, TeachersApi } from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  CreateTeacherValidationDto,
  GetByIdParams,
  UpdateTeacherValidationDto,
} from 'src/common/validation-dtos/validation-dtos';
import { TeachersService } from './teachers.service';

@Controller(TeachersApi.TEACHERS)
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

  @Put(TeachersApi.$ID)
  update(
    @Param() params: GetByIdParams,
    @Body() teacher: UpdateTeacherValidationDto,
  ) {
    const { id } = params;

    return this.teachersService.update(id, teacher);
  }

  @Delete(TeachersApi.$ID)
  delete(@Param() params: GetByIdParams) {
    const { id } = params;

    return this.teachersService.delete(id);
  }
}
