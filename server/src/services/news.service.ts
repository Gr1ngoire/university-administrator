import { Repository } from 'typeorm';
import { Injectable, InjectRepository } from 'src/common/decorators/decorators';
import { ExceptionsMessages } from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  CreateNewsRequestDto,
  NewsGetAllItemResponseDto,
  NewsGetAllResponseDto,
  UpdateNewsRequestDto,
} from 'src/common/types/types';
import { News } from 'src/entities/entities';

@Injectable()
export class NewsService {
  constructor(@InjectRepository(News) private repository: Repository<News>) {}

  getModelById(id: number): Promise<News | null> {
    return this.repository.findOne({ where: { id } });
  }

  async getAll(): Promise<NewsGetAllResponseDto> {
    const newsModels = await this.repository.find();
    return {
      items: newsModels.map(({ id, title, content, imgUrl }) => ({
        id,
        title,
        content,
        imgUrl,
      })),
    };
  }

  async getById(idToFind: number): Promise<NewsGetAllItemResponseDto | null> {
    const news = await this.getModelById(idToFind);

    const { id, title, content, imgUrl } = news;
    return { id, title, content, imgUrl };
  }

  async create(news: CreateNewsRequestDto): Promise<NewsGetAllItemResponseDto> {
    const freshNews = this.repository.create(news);

    const createdNews = await this.repository.save(freshNews);
    const { id, content, title, imgUrl } = createdNews;
    return { id, content, title, imgUrl };
  }

  async update(
    idToUpdate: number,
    news: Partial<UpdateNewsRequestDto>,
  ): Promise<NewsGetAllItemResponseDto> {
    const newsToUpdate = await this.getModelById(idToUpdate);

    if (!newsToUpdate) {
      throw new NotFoundException(ExceptionsMessages.NEWS_NOT_FOUND);
    }

    Object.assign(newsToUpdate, news);
    const updatedNews = await this.repository.save(newsToUpdate);
    const { id, content, title, imgUrl } = updatedNews;
    return { id, content, title, imgUrl };
  }

  async delete(id: number): Promise<number> {
    const news = await this.getModelById(id);

    if (!news) {
      throw new NotFoundException(ExceptionsMessages.NEWS_NOT_FOUND);
    }

    const { id: idToSend } = news;

    this.repository.remove(news);

    return idToSend;
  }
}
