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

    return {
      items: disciplinesModels.map(({ id, name }) => ({ id, name })),
    };
  }

  async getById(
    idToFind: number,
  ): Promise<DisciplinesGetAllItemResponseDto | null> {
    const discipline = await this.getModelById(idToFind);

    const { id, name } = discipline;
    return { id, name };
  }

  async create(
    discipline: CreateDisciplineRequestDto,
  ): Promise<DisciplinesGetAllItemResponseDto> {
    const newDiscipline = this.repository.create(discipline);

    const createdDiscipline = await this.repository.save(newDiscipline);
    const { id, name } = createdDiscipline;
    return { id, name };
  }

  async update(
    idToUpdate: number,
    attributes: Partial<UpdateDisciplineRequestDto>,
  ): Promise<DisciplinesGetAllItemResponseDto> {
    const discipline = await this.getModelById(idToUpdate);

    if (!discipline) {
      throw new NotFoundException(ExceptionsMessages.DISCIPLINE_NOT_FOUD);
    }

    Object.assign(discipline, attributes);
    const updatedDiscipline = await this.repository.save(discipline);
    const { id, name } = updatedDiscipline;
    return { id, name };
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
