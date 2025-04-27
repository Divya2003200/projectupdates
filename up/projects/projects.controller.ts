import {
    Controller, Post, Get, Patch, Delete,
    Body, Param, Request, UseGuards,
    NotFoundException
  } from '@nestjs/common';
  import { ProjectsService } from './projects.service';
  import { CreateProjectDto } from './dto/create-project.dto';
  import { UpdateProjectDto } from './dto/update-project.dto';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { RolesGuard } from '../common/guards/roles.guard';
  // ← import Roles decorator
  import { Roles } from '../common/Decorators/roles.decorator';
  import { RoleType } from '../common/role.entity';
  import { UsersService } from '../users/users.service';
  
  @Controller('projects')
  @UseGuards(JwtAuthGuard, RolesGuard)
  export class ProjectsController {
    constructor(
      private projectsService: ProjectsService,
      private usersService: UsersService,
    ) {}
  
    @Post()
    @Roles(RoleType.CLIENT)              // ← only clients
    create(@Body() dto: CreateProjectDto, @Request() req) {
      return this.projectsService.create(dto, req.user);
    }
  
    @Get()
    findAll() {
      return this.projectsService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.projectsService.findOne(+id);
    }
  
    @Patch(':id')
    @Roles(RoleType.CLIENT)              // ← only clients
    update(@Param('id') id: string, @Body() dto: UpdateProjectDto) {
      return this.projectsService.update(+id, dto);
    }
  
    @Delete(':id')
    @Roles(RoleType.CLIENT)              // ← only clients
    remove(@Param('id') id: string) {
      return this.projectsService.remove(+id);
    }
  
    @Patch(':id/assign')
    @Roles(RoleType.CLIENT)
    async assign(
      @Param('id') id: string,
      @Body('freelancerId') freelancerId: number,
    ) {
      const freelancer = await this.usersService.findById(freelancerId);
      if (!freelancer) {
        throw new NotFoundException(`Freelancer ${freelancerId} not found`);
      }
      return this.projectsService.assignFreelancer(+id, freelancer);
    }
  }
  