// src/files/dto/upload-file.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadFileDto {
  @IsNotEmpty() @IsString() filename: string;
  @IsNotEmpty() @IsString() url: string;
}
