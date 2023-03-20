import { Test, TestingModule } from '@nestjs/testing';
import { ServiceFishinggramController } from './service-fishinggram.controller';
import { ServiceFishinggramService } from './service-fishinggram.service';

describe('ServiceFishinggramController', () => {
  let serviceFishinggramController: ServiceFishinggramController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceFishinggramController],
      providers: [ServiceFishinggramService],
    }).compile();

    serviceFishinggramController = app.get<ServiceFishinggramController>(ServiceFishinggramController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceFishinggramController.getHello()).toBe('Hello World!');
    });
  });
});
