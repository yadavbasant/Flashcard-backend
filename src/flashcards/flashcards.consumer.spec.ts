// src/flashcards/flashcards.consumer.spec.ts
import { FlashcardsConsumer } from './flashcards.consumer';
import { Kafka } from 'kafkajs';

jest.mock('kafkajs');

describe('FlashcardsConsumer', () => {
  let consumer: FlashcardsConsumer;
  let mockKafkaConsumer: any;

  beforeEach(async () => {
    mockKafkaConsumer = {
      connect: jest.fn(),
      subscribe: jest.fn(),
      run: jest.fn(({ eachMessage }) => {
        return eachMessage({
          topic: 'flashcard_created',
          partition: 0,
          message: {
            value: Buffer.from(JSON.stringify({ question: 'Q', answer: 'A', category: 'C' })),
          },
        });
      }),
    };

    (Kafka as jest.Mock).mockImplementation(() => ({
      consumer: () => mockKafkaConsumer,
    }));

    consumer = new FlashcardsConsumer();
    await consumer.onModuleInit();
  });

  it('should connect and consume messages', async () => {
    expect(mockKafkaConsumer.connect).toHaveBeenCalled();
    expect(mockKafkaConsumer.subscribe).toHaveBeenCalledWith({
      topic: 'flashcard_created',
      fromBeginning: true,
    });
    expect(mockKafkaConsumer.run).toHaveBeenCalled();
  });
});
