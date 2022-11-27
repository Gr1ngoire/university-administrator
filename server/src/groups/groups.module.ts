import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsController } from './groups.controller';
import { Group } from './group.entity';
import { Module } from 'src/common/decorators/decorators';

@Module({
  imports: [TypeOrmModule.forFeature([Group])],
  controllers: [GroupsController],
})
export class GroupsModule {}
