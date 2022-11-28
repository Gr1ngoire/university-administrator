import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentsController } from './students.controller';
import { Module } from 'src/common/decorators/decorators';
import { GroupsModule } from 'src/groups/groups.module';
import { DepartmentsModule } from 'src/departments/departments.module';
import { Group } from 'src/groups/group.entity';
import { Department } from 'src/departments/department.entity';
import { DepartmentsService } from 'src/departments/departments.service';
import { GroupsService } from 'src/groups/groups.service';
import { Faculty } from 'src/faculties/faculty.entity';
import { FacultiesModule } from 'src/faculties/faculties.module';
import { FacultiesService } from 'src/faculties/faculties.service';
import { StudentsService } from './students.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Student, Group, Department, Faculty]),
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
  ],
})
export class StudentsModule {}
