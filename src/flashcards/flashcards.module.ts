// src/flashcards/flashcards.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlashcardsService } from './flashcards.service';
import { FlashcardsController } from './flashcards.controller';
import { Flashcard, FlashcardSchema } from './schemas/flashcard.schema';
import { FlashcardsConsumer } from './flashcards.consumer';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Flashcard.name, schema: FlashcardSchema }])
  ],
  controllers: [FlashcardsController],
  providers: [FlashcardsService, FlashcardsConsumer],
})
export class FlashcardsModule {}
