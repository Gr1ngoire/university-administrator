import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { StudentsController } from 'src/controllers/controllers';
import { Department, Faculty, Group, Student } from 'src/entities/entities';
import {
  DepartmentsService,
  FacultiesService,
  GroupsService,
  StudentsService,
} from 'src/services/services';
import { DepartmentsModule } from './departments.module';
import { FacultiesModule } from './faculties.module';
import { GroupsModule } from './groups.module';

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
