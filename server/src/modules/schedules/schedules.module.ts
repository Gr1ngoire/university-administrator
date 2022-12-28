import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { SchedulesController } from 'src/controllers/controllers';
import {
  Department,
  Discipline,
  Faculty,
  Grant,
  Group,
  Schedule,
  Teacher,
  User,
} from 'src/entities/entities';
import {
  DepartmentsService,
  DisciplinesService,
  FacultiesService,
  GrantsService,
  GroupsService,
  JwtService,
  SchedulesService,
  TeachersService,
  UsersService,
} from 'src/services/services';
import { DepartmentsModule } from '../departments/departments.module';
import { DisciplinesModule } from '../disciplines/disciplines.module';
import { FacultiesModule } from '../faculties/faculties.module';
import { GrantsModule } from '../grants/grants.module';
import { GroupsModule } from '../groups/groups.module';
import { TeachersModule } from '../teachers/teachers.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Schedule,
      Teacher,
      Discipline,
      Group,
      Department,
      Faculty,
      User,
      Grant,
    ]),
    TeachersModule,
    DisciplinesModule,
    GroupsModule,
    DepartmentsModule,
    FacultiesModule,
    UsersModule,
    GrantsModule,
  ],
  controllers: [SchedulesController],
  providers: [
    SchedulesService,
    TeachersService,
    DisciplinesService,
    GroupsService,
    DepartmentsService,
    FacultiesService,
    UsersService,
    GrantsService,
    JwtService,
  ],
})
export class SchedulesModule {}
