import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultiesController } from './faculties.controller';
import { Faculty } from './faculty.enitity';

@Module({
  imports: [TypeOrmModule.forFeature([Faculty])],
  controllers: [FacultiesController],
})
export class FacultiesModule {}
