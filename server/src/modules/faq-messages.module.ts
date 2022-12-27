import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { FaqMessagesController } from 'src/controllers/controllers';
import { FaqMessage, Grant, User } from 'src/entities/entities';
import {
  FaqMessagesService,
  GrantsService,
  JwtService,
  UsersService,
} from 'src/services/services';
import { GrantsModule } from './grants.module';
import { UsersModule } from './users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FaqMessage, User, Grant]),
    UsersModule,
    GrantsModule,
  ],
  controllers: [FaqMessagesController],
  providers: [FaqMessagesService, UsersService, GrantsService, JwtService],
})
export class FaqMessagesModule {}
