import { Repository } from 'typeorm';
import { Injectable, InjectRepository } from 'src/common/decorators/decorators';
import { ExceptionsMessages } from 'src/common/enums/enums';
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

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  getModelById(id: number): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
    });
  }

  async getByEmail(
    emailToLookFor: string,
  ): Promise<UsersGetAllItemAdminResponseDto | null> {
    const userInDb = await this.repository.findOne({
      where: { email: emailToLookFor },
    });

    if (!userInDb) {
      return null;
    }

    const { id, name, surname, secondName, phone, email, password } = userInDb;
    return {
      id,
      name,
      surname,
      secondName,
      phone,
      email,
      password,
    };
  }

  async getAll(): Promise<UsersGetAllAdminResponseDto> {
    const usersModels = await this.repository.find();

    return {
      items: usersModels.map(
        ({ id, name, surname, secondName, phone, email, password }) => ({
          id,
          name,
          surname,
          secondName,
          phone,
          email,
          password,
        }),
      ),
    };
  }

  async getById(
    idToFind: number,
  ): Promise<UsersGetAllItemAdminResponseDto | null> {
    const user = await this.getModelById(idToFind);

    const { id, name, surname, secondName, phone, email, password } = user;
    return { id, name, surname, secondName, phone, email, password };
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

    const newStudent = this.repository.create(user);

    const createdUser = await this.repository.save(newStudent);
    const { id, name, surname, secondName, phone, email, password } =
      createdUser;

    return { id, name, surname, secondName, phone, email, password };
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
