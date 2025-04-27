// src/files/files.controller.ts
import {
    Controller, Post, Get, Param,
    Body, UseGuards, Request
  } from '@nestjs/common';
  import { FilesService } from './files.service';
  import { UploadFileDto } from './dto/upload-file.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RolesGuard } from '../common/guards/roles.guard';
  import { Roles } from '../common/Decorators/roles.decorator';
  import { RoleType } from '../common/role.entity';
  import { ProjectsService } from '../projects/projects.service';
  
  @Controller('projects/:projectId/files')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class FilesController {
    constructor(
      private files: FilesService,
      private projects: ProjectsService,
    ) {}
  
    @Post()
    @Roles(RoleType.CLIENT, RoleType.FREELANCER)
    async upload(
      @Param('projectId') pid: string,
      @Body() dto: UploadFileDto,
      @Request() req
    ) {
      const project = await this.projects.findOne(+pid);
      return this.files.upload(project, dto, req.user);
    }
  
    @Get()
    @Roles(RoleType.CLIENT, RoleType.FREELANCER)
    findByProject(@Param('projectId') pid: string) {
      return this.files.findByProject(+pid);
    }
  }
  