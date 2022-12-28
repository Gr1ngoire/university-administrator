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

  getById(idToFind: number): Promise<DisciplinesGetAllItemResponseDto | null> {
    return this.repository.findOne({
      where: {
        id: idToFind,
      },
      select: {
        id: true,
        name: true,
      },
    });
  }

  async getAll(): Promise<DisciplinesGetAllResponseDto> {
    const disciplinesModels = await this.repository.find({
      select: {
        id: true,
        name: true,
      },
    });

    return {
      items: disciplinesModels,
    };
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
    const discipline = await this.getById(idToUpdate);

    if (!discipline) {
      throw new NotFoundException(ExceptionsMessages.DISCIPLINE_NOT_FOUD);
    }

    Object.assign(discipline, attributes);
    const updatedDiscipline = await this.repository.save(discipline);
    const { id, name } = updatedDiscipline;
    return { id, name };
  }

  async delete(id: number): Promise<number> {
    const discipline = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!discipline) {
      throw new NotFoundException(ExceptionsMessages.DISCIPLINE_NOT_FOUD);
    }

    const { id: idToSend } = discipline;

    await this.repository.remove(discipline);

    return idToSend;
  }
}
