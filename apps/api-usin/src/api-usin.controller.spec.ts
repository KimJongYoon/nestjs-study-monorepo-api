import { Test, TestingModule } from '@nestjs/testing';
import { ApiUsinController } from './api-usin.controller';
import { ApiUsinService } from './api-usin.service';

describe('ApiUsinController', () => {
  let apiUsinController: ApiUsinController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ApiUsinController],
      providers: [ApiUsinService],
    }).compile();

    apiUsinController = app.get<ApiUsinController>(ApiUsinController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(apiUsinController.getHello()).toBe('Hello World!');
    });
  });
});
