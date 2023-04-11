import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../../../libs/database/src/usin/generated/client';
import { CreateUserDto } from './dto/create.user.dto';
import { EditUserDto } from './dto/edit.user.dto';
import { ServiceUserRepository } from './repository/service-user.repository';
import { ServiceUserService } from './service-user.service';
import { CommonUserValidator } from './validator/common.user.validator';
import { CreateUserValidator } from './validator/create.user.validator';
import { EditUserValidator } from './validator/edit.user.validator';

jest.setTimeout(20 * 60 * 1000);
describe('ServiceUserService', () => {
  let userService: ServiceUserService;
  let userRepository: ServiceUserRepository;
  let createUserValidator: CreateUserValidator;
  let editUserValidator: EditUserValidator;
  let repositoryTemp = [];

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceUserService,
        CreateUserValidator,
        EditUserValidator,
        CommonUserValidator,
      ],
    })
      .useMocker(createMock)
      .compile();

    userService = app.get<ServiceUserService>(ServiceUserService);
    userRepository = app.get<ServiceUserRepository>(ServiceUserRepository);
    createUserValidator = app.get<CreateUserValidator>(CreateUserValidator);
    editUserValidator = app.get<EditUserValidator>(EditUserValidator);

    userRepository.create = jest.fn().mockImplementation((entity: User) => {
      repositoryTemp.push(entity);
      return entity;
    });

    userRepository.findOneByUid = jest
      .fn()
      .mockImplementation((uid: string) => {
        return repositoryTemp.find((item) => item.uid === uid);
      });

    userRepository.edit = jest.fn().mockImplementation((entity: User) => {
      repositoryTemp = repositoryTemp.map((item) => {
        if (item.uid === entity.uid) {
          return entity;
        }
      });
      return entity;
    });
  });

  describe('사용자 등록', () => {
    it('등록 테스트', async () => {
      const dto = new CreateUserDto();
      dto.uid = 'kakao:123456789';
      dto.nickName = '테스트';
      dto.password = '123445a!';
      dto.email = 'mion@sgma.io';

      const data = await userService.create(dto);

      expect(data).toEqual(repositoryTemp[0]);
    });

    it('수정 테스트', async () => {
      const dto = new EditUserDto();
      dto.uid = 'kakao:123456789';
      dto.nickName = '테스트';
      dto.password = '123445a!';
      dto.email = 'mion@sgma.i!!!o';

      const data = await userService.edit(dto);

      expect(data).toEqual(repositoryTemp[0]);
    });
  });
});
