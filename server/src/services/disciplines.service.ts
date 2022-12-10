import { Repository } from 'typeorm';
import { Injectable, InjectRepository } from 'src/common/decorators/decorators';
import { ExceptionsMessages } from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  CreateDisciplineRequestDto,
  DisciplinesGetAllItemResponseDto,
  DisciplinesGetAllResponseDto,
  UpdateDisciplineRequestDto,
} from 'src/common/types/types';
import { Discipline } from 'src/entities/entities';

@Injectable()
export class DisciplinesService {
  constructor(
    @InjectRepository(Discipline) private repository: Repository<Discipline>,
  ) {}

  getModelById(id: number): Promise<Discipline | null> {
    return this.repository.findOne({ where: { id } });
  }

  async getAll(): Promise<DisciplinesGetAllResponseDto> {
    const disciplinesModels = await this.repository.find();

    return { items: disciplinesModels };
  }

  async getById(id: number): Promise<DisciplinesGetAllItemResponseDto | null> {
    const discipline = await this.getModelById(id);

    return discipline as DisciplinesGetAllItemResponseDto;
  }

  create(discipline: CreateDisciplineRequestDto): Promise<Discipline> {
    const newDiscipline = this.repository.create(discipline);

    return this.repository.save(newDiscipline);
  }

  async update(
    id: number,
    attributes: Partial<UpdateDisciplineRequestDto>,
  ): Promise<Discipline> {
    const discipline = await this.getModelById(id);

    if (!discipline) {
      throw new NotFoundException(ExceptionsMessages.DISCIPLINE_NOT_FOUD);
    }

    Object.assign(discipline, attributes);
    return this.repository.save(discipline);
  }

  async delete(id: number): Promise<number> {
    const discipline = await this.getModelById(id);

    if (!discipline) {
      throw new NotFoundException(ExceptionsMessages.DISCIPLINE_NOT_FOUD);
    }

    const { id: idToSend } = discipline;

    await this.repository.remove(discipline);

    return idToSend;
  }
}
