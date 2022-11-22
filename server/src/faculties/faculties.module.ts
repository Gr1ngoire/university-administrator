import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultiesController } from './faculties.controller';
import { Faculty } from './faculty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Faculty])],
  controllers: [FacultiesController],
})
export class FacultiesModule {}
