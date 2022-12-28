import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Department,
  Faculty,
  Grant,
  Teacher,
  User,
} from 'src/entities/entities';
import { TeachersController } from 'src/controllers/controllers';
import {
  DepartmentsService,
  TeachersService,
  FacultiesService,
  UsersService,
  JwtService,
  GrantsService,
} from 'src/services/services';
import { Module } from 'src/common/decorators/decorators';
import { DepartmentsModule } from '../departments/departments.module';
import { FacultiesModule } from '../faculties/faculties.module';
import { UsersModule } from '../users/users.module';
import { GrantsModule } from '../grants/grants.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Teacher, Department, Faculty, User, Grant]),
    DepartmentsModule,
    FacultiesModule,
    UsersModule,
    GrantsModule,
  ],
  controllers: [TeachersController],
  providers: [
    TeachersService,
    DepartmentsService,
    FacultiesService,
    UsersService,
    GrantsService,
    JwtService,
  ],
})
export class TeachersModule {}
