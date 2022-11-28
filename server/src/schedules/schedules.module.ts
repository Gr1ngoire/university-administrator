import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from './schedule.entity';
import { SchedulesController } from './schedules.controller';
import { Module } from 'src/common/decorators/decorators';
import { Discipline } from 'src/disciplines/discipline.entity';
import { Teacher } from 'src/teachers/teacher.entity';
import { Department } from 'src/departments/department.entity';
import { Faculty } from 'src/faculties/faculty.entity';
import { Group } from 'src/groups/group.entity';
import { TeachersModule } from 'src/teachers/teachers.module';
import { DisciplinesModule } from 'src/disciplines/disciplines.module';
import { GroupsModule } from 'src/groups/groups.module';
import { DepartmentsModule } from 'src/departments/departments.module';
import { FacultiesModule } from 'src/faculties/faculties.module';
import { SchedulesService } from './schedules.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { DisciplinesService } from 'src/disciplines/disciplines.service';
import { GroupsService } from 'src/groups/groups.service';
import { DepartmentsService } from 'src/departments/departments.service';
import { FacultiesService } from 'src/faculties/faculties.service';

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
