import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentsController } from './students.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentsController],
})
export class StudentsModule {}
