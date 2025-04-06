// src/flashcards/dto/create-flashcard.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFlashcardDto {
  @ApiProperty({ example: 'What is NestJS?' })
  @IsString()
  @IsNotEmpty()
  question: string;

  @ApiProperty({ example: 'A progressive Node.js framework for building server-side applications.' })
  @IsString()
  @IsNotEmpty()
  answer: string;

  @ApiProperty({ example: 'Backend' })
  @IsString()
  @IsNotEmpty()
  category: string;
}
