import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  ControllerParams,
  ExceptionsMessages,
  TeachersApi,
} from 'src/common/enums/enums';
import {
  CreateTeacherValidationDto,
  UpdateTeacherValidatonDto,
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
  async getById(@Param(ControllerParams.ID) id: string) {
    const idToUse = parseInt(id);

    if (typeof idToUse !== 'number') {
      throw new BadRequestException(ExceptionsMessages.INVALID_ID_FORMAT);
    }

    const teacher = await this.teachersService.getById(idToUse);

    if (!teacher) {
      throw new NotFoundException(ExceptionsMessages.DISCIPLINE_NOT_FOUD);
    }

    return teacher;
  }

  @Post(TeachersApi.ROOT)
  create(@Body() teacher: CreateTeacherValidationDto) {
    return this.teachersService.create(teacher);
  }

  @Put(TeachersApi.$ID)
  update(
    @Param(ControllerParams.ID) id: string,
    @Body() teacher: UpdateTeacherValidatonDto,
  ) {
    const idToUse = parseInt(id);

    if (typeof idToUse !== 'number') {
      throw new BadRequestException(ExceptionsMessages.INVALID_ID_FORMAT);
    }

    return this.teachersService.update(idToUse, teacher);
  }

  @Delete(TeachersApi.$ID)
  delete(@Param(ControllerParams.ID) id: string) {
    const idToUse = parseInt(id);

    if (typeof idToUse !== 'number') {
      throw new BadRequestException(ExceptionsMessages.INVALID_ID_FORMAT);
    }

    return this.teachersService.delete(idToUse);
  }
}
