import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from 'src/common/decorators/decorators';
import { NewsController } from 'src/controllers/controllers';
import { News } from 'src/entities/entities';
import { JwtService, NewsService } from 'src/services/services';

@Module({
  imports: [TypeOrmModule.forFeature([News])],
  controllers: [NewsController],
  providers: [NewsService, JwtService],
})
export class NewsModule {}
