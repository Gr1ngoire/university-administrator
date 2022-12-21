import { JwtService } from '@nestjs/jwt';
import {
  UsersGetAllItemAdminResponseDto,
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
} from 'src/common/types/types';
import { Injectable } from 'src/common/decorators/decorators';
import { UsersService } from './users.service';
import { BcryptService } from './bcrypt.service';
import {
  BadRequestException,
  UnauthorizedException,
} from 'src/common/exceptions/excpetions';
import { ExceptionsMessages } from 'src/common/enums/enums';
import { User } from 'src/entities/user.entity';

type UserValidationParams = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  private PASSWORD_SALT_ROUNDS = 5;

  async signIn(userDto: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    const userInDb = await this.checkUser(userDto);
    const { id, name, surname, secondName, role, phone, email } = userInDb;
    return {
      token: this.generateToken(userInDb),
      user: { id, name, surname, secondName, role, phone, email },
    };
  }

  async signUp(userDto: UserSignUpRequestDto): Promise<UserSignInResponseDto> {
    const { email, password } = userDto;
    const userInDb = await this.userService.getByEmail(email);

    if (userInDb) {
      throw new BadRequestException({
        message: ExceptionsMessages.USER_WITH_SUCH_EMAIL_ALREADY_EXISTS,
      });
    }

    const hashedPassword = await this.bcryptService.hashPassword(
      password,
      this.PASSWORD_SALT_ROUNDS,
    );
    const newUser = await this.userService.create({
      ...userDto,
      password: hashedPassword,
    });
    const {
      id,
      name,
      surname,
      secondName,
      role,
      phone,
      email: newUserEmail,
    } = newUser;

    return {
      token: this.generateToken({ id, email: newUserEmail }),
      user: { id, name, surname, secondName, role, phone, email: newUserEmail },
    };
  }

  private generateToken(user: Pick<User, 'id' | 'email'>): string {
    const { id, email } = user;
    return this.jwtService.sign({ id, email });
  }

  private async checkUser(
    userDto: UserValidationParams,
  ): Promise<UsersGetAllItemAdminResponseDto | null> {
    const { email, password } = userDto;
    const userInDb = await this.userService.getByEmail(email);
    const passwordIsValid = await this.bcryptService.comparePasswords(
      password,
      userInDb.password,
    );
    if (!userInDb || !passwordIsValid) {
      throw new UnauthorizedException({
        message: ExceptionsMessages.INVALID_EMAIL_OR_PASSWORD,
      });
    }
    return userInDb;
  }
}
