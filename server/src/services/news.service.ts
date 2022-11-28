import { Repository } from 'typeorm';
import { Injectable, InjectRepository } from 'src/common/decorators/decorators';
import { ExceptionsMessages } from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  CreateNewsRequestDto,
  UpdateNewsRequestDto,
} from 'src/common/types/types';
import { News } from 'src/entities/entities';

@Injectable()
export class NewsService {
  constructor(@InjectRepository(News) private repository: Repository<News>) {}

  getAll(): Promise<News[]> {
    return this.repository.find();
  }

  getById(id: number): Promise<News | null> {
    return this.repository.findOne({ where: { id } });
  }

  create(news: CreateNewsRequestDto): Promise<News> {
    const freshNews = this.repository.create(news);

    return this.repository.save(freshNews);
  }

  async update(id: number, news: Partial<UpdateNewsRequestDto>): Promise<News> {
    const newsToUpdate = await this.getById(id);

    if (!newsToUpdate) {
      throw new NotFoundException(ExceptionsMessages.NEWS_NOT_FOUND);
    }

    Object.assign(newsToUpdate, news);
    return this.repository.save(newsToUpdate);
  }

  async delete(id: number): Promise<News> {
    const news = await this.getById(id);

    if (!news) {
      throw new NotFoundException(ExceptionsMessages.NEWS_NOT_FOUND);
    }

    return this.repository.remove(news);
  }
}
