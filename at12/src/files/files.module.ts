// src/files/files.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './file.entity';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]),
    ProjectsModule,
  ],
  providers: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
