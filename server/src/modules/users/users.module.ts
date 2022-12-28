import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { Grant, User } from 'src/entities/entities';
import { UsersController } from 'src/controllers/controllers';
import { GrantsService, JwtService, UsersService } from 'src/services/services';
import { GrantsModule } from '../grants/grants.module';
import { forwardRef } from '@nestjs/common/utils/forward-ref.util';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Grant]),
    forwardRef(() => GrantsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService, GrantsService],
  exports: [UsersService],
})
export class UsersModule {}
