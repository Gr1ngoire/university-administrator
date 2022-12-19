import { TypeOrmModule } from '@nestjs/typeorm';
import { Department, Faculty, Teacher, User } from 'src/entities/entities';
import { TeachersController } from 'src/controllers/controllers';
import {
  DepartmentsService,
  TeachersService,
  FacultiesService,
  UsersService,
} from 'src/services/services';
import { Module } from 'src/common/decorators/decorators';
import { DepartmentsModule } from './departments.module';
import { FacultiesModule } from './faculties.module';
import { UsersModule } from './users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, Department, Faculty, User]),
    DepartmentsModule,
    FacultiesModule,
    UsersModule,
  ],
  controllers: [TeachersController],
  providers: [
    TeachersService,
    DepartmentsService,
    FacultiesService,
    UsersService,
  ],
})
export class TeachersModule {}
