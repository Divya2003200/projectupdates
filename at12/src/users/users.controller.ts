// src/users/users.controller.ts
import { Controller, Get, Patch, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { Skill } from 'src/skills/skill.entity';


@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getProfile(@Req() req) {
    return this.usersService.findById(req.user.sub);
  }

  @Patch('me')
  updateProfile(@Req() req, @Body() dto: UpdateUserDto) {
    return this.usersService.update(req.user.sub, dto);
  }


  @Patch('me/skills')
  updateSkills(@Req() req, @Body() skills: Skill[]) {
    return this.usersService.updateSkills(req.user.sub, skills);
  }
}
