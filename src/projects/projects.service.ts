// src/projects/projects.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepo: Repository<Project>,
  ) {}

  async create(dto: CreateProjectDto, client: User): Promise<Project> {
    const project = this.projectRepo.create({ ...dto, client });
    return this.projectRepo.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectRepo.find();
  }

  async findOne(id: number): Promise<Project> {
    const proj = await this.projectRepo.findOne({ where: { id } });
    if (!proj) throw new NotFoundException('Project not found');
    return proj;
  }

  async update(id: number, dto: UpdateProjectDto): Promise<Project> {
    await this.projectRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const res = await this.projectRepo.delete(id);
    if (res.affected === 0) throw new NotFoundException('Project not found');
  }

  async assignFreelancer(id: number, freelancer: User): Promise<Project> {
    const proj = await this.findOne(id);
    proj.assignedFreelancer = freelancer;
    proj.status = 'assigned';
    return this.projectRepo.save(proj);
  }
}
