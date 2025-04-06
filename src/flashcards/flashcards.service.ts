import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Flashcard } from './schemas/flashcard.schema';
import { Kafka } from 'kafkajs';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FlashcardsService implements OnModuleInit {
  private kafkaProducer;

  constructor(@InjectModel(Flashcard.name) private flashcardModel: Model<Flashcard>) {
    // inside the constructor or function
    const configService = new ConfigService(); // you can also inject it if using DI
    const kafka = new Kafka({
      brokers: [configService.get<string>('KAFKA_BROKER') || 'localhost:9092'],
    });
    this.kafkaProducer = kafka.producer();
  }

  async onModuleInit() {
    await this.kafkaProducer.connect();
  }

  async create(createFlashcardDto: any) {
    const createdFlashcard = new this.flashcardModel(createFlashcardDto);
    await createdFlashcard.save();
    await this.kafkaProducer.send({
      topic: 'flashcard_created',
      messages: [{ value: JSON.stringify(createdFlashcard) }],
    });
    return createdFlashcard;
  }

  async findAll(): Promise<Flashcard[]> {
    return this.flashcardModel.find().exec();
  }
}
