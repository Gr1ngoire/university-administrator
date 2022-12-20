import { JwtService } from '@nestjs/jwt';
import {
  CreateUserRequestDto,
  SignInRequestDto,
  SignUpRequestDto,
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

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private bcryptService: BcryptService,
  ) {}

  private PASSWORD_SALT_ROUNDS = 5;

  async signIn(userDto: SignInRequestDto) {
    const userInDb = await this.validateUser(userDto);
    return this.generateToken(userInDb);
  }

  async signUp(userDto: SignUpRequestDto) {
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
    const { id, email: newUserEmail } = newUser;
    return this.generateToken({ id, email: newUserEmail });
  }

  private generateToken(user: Pick<User, 'id' | 'email'>): string {
    const { id, email } = user;
    return this.jwtService.sign({ id, email });
  }

  private async validateUser(
    userDto: Pick<CreateUserRequestDto, 'email' | 'password'>,
  ) {
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
