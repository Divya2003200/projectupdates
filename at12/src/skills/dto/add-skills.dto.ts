// src/skills/dto/add-skill.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class AddSkillDto {
  @IsNotEmpty() @IsString() name: string;
}
