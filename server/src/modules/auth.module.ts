import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { ENV } from 'src/common/enums/enums';
import { AuthController } from 'src/controllers/controllers';
import { Grant, User } from 'src/entities/entities';
import {
  AuthService,
  BcryptService,
  GrantsService,
  UsersService,
} from 'src/services/services';
import { GrantsModule } from './grants.module';
import { UsersModule } from './users.module';

const { JWT_PRIVATE_KEY, JWT_TOKEN_EXPIRY_PERIOD } = ENV.JWT;

@Module({
  imports: [
    TypeOrmModule.forFeature([Grant, User]),
    JwtModule.register({
      secret: JWT_PRIVATE_KEY,
      signOptions: {
        expiresIn: JWT_TOKEN_EXPIRY_PERIOD,
      },
    }),
    GrantsModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, GrantsService, UsersService],
})
export class AuthModule {}
