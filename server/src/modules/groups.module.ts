import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { GroupsController } from 'src/controllers/controllers';
import { Department, Faculty, Group } from 'src/entities/entities';
import {
  DepartmentsService,
  FacultiesService,
  GroupsService,
  JwtService,
} from 'src/services/services';
import { DepartmentsModule } from './departments.module';
import { FacultiesModule } from './faculties.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group, Department, Faculty]),
    DepartmentsModule,
    FacultiesModule,
  ],
  controllers: [GroupsController],
  providers: [GroupsService, DepartmentsService, FacultiesService, JwtService],
})
export class GroupsModule {}
