import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { FacultiesModule } from 'src/faculties/faculties.module';
import { FacultiesService } from 'src/faculties/faculties.service';
import { Faculty } from 'src/faculties/faculty.entity';
import { Department } from './department.entity';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Faculty]), FacultiesModule],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, FacultiesService],
})
export class DepartmentsModule {}
