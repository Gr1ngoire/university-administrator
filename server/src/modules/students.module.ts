import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { StudentsController } from 'src/controllers/controllers';
import {
  Department,
  Faculty,
  Grant,
  Group,
  Student,
  User,
} from 'src/entities/entities';
import {
  DepartmentsService,
  FacultiesService,
  GrantsService,
  GroupsService,
  JwtService,
  StudentsService,
  UsersService,
} from 'src/services/services';
import { DepartmentsModule } from './departments.module';
import { FacultiesModule } from './faculties.module';
import { GrantsModule } from './grants.module';
import { GroupsModule } from './groups.module';
import { UsersModule } from './users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      User,
      Grant,
      Group,
      Department,
      Faculty,
    ]),
    UsersModule,
    GrantsModule,
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
    UsersService,
    GrantsService,
    JwtService,
  ],
})
export class StudentsModule {}
