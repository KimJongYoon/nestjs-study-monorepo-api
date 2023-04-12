import { Test, TestingModule } from '@nestjs/testing';
import { ServiceAdminAccountController } from './service-admin-account.controller';
import { ServiceAdminAccountService } from './service-admin-account.service';

describe('ServiceAdminAccountController', () => {
  let serviceAdminAccountController: ServiceAdminAccountController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ServiceAdminAccountController],
      providers: [ServiceAdminAccountService],
    }).compile();

    serviceAdminAccountController = app.get<ServiceAdminAccountController>(ServiceAdminAccountController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(serviceAdminAccountController.getHello()).toBe('Hello World!');
    });
  });
});
