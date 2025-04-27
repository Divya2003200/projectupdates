// src/milestones/dto/create-milestone.dto.ts
import { IsNotEmpty, IsString, IsDateString, IsNumber } from 'class-validator';

export class CreateMilestoneDto {
  @IsNotEmpty() @IsString()     title: string;
  @IsNotEmpty() @IsDateString() dueDate: string;
  @IsNotEmpty() @IsNumber()     amount: number;
}
