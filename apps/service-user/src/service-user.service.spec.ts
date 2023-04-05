import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../../libs/database/src/usin/generated/client';
import { CreateUserDto } from './dto/create.user.dto';
import { ServiceUserRepository } from './service-user.repository';
import { ServiceUserService } from './service-user.service';
import { CreateUserValidator } from './validator/create.user.validator';

jest.setTimeout(20 * 60 * 1000);
describe('ServiceUserService', () => {
  let userService: ServiceUserService;
  let userRepository: ServiceUserRepository;
  let createUserValidator: CreateUserValidator;
  const repositoryTemp = [];

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ServiceUserService],
    })
      .useMocker(createMock)
      .compile();

    userService = app.get<ServiceUserService>(ServiceUserService);
    userRepository = app.get<ServiceUserRepository>(ServiceUserRepository);
    createUserValidator = app.get<CreateUserValidator>(CreateUserValidator);

    userRepository.create = jest.fn().mockImplementation((entity: User) => {
      repositoryTemp.push(entity);
      return entity;
    });
  });

  describe('사용자 등록', () => {
    it('등록테스트', async () => {
      const dto = new CreateUserDto();
      dto.uid = 'kakao:123456789';
      dto.nickName = '테스트';
      dto.password = '123445a!';
      dto.email = 'mion@sgma.io';

      const data = await userService.create(dto);

      expect(createUserValidator.validate).toHaveBeenCalled();
      expect(data).toEqual(repositoryTemp[0]);
    });
  });
});
