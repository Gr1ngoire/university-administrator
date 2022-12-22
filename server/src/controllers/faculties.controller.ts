import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from 'src/common/decorators/decorators';
import {
  ApiPath,
  ExceptionsMessages,
  FacultiesApi,
} from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  CreateFacultyValidationDto,
  GetByIdParams,
  UpdateFacultyValidationDto,
} from 'src/common/validation-dtos/validation-dtos';
import { JwtAuthGuard } from 'src/guards/guards';
import { FacultiesService } from 'src/services/faculties.service';

@UseGuards(JwtAuthGuard)
@Controller(ApiPath.FACULTIES)
export class FacultiesController {
  constructor(private facultiesService: FacultiesService) {}

  @Get(FacultiesApi.ROOT)
  getAll() {
    return this.facultiesService.getAll();
  }

  @Get(FacultiesApi.$ID)
  async getById(@Param() params: GetByIdParams) {
    const { id } = params;
    const faculty = await this.facultiesService.getById(id);

    if (!faculty) {
      throw new NotFoundException(ExceptionsMessages.FACULTY_NOT_FOUND);
    }

    return faculty;
  }

  @Post(FacultiesApi.ROOT)
  create(@Body() faculty: CreateFacultyValidationDto) {
    return this.facultiesService.create(faculty);
  }

  @Patch(FacultiesApi.$ID)
  update(
    @Param() params: GetByIdParams,
    @Body() faculty: UpdateFacultyValidationDto,
  ) {
    const { id } = params;

    return this.facultiesService.update(id, faculty);
  }

  @Delete(FacultiesApi.$ID)
  delete(@Param() params: GetByIdParams) {
    const { id } = params;

    return this.facultiesService.delete(id);
  }
}
