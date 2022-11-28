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
} from 'src/entities/entities';
import {
  DepartmentsService,
  DisciplinesService,
  FacultiesService,
  GroupsService,
  SchedulesService,
  TeachersService,
} from 'src/services/services';
import { DepartmentsModule } from './departments.module';
import { DisciplinesModule } from './disciplines.module';
import { FacultiesModule } from './faculties.module';
import { GroupsModule } from './groups.module';
import { TeachersModule } from './teachers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Schedule,
      Teacher,
      Discipline,
      Group,
      Department,
      Faculty,
    ]),
    TeachersModule,
    DisciplinesModule,
    GroupsModule,
    DepartmentsModule,
    FacultiesModule,
  ],
  controllers: [SchedulesController],
  providers: [
    SchedulesService,
    TeachersService,
    DisciplinesService,
    GroupsService,
    DepartmentsService,
    FacultiesService,
  ],
})
export class SchedulesModule {}
