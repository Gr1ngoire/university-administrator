import {
  Body,
  Controller,
  Patch,
  Post,
  Delete,
  Param,
  UseGuards,
  Get,
} from 'src/common/decorators/decorators';
import { ApiPath, GrantsApi, ExceptionsMessages } from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  GetByIdParams,
  CreateGrantValidationDto,
  UpdateGrantValidationDto,
} from 'src/common/validation-dtos/validation-dtos';
import { AdminRoleGuard } from 'src/guards/guards';
import { GrantsService } from 'src/services/services';

@UseGuards(AdminRoleGuard)
@Controller(ApiPath.DEPARTMENTS)
export class GrantsController {
  constructor(private grantsService: GrantsService) {}

  @Get(GrantsApi.ROOT)
  getAll() {
    return this.grantsService.getAll();
  }

  @Get(GrantsApi.$ID)
  async getById(@Param() params: GetByIdParams) {
    const { id } = params;
    const grant = await this.grantsService.getById(id);

    if (!grant) {
      throw new NotFoundException(ExceptionsMessages.GRANT_RECORD_NOT_FOUND);
    }

    return grant;
  }

  @Post(GrantsApi.ROOT)
  create(@Body() grant: CreateGrantValidationDto) {
    return this.grantsService.create(grant);
  }

  @Patch(GrantsApi.$ID)
  update(
    @Param() params: GetByIdParams,
    @Body() grant: UpdateGrantValidationDto,
  ) {
    const { id } = params;

    return this.grantsService.update(id, grant);
  }

  @Delete(GrantsApi.$ID)
  delete(@Param() params: GetByIdParams) {
    const { id } = params;

    return this.grantsService.delete(id);
  }
}
