import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
} from 'src/common/decorators/decorators';
import { ApiPath, ExceptionsMessages, NewsApi } from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  CreateFaqMessageValidationDto,
  GetByIdParams,
} from 'src/common/validation-dtos/validation-dtos';
import { JwtAuthGuard } from 'src/guards/guards';
import { FaqMessagesService } from 'src/services/services';

@UseGuards(JwtAuthGuard)
@Controller(ApiPath.FAQ)
export class FaqMessagesController {
  constructor(private faqMessagesService: FaqMessagesService) {}

  @Get(NewsApi.ROOT)
  getAll() {
    return this.faqMessagesService.getAll();
  }

  @Get(NewsApi.$ID)
  async getById(@Param() params: GetByIdParams) {
    const { id } = params;
    const news = await this.faqMessagesService.getById(id);

    if (!news) {
      throw new NotFoundException(ExceptionsMessages.NEWS_NOT_FOUND);
    }

    return news;
  }

  @Post(NewsApi.ROOT)
  create(@Body() news: CreateFaqMessageValidationDto) {
    return this.faqMessagesService.create(news);
  }
}
