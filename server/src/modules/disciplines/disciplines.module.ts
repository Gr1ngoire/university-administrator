import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplinesController } from 'src/controllers/controllers';
import { Discipline } from 'src/entities/entities';
import { DisciplinesService, JwtService } from 'src/services/services';
import { Module } from 'src/common/decorators/decorators';

@Module({
  imports: [TypeOrmModule.forFeature([Discipline])],
  controllers: [DisciplinesController],
  providers: [DisciplinesService, JwtService],
})
export class DisciplinesModule {}
