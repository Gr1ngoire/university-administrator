import {
  UpdateUserRequestDto,
  UsersGetAllItemAdminResponseDto,
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserTokenData,
  UserWithGrantDto,
} from 'src/common/types/types';
import { Injectable } from 'src/common/decorators/decorators';
import { UsersService } from '../users/users.service';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { UnauthorizedException } from 'src/common/exceptions/excpetions';
import { ExceptionsMessages } from 'src/common/enums/enums';
import { JwtService } from '../jwt/jwt.service';
import { GrantsService } from '../grants/grants.service';

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
    private grantsService: GrantsService,
  ) {}

  private PASSWORD_SALT_ROUNDS = 5;

  async signIn(userDto: UserSignInRequestDto): Promise<UserSignInResponseDto> {
    const userInDb = await this.checkUser(userDto);
    const { id, name, surname, secondName, phone, email } = userInDb;
    const grant = await this.grantsService.getUserGrant(id);
    return {
      token: this.generateToken({ id, email, grant }),
      user: { id, name, surname, secondName, phone, email, grant },
    };
  }

  async signUp(userDto: UserSignUpRequestDto): Promise<UserSignInResponseDto> {
    const hashedPassword = await this.bcryptService.hashPassword(
      userDto.password,
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
      phone,
      email: newUserEmail,
    } = newUser;

    const grant = await this.grantsService.getUserGrant(id);

    return {
      token: this.generateToken({ id, email: newUserEmail, grant }),
      user: {
        id,
        name,
        surname,
        secondName,
        phone,
        email: newUserEmail,
        grant,
      },
    };
  }

  async updateUser(
    id: number,
    userDto: UpdateUserRequestDto,
  ): Promise<UsersGetAllItemAdminResponseDto> {
    const hashedPassword = await this.bcryptService.hashPassword(
      userDto.password,
      this.PASSWORD_SALT_ROUNDS,
    );

    const updatedUser = await this.userService.update(id, {
      ...userDto,
      password: hashedPassword,
    });

    const {
      id: updatedUserId,
      name,
      surname,
      secondName,
      phone,
      email: newUserEmail,
    } = updatedUser;

    return {
      id: updatedUserId,
      name,
      surname,
      secondName,
      phone,
      email: newUserEmail,
    };
  }

  async getCurrentUser(bearerToken: string): Promise<UserWithGrantDto | null> {
    try {
      const [, token] = bearerToken.split(' ');
      const { id, grant } = this.jwtService.decode(token) as UserTokenData;
      const {
        id: foundUserId,
        name,
        surname,
        secondName,
        phone,
        email,
      } = await this.userService.getById(id);

      return {
        id: foundUserId,
        name,
        surname,
        secondName,
        phone,
        email,
        grant,
      };
    } catch {
      throw new UnauthorizedException({
        message: ExceptionsMessages.USER_IS_UNAUTHORIZED,
      });
    }
  }

  private generateToken(userData: UserTokenData): string {
    const { id, email, grant } = userData;
    return this.jwtService.sign({ id, email, grant });
  }

  private async checkUser(
    userDto: UserValidationParams,
  ): Promise<UsersGetAllItemAdminResponseDto | null> {
    const { email, password } = userDto;
    const userInDb = await this.userService.getByEmail(email);

    if (!userInDb) {
      throw new UnauthorizedException({
        message: ExceptionsMessages.INVALID_EMAIL_OR_PASSWORD,
      });
    }

    const passwordIsValid = await this.bcryptService.comparePasswords(
      password,
      userInDb.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException({
        message: ExceptionsMessages.INVALID_EMAIL_OR_PASSWORD,
      });
    }
    return userInDb;
  }
}
