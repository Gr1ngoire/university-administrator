import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  createDiscipline(name: string): Promise<Discipline> {
    const discipline = this.repository.create({ name });

    return this.repository.save(discipline);
  }

  async update(
    id: number,
    attributes: Partial<Discipline>,
  ): Promise<Discipline> {
    const discipline = await this.getById(id);
    if (!discipline) {
      throw new NotFoundException('User not found');
    }
    Object.assign(discipline, attributes);

    return this.repository.save(discipline);
  }

  async delete(id: number): Promise<Discipline> {
    const discipline = await this.getById(id);

    if (!discipline) {
      throw new NotFoundException('User not found');
    }

    return this.repository.remove(discipline);
  }
}
