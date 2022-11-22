import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DisciplinesController } from './disciplines.controller';
import { Discipline } from './discipline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Discipline])],
  controllers: [DisciplinesController],
})
export class DisciplinesModule {}
