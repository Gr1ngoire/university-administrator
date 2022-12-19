import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { SchedulesController } from 'src/controllers/controllers';
import {
  Department,
  Discipline,
  Faculty,
  Group,
  Schedule,
  Teacher,
  User,
} from 'src/entities/entities';
import {
  DepartmentsService,
  DisciplinesService,
  FacultiesService,
  GroupsService,
  SchedulesService,
  TeachersService,
  UsersService,
} from 'src/services/services';
import { DepartmentsModule } from './departments.module';
import { DisciplinesModule } from './disciplines.module';
import { FacultiesModule } from './faculties.module';
import { GroupsModule } from './groups.module';
import { TeachersModule } from './teachers.module';
import { UsersModule } from './users.module';

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
    ]),
    TeachersModule,
    DisciplinesModule,
    GroupsModule,
    DepartmentsModule,
    FacultiesModule,
    UsersModule,
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
  ],
})
export class SchedulesModule {}
