import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './teacher.entity';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';
import { Module } from 'src/common/decorators/decorators';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
