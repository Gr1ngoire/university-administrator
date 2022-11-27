import { Injectable, InjectRepository } from 'src/common/decorators/decorators';
import { ExceptionsMessages } from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  CreateDisciplineRequestDto,
  UpdateDisciplineRequestDto,
} from 'src/common/types/types';
import { Repository } from 'typeorm';
import { Discipline } from './discipline.entity';
@Injectable()
export class DisciplinesService {
  constructor(
    @InjectRepository(Discipline) private repository: Repository<Discipline>,
  ) {}

  getAll(): Promise<Discipline[]> {
    return this.repository.find();
  }

  getById(id: number): Promise<Discipline | null> {
    return this.repository.findOne({ where: { id } });
  }

  create(discipline: CreateDisciplineRequestDto): Promise<Discipline> {
    const newDiscipline = this.repository.create(discipline);

    return this.repository.save(newDiscipline);
  }

  async update(
    id: number,
    attributes: Partial<UpdateDisciplineRequestDto>,
  ): Promise<Discipline> {
    const discipline = await this.getById(id);
    if (!discipline) {
      throw new NotFoundException(ExceptionsMessages.DISCIPLINE_NOT_FOUD);
    }

    Object.assign(discipline, attributes);
    return this.repository.save(discipline);
  }

  async delete(id: number): Promise<Discipline> {
    const discipline = await this.getById(id);

    if (!discipline) {
      throw new NotFoundException(ExceptionsMessages.DISCIPLINE_NOT_FOUD);
    }

    return this.repository.remove(discipline);
  }
}
