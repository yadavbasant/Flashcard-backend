import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardsService } from './flashcards.service';
import { getModelToken } from '@nestjs/mongoose';
import { Flashcard } from './schemas/flashcard.schema';

describe('FlashcardsService', () => {
  let service: FlashcardsService;

  const mockFlashcardModel = {
    new: jest.fn().mockResolvedValue({}),
    constructor: jest.fn().mockResolvedValue({}),
    find: jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue([{ question: 'Q', answer: 'A', category: 'C' }]),
    }),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FlashcardsService,
        {
          provide: getModelToken(Flashcard.name),
          useValue: mockFlashcardModel,
        },
      ],
    }).compile();

    service = module.get<FlashcardsService>(FlashcardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all flashcards', async () => {
    const result = await service.findAll();
    expect(result).toEqual([{ question: 'Q', answer: 'A', category: 'C' }]);
  });
});
