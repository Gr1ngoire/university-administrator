import { JwtModule } from '@nestjs/jwt';
import { Module } from 'src/common/decorators/decorators';
import { ENV } from 'src/common/enums/enums';
import { AuthController } from 'src/controllers/controllers';
import { AuthService, BcryptService } from 'src/services/services';
import { UsersModule } from './users.module';

const { JWT_PRIVATE_KEY, JWT_TOKEN_EXPIRY_PERIOD } = ENV.JWT;

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: JWT_PRIVATE_KEY,
      signOptions: {
        expiresIn: JWT_TOKEN_EXPIRY_PERIOD,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
})
export class AuthModule {}
