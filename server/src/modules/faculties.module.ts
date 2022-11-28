import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultiesController } from 'src/controllers/controllers';
import { FacultiesService } from 'src/services/services';
import { Faculty } from 'src/entities/entities';
import { Module } from 'src/common/decorators/decorators';

@Module({
  imports: [TypeOrmModule.forFeature([Faculty])],
  controllers: [FacultiesController],
  providers: [FacultiesService],
})
export class FacultiesModule {}
