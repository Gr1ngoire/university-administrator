import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discipline } from './discipline.entity';

@Injectable()
export class DisciplinesService {
  constructor(
    @InjectRepository(Discipline) private repository: Repository<Discipline>,
  ) {}

  createDiscipline(name: string): Promise<Discipline> {
    const discipline = this.repository.create({ name });

    return this.repository.save(discipline);
  }
}
