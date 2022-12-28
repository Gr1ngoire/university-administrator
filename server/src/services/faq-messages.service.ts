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

  async getAll(): Promise<FaqMessagesGetAllResponseDto> {
    const faqMessagesModels = await this.repository.find({
      relations: {
        author: {
          grant: {
            id: true,
            userId: true,
            grant: true,
            granterId: true,
          },
        },
      },
      select: {
        id: true,
        createdAt: true,
        message: true,
        authorId: true,
      },
    });

    return {
      items: faqMessagesModels.map((faqMessage) => ({
        ...faqMessage,
        createdAt: String(faqMessage.createdAt),
        author: { ...faqMessage.author, grant: faqMessage.author.grant.grant },
      })),
    };
  }

  async getById(id: number): Promise<FaqMessagesGetAllItemResponseDto | null> {
    const faqMessage = await this.repository.findOne({
      where: { id },
      relations: {
        author: {
          grant: {
            id: true,
            userId: true,
            grant: true,
            granterId: true,
          },
        },
      },
      select: {
        id: true,
        createdAt: true,
        message: true,
        authorId: true,
      },
    });

    return {
      ...faqMessage,
      createdAt: String(faqMessage.createdAt),
      author: { ...faqMessage.author, grant: faqMessage.author.grant.grant },
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
