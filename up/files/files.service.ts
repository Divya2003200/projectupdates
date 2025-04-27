// src/files/files.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './file.entity';
import { UploadFileDto } from './dto/upload-file.dto';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File) private repo: Repository<File>,
  ) {}

  async upload(project: Project, dto: UploadFileDto, uploader: User): Promise<File> {
    const f = this.repo.create({ ...dto, project, uploader });
    return this.repo.save(f);
  }

  async findByProject(projectId: number): Promise<File[]> {
    return this.repo.find({ where: { project: { id: projectId } } });
  }
}
