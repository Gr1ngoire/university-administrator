import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  UseGuards,
} from 'src/common/decorators/decorators';
import { ApiPath, ExceptionsMessages, NewsApi } from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  CreateNewsValidationDto,
  GetByIdParams,
  UpdateNewsValidationDto,
} from 'src/common/validation-dtos/validation-dtos';
import { JwtAuthGuard } from 'src/guards/guards';
import { NewsService } from 'src/services/services';

@Controller(ApiPath.NEWS)
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get(NewsApi.ROOT)
  getAll() {
    return this.newsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(NewsApi.$ID)
  async getById(@Param() params: GetByIdParams) {
    const { id } = params;
    const news = await this.newsService.getById(id);

    if (!news) {
      throw new NotFoundException(ExceptionsMessages.NEWS_NOT_FOUND);
    }

    return news;
  }

  @UseGuards(JwtAuthGuard)
  @Post(NewsApi.ROOT)
  create(@Body() news: CreateNewsValidationDto) {
    return this.newsService.create(news);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(NewsApi.$ID)
  update(
    @Param() params: GetByIdParams,
    @Body() news: UpdateNewsValidationDto,
  ) {
    const { id } = params;

    return this.newsService.update(id, news);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(NewsApi.$ID)
  delete(@Param() params: GetByIdParams) {
    const { id } = params;

    return this.newsService.delete(id);
  }
}
