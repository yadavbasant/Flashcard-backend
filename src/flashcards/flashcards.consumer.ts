import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FlashcardsConsumer implements OnModuleInit {
  private kafkaConsumer;

  constructor() {
    const configService = new ConfigService(); // you can also inject it if using DI
    const kafka = new Kafka({
      brokers: [configService.get<string>('KAFKA_BROKER') || 'localhost:9092'],
    });
    this.kafkaConsumer = kafka.consumer({ groupId: 'flashcards-group' });
  }

  async onModuleInit() {
    await this.kafkaConsumer.connect();
    await this.kafkaConsumer.subscribe({ topic: 'flashcard_created', fromBeginning: true });

    await this.kafkaConsumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log(`Received message: ${message.value.toString()}`);
        // Process the message as needed
      },
    });
  }
}
