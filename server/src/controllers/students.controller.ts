import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
} from 'src/common/decorators/decorators';
import { ExceptionsMessages, StudentsApi } from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  CreateStudentValidationDto,
  GetByIdParams,
  UpdateStudentValidatonDto,
} from 'src/common/validation-dtos/validation-dtos';
import { StudentsService } from 'src/services/services';

@Controller(StudentsApi.STUDENTS)
export class StudentsController {
  constructor(private studentsService: StudentsService) {}

  @Get(StudentsApi.ROOT)
  getAll() {
    return this.studentsService.getAll();
  }

  @Get(StudentsApi.$ID)
  async getById(@Param() params: GetByIdParams) {
    const { id } = params;
    const teacher = await this.studentsService.getById(id);

    if (!teacher) {
      throw new NotFoundException(ExceptionsMessages.STUDENT_NOT_FOUND);
    }

    return teacher;
  }

  @Post(StudentsApi.ROOT)
  create(@Body() student: CreateStudentValidationDto) {
    return this.studentsService.create(student);
  }

  @Put(StudentsApi.$ID)
  update(
    @Param() params: GetByIdParams,
    @Body() student: UpdateStudentValidatonDto,
  ) {
    const { id } = params;

    return this.studentsService.update(id, student);
  }

  @Delete(StudentsApi.$ID)
  delete(@Param() params: GetByIdParams) {
    const { id } = params;

    return this.studentsService.delete(id);
  }
}
