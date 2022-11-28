import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from 'src/entities/entities';
import { TeachersController } from 'src/controllers/controllers';
import { TeachersService } from 'src/services/services';
import { Module } from 'src/common/decorators/decorators';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
