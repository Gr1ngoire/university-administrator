import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { DepartmentsController } from 'src/controllers/controllers';
import { Department, Faculty } from 'src/entities/entities';
import { DepartmentsService, FacultiesService } from 'src/services/services';
import { FacultiesModule } from './faculties.module';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Faculty]), FacultiesModule],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, FacultiesService],
})
export class DepartmentsModule {}
