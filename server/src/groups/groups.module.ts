import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsController } from './groups.controller';
import { Group } from './group.entity';
import { Module } from 'src/common/decorators/decorators';
import { GroupsService } from './groups.service';
import { DepartmentsService } from 'src/departments/departments.service';
import { DepartmentsModule } from 'src/departments/departments.module';
import { Department } from 'src/departments/department.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Department]), DepartmentsModule],
  controllers: [GroupsController],
  providers: [GroupsService, DepartmentsService],
})
export class GroupsModule {}
