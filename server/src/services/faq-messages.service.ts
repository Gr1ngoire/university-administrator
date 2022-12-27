import { Repository } from 'typeorm';
import { Injectable, InjectRepository } from 'src/common/decorators/decorators';
import { ExceptionsMessages } from 'src/common/enums/enums';
import { BadRequestException } from 'src/common/exceptions/excpetions';
import {
  CreateFaqMessageRequestDto,
  FaqMessagesGetAllItemResponseDto,
  FaqMessagesGetAllResponseDto,
} from 'src/common/types/types';
import { FaqMessage } from 'src/entities/entities';
import { UsersService } from './users.service';

@Injectable()
export class FaqMessagesService {
  constructor(
    @InjectRepository(FaqMessage) private repository: Repository<FaqMessage>,
    private usersService: UsersService,
  ) {}

  getModelById(id: number): Promise<FaqMessage | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        author: {
          grant: true,
        },
      },
    });
  }

  async getAll(): Promise<FaqMessagesGetAllResponseDto> {
    const faqMessagesModels = await this.repository.find({
      relations: {
        author: {
          grant: true,
        },
      },
    });
    return {
      items: faqMessagesModels.map(
        ({ id, createdAt, message, author, authorId }) => ({
          id,
          createdAt: String(createdAt),
          message,
          author: {
            ...author,
            grant: author.grant.grant,
          },
          authorId,
        }),
      ),
    };
  }

  async getById(
    idToFind: number,
  ): Promise<FaqMessagesGetAllItemResponseDto | null> {
    const faqMessage = await this.getModelById(idToFind);

    const { id, createdAt, message, authorId, author } = faqMessage;
    return {
      id,
      createdAt: String(createdAt),
      message,
      authorId,
      author: { ...author, grant: author.grant.grant },
    };
  }

  async create(
    faqMessage: CreateFaqMessageRequestDto,
  ): Promise<FaqMessagesGetAllItemResponseDto> {
    const authorInDb = await this.usersService.getById(faqMessage.authorId);

    if (!authorInDb) {
      throw new BadRequestException({
        message: ExceptionsMessages.AUTHOR_NOT_FOUND,
      });
    }

    const newFaqMessage = this.repository.create(faqMessage);

    const createdFaqMessageModel = await this.repository.save(newFaqMessage);

    return this.getById(createdFaqMessageModel.id);
  }
}
