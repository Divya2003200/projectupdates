// src/bids/bids.controller.ts
import {
    Controller, Post, Get, Param, Body,
    UseGuards, Request
  } from '@nestjs/common';
  import { BidsService } from './bids.service';
  import { CreateBidDto } from './dto/create-bid.sto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RolesGuard } from '../common/guards/roles.guard';
  import { Roles } from '../common/Decorators/roles.decorator';
  import { RoleType } from '../common/role.entity';
  import { ProjectsService } from '../projects/projects.service';
  
  @Controller('projects/:projectId/bids')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class BidsController {
    constructor(
      private bidsService: BidsService,
      private projectsService: ProjectsService,
    ) {}
  
    @Post()
    @Roles(RoleType.FREELANCER)
    async create(
      @Param('projectId') pid: string,
      @Body() dto: CreateBidDto,
      @Request() req
    ) {
      const project = await this.projectsService.findOne(+pid);
      return this.bidsService.create(project, dto, req.user);
    }
  
    @Get()
    @Roles(RoleType.CLIENT)
    findAll(@Param('projectId') pid: string) {
      return this.bidsService.findByProject(+pid);
    }
  }
  