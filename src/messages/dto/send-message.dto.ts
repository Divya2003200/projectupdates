// src/messages/dto/send-message.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class SendMessageDto {
  @IsNotEmpty() @IsString() text: string;
}
