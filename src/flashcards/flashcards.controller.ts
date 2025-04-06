import { Controller, Get, Post, Body } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Post()
  async create(@Body() createFlashcardDto: any) {
    return this.flashcardsService.create(createFlashcardDto);
  }

  @Get()
  async findAll() {
    return this.flashcardsService.findAll();
  }
}
