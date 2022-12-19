import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { StudentsController } from 'src/controllers/controllers';
import {
  Department,
  Faculty,
  Group,
  Student,
  User,
} from 'src/entities/entities';
import {
  DepartmentsService,
  FacultiesService,
  GroupsService,
  StudentsService,
  UsersService,
} from 'src/services/services';
import { DepartmentsModule } from './departments.module';
import { FacultiesModule } from './faculties.module';
import { GroupsModule } from './groups.module';
import { UsersModule } from './users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, User, Group, Department, Faculty]),
    UsersModule,
    GroupsModule,
    DepartmentsModule,
    FacultiesModule,
  ],
  controllers: [StudentsController],
  providers: [
    StudentsService,
    GroupsService,
    DepartmentsService,
    FacultiesService,
    UsersService,
  ],
})
export class StudentsModule {}
