import { Test, TestingModule } from '@nestjs/testing';
import { SessionApiController } from './session-api.controller';
import { SessionApiService } from './session-api.service';

describe('SessionApiController', () => {
  let sessionApiController: SessionApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SessionApiController],
      providers: [SessionApiService],
    }).compile();

    sessionApiController = app.get<SessionApiController>(SessionApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(sessionApiController.getHello()).toBe('Hello World!');
    });
  });
});
