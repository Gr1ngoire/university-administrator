import { forwardRef } from '@nestjs/common';
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
  UserSignUpRequestDto,
  UpdateUserRequestDto,
  UsersGetAllItemAdminResponseDto,
  UsersGetAllAdminResponseDto,
} from 'src/common/types/types';
import { User } from 'src/entities/entities';
import { GrantsService } from './grants.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private repository: Repository<User>,
    @Inject(forwardRef(() => GrantsService))
    private grantsService: GrantsService,
  ) {}

  getModelById(id: number): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async getByEmail(emailToLookFor: string): Promise<User | null> {
    const userInDb = await this.repository.findOne({
      where: { email: emailToLookFor },
    });

    if (!userInDb) {
      return null;
    }

    return userInDb;
  }

  async getAll(): Promise<UsersGetAllAdminResponseDto> {
    const usersModels = await this.repository.find();

    return {
      items: usersModels.map(
        ({ id, name, surname, secondName, phone, email }) => ({
          id,
          name,
          surname,
          secondName,
          phone,
          email,
        }),
      ),
    };
  }

  async getById(
    idToFind: number,
  ): Promise<UsersGetAllItemAdminResponseDto | null> {
    const user = await this.getModelById(idToFind);

    const { id, name, surname, secondName, phone, email } = user;
    return { id, name, surname, secondName, phone, email };
  }

  async create(
    user: UserSignUpRequestDto,
  ): Promise<UsersGetAllItemAdminResponseDto> {
    const userWithSameEmail = await this.getByEmail(user.email);

    if (userWithSameEmail) {
      throw new BadRequestException(
        ExceptionsMessages.USER_WITH_SUCH_EMAIL_ALREADY_EXISTS,
      );
    }

    const newUser = this.repository.create(user);

    const createdUser = await this.repository.save(newUser);
    const { id, name, surname, secondName, phone, email } = createdUser;

    await this.grantsService.create({
      userId: id,
      grant: Grants.USER,
      granterId: null,
    });

    return { id, name, surname, secondName, phone, email };
  }

  async update(
    id: number,
    user: Partial<UpdateUserRequestDto>,
  ): Promise<UsersGetAllItemAdminResponseDto> {
    const userToUpdate = await this.repository.findOne({ where: { id } });

    if (!userToUpdate) {
      throw new NotFoundException(ExceptionsMessages.USER_NOT_FOUND);
    }

    if (user.email) {
      const userToCheckByEmail = await this.getByEmail(user.email);

      if (
        userToCheckByEmail &&
        user.email !== userToUpdate.email &&
        id !== userToCheckByEmail.id
      ) {
        throw new BadRequestException(
          ExceptionsMessages.USER_WITH_SUCH_EMAIL_ALREADY_EXISTS,
        );
      }
    }

    Object.assign(userToUpdate, user);
    const updatedUser = await this.repository.save(userToUpdate);

    return this.getById(updatedUser.id);
  }

  async delete(id: number): Promise<number> {
    const user = await this.getModelById(id);

    if (!user) {
      throw new NotFoundException(ExceptionsMessages.USER_NOT_FOUND);
    }

    const { id: idToSend } = user;

    await this.repository.remove(user);

    return idToSend;
  }
}
