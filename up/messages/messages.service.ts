// src/messages/messages.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { SendMessageDto } from './dto/send-message.dto';
import { User } from '../users/user.entity';
import { Project } from '../projects/project.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private repo: Repository<Message>,
  ) {}

  async send(project: Project, dto: SendMessageDto, sender: User): Promise<Message> {
    const msg = this.repo.create({ ...dto, project, sender });
    return this.repo.save(msg);
  }

  async findThread(projectId: number): Promise<Message[]> {
    return this.repo.find({ where: { project: { id: projectId } }, order: { sentAt: 'ASC' } });
  }
}
