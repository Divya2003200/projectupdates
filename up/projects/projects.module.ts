// src/projects/projects.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { Project } from './project.entity';
import { UsersModule } from 'src/users/users.module';
import { MessagesModule } from 'src/messages/messages.module';
import { InvoicesModule } from 'src/invoices/invoices.module';
import { BidsModule } from 'src/bids/bids.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]),UsersModule],  // Register ProjectRepository
  providers: [ProjectsService],
  controllers: [ProjectsController],
  exports: [ProjectsService],  // Export ProjectsService
})
export class ProjectsModule {}
