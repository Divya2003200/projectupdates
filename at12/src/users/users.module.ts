// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService }    from './users.service';
import { UsersController } from './users.controller';
import { User }            from './user.entity';
import { Role } from 'src/common/role.entity';
import { Skill } from 'src/skills/skill.entity';

@Module({
  imports: [
    // ← this automatically provides Repository<User> for injection
    TypeOrmModule.forFeature([User,Role,Skill]),
  ],
  providers: [
    UsersService,            // no custom USER_REPO provider any more
  ],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
