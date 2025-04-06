// src/flashcards/flashcards.controller.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { FlashcardsController } from './flashcards.controller';
import { FlashcardsService } from './flashcards.service';

describe('FlashcardsController', () => {
  let controller: FlashcardsController;
  let service: FlashcardsService;

  const mockService = {
    create: jest.fn(dto => ({ id: 'abc123', ...dto })),
    findAll: jest.fn().mockResolvedValue([
      { id: '1', question: 'Q', answer: 'A', category: 'C' },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlashcardsController],
      providers: [
        { provide: FlashcardsService, useValue: mockService },
      ],
    }).compile();

    controller = module.get<FlashcardsController>(FlashcardsController);
    service = module.get<FlashcardsService>(FlashcardsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a flashcard', async () => {
    const dto = { question: 'Q', answer: 'A', category: 'C' };
    expect(await controller.create(dto)).toEqual({
      id: 'abc123',
      ...dto,
    });
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it('should return all flashcards', async () => {
    const result = await controller.findAll();
    expect(result.length).toBeGreaterThan(0);
    expect(mockService.findAll).toHaveBeenCalled();
  });
});
