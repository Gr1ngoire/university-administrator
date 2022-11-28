import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsController } from './groups.controller';
import { Group } from './group.entity';
import { Module } from 'src/common/decorators/decorators';
import { GroupsService } from './groups.service';
import { DepartmentsService } from 'src/departments/departments.service';
import { DepartmentsModule } from 'src/departments/departments.module';
import { Department } from 'src/departments/department.entity';
import { FacultiesService } from 'src/faculties/faculties.service';
import { FacultiesModule } from 'src/faculties/faculties.module';
import { Faculty } from 'src/faculties/faculty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, Department, Faculty]),
    DepartmentsModule,
    FacultiesModule,
  ],
  controllers: [GroupsController],
  providers: [GroupsService, DepartmentsService, FacultiesService],
})
export class GroupsModule {}
