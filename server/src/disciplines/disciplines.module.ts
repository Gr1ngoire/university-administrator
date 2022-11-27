import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplinesController } from './disciplines.controller';
import { Discipline } from './discipline.entity';
import { DisciplinesService } from './disciplines.service';
import { Module } from 'src/common/decorators/decorators';

@Module({
  imports: [TypeOrmModule.forFeature([Discipline])],
  controllers: [DisciplinesController],
  providers: [DisciplinesService],
})
export class DisciplinesModule {}
