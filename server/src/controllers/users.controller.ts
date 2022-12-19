import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
} from 'src/common/decorators/decorators';
import { ApiPath, ExceptionsMessages, UsersApi } from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  CreateUserValidationDto,
  GetByIdParams,
  UpdateUserValidationDto,
} from 'src/common/validation-dtos/validation-dtos';
import { UsersService } from 'src/services/services';

@Controller(ApiPath.USERS)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(UsersApi.ROOT)
  getAll() {
    return this.usersService.getAll();
  }

  @Get(UsersApi.$ID)
  async getById(@Param() params: GetByIdParams) {
    const { id } = params;
    const teacher = await this.usersService.getById(id);

    if (!teacher) {
      throw new NotFoundException(ExceptionsMessages.USER_NOT_FOUND);
    }

    return teacher;
  }

  @Post(UsersApi.ROOT)
  create(@Body() user: CreateUserValidationDto) {
    return this.usersService.create(user);
  }

  @Patch(UsersApi.$ID)
  update(
    @Param() params: GetByIdParams,
    @Body() user: UpdateUserValidationDto,
  ) {
    const { id } = params;

    return this.usersService.update(id, user);
  }

  @Delete(UsersApi.$ID)
  delete(@Param() params: GetByIdParams) {
    const { id } = params;

    return this.usersService.delete(id);
  }
}
