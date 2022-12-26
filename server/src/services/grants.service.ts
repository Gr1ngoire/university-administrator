import { Repository } from 'typeorm';
import {
  Injectable,
  InjectRepository,
  Inject,
} from 'src/common/decorators/decorators';
import { ExceptionsMessages, Grants } from 'src/common/enums/enums';
import {
  BadRequestException,
  NotFoundException,
} from 'src/common/exceptions/excpetions';
import {
  CreateGrantRequestDto,
  GrantsGetAllAdminResponseDto,
  GrantsGetAllItemAdminResponseDto,
  UpdateGrantRequestDto,
} from 'src/common/types/types';
import { Grant } from 'src/entities/entities';
import { UsersService } from './users.service';
import { forwardRef } from '@nestjs/common';

@Injectable()
export class GrantsService {
  constructor(
    @InjectRepository(Grant) private repository: Repository<Grant>,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
  ) {}

  getModelById(id: number): Promise<Grant | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        user: true,
        granter: true,
      },
    });
  }

  async isUserAdmin(userId: number): Promise<boolean> {
    const { grant } = await this.repository.findOne({ where: { userId } });
    return grant === Grants.ADMIN;
  }

  async getUserGrant(userId: number): Promise<Grants> {
    const { grant } = await this.repository.findOne({ where: { userId } });
    return grant;
  }

  async getAll(): Promise<GrantsGetAllAdminResponseDto> {
    const grantsModels = await this.repository.find({
      relations: {
        user: true,
        granter: true,
      },
    });

    return {
      items: grantsModels.map(
        ({ id, userId, user, grant, granterId, granter }) => ({
          id,
          userId,
          user,
          grant,
          granterId,
          granter,
        }),
      ),
    };
  }

  async getById(
    idToFind: number,
  ): Promise<GrantsGetAllItemAdminResponseDto | null> {
    const department = await this.getModelById(idToFind);

    const { id, userId, user, grant, granterId, granter } = department;
    return { id, userId, user, grant, granterId, granter };
  }

  async create(
    grant: CreateGrantRequestDto,
  ): Promise<GrantsGetAllItemAdminResponseDto> {
    const { userId, granterId } = grant;
    const userToGrant = await this.usersService.getModelById(userId);

    if (!userToGrant) {
      throw new BadRequestException(ExceptionsMessages.USER_DOES_NOT_EXIST);
    }

    const granterInDb = await this.usersService.getModelById(granterId);

    if (!granterInDb) {
      throw new BadRequestException(ExceptionsMessages.GRANTER_DOES_NOT_EXIST);
    }

    const userInDb = await this.repository.findOne({
      where: { userId },
    });

    if (userInDb) {
      throw new BadRequestException(
        ExceptionsMessages.SUCH_USER_IS_ALREADY_GRANTED,
      );
    }

    const newGrant = this.repository.create(grant);

    const createdGrant = await this.repository.save(newGrant);

    return this.getById(createdGrant.id);
  }

  async update(
    id: number,
    grant: UpdateGrantRequestDto,
  ): Promise<GrantsGetAllItemAdminResponseDto> {
    const { granterId } = grant;
    const grantToUpdate = await this.repository.findOne({ where: { id } });

    if (!grantToUpdate) {
      throw new NotFoundException(ExceptionsMessages.GRANT_RECORD_NOT_FOUND);
    }

    const granterInDb = await this.usersService.getModelById(granterId);

    if (!granterInDb) {
      throw new BadRequestException(ExceptionsMessages.GRANTER_DOES_NOT_EXIST);
    }

    if (
      grantToUpdate.granterId &&
      grant.granterId !== grantToUpdate.granterId
    ) {
      throw new BadRequestException(
        ExceptionsMessages.GRANT_CAN_BE_UPDATED_ONLY_BY_THE_ADMIN_IT_WAS_CREATED,
      );
    }

    Object.assign(grantToUpdate, grant);
    const updatedGrant = await this.repository.save(grantToUpdate);

    return this.getById(updatedGrant.id);
  }

  async delete(id: number): Promise<number> {
    const grantRecord = await this.getModelById(id);

    if (!grantRecord) {
      throw new NotFoundException(ExceptionsMessages.GRANT_RECORD_NOT_FOUND);
    }

    const { id: idToSend } = grantRecord;

    await this.repository.remove(grantRecord);

    return idToSend;
  }
}
