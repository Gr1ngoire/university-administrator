import { Injectable, InjectRepository } from 'src/common/decorators/decorators';
import { ExceptionsMessages } from 'src/common/enums/enums';
import { NotFoundException } from 'src/common/exceptions/excpetions';
import {
  CreateFacultyRequestDto,
  UpdateFacultyRequestDto,
} from 'src/common/types/types';
import { Repository } from 'typeorm';
import { Faculty } from './faculty.entity';

@Injectable()
export class FacultiesService {
  constructor(
    @InjectRepository(Faculty) private repository: Repository<Faculty>,
  ) {}

  getAll(): Promise<Faculty[]> {
    return this.repository.find();
  }

  getById(id: number): Promise<Faculty | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(faculty: CreateFacultyRequestDto): Promise<Faculty> {
    const newFaculty = await this.repository.create(faculty);

    return this.repository.save(newFaculty);
  }

  async update(id: number, faculty: UpdateFacultyRequestDto): Promise<Faculty> {
    const facultyToUpdate = await this.getById(id);

    if (!facultyToUpdate) {
      throw new NotFoundException(ExceptionsMessages.FACULTY_NOT_FOUND);
    }

    Object.assign(facultyToUpdate, faculty);
    return this.repository.save(facultyToUpdate);
  }

  async delete(id: number): Promise<Faculty> {
    const faculty = await this.getById(id);

    if (!faculty) {
      throw new NotFoundException(ExceptionsMessages.FACULTY_NOT_FOUND);
    }

    return this.repository.remove(faculty);
  }
}
