import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptHelper } from '../../../libs/core/src';
import { UserModel } from '../../../libs/database/src';
import { User } from '../../../libs/database/src/usin/generated/client';
import { CreateUserDto } from './dto/create.user.dto';
import { EditUserDto } from './dto/edit.user.dto';
import { ServiceUserRepository } from './repository/service-user.repository';
import { ServiceUserService } from './service-user.service';
import { CreateUserValidator } from './validator/create.user.validator';
import { EditUserValidator } from './validator/edit.user.validator';

jest.setTimeout(20 * 60 * 1000);
describe('ServiceUserService', () => {
  let userService: ServiceUserService;
  let userRepository: ServiceUserRepository;
  let createUserValidator: CreateUserValidator;
  let editUserValidator: EditUserValidator;
  let repositoryTemp = [];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceUserService,
        // CreateUserValidator,
        // EditUserValidator,
        // CommonUserValidator,
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

    userRepository.findOneByNickName = jest
      .fn()
      .mockImplementation((nickName: string) => {
        return repositoryTemp.find((item) => item.nickName === nickName);
      });

    userRepository.findOneByEmail = jest
      .fn()
      .mockImplementation((email: string) => {
        return repositoryTemp.find((item) => item.email === email);
      });

    userRepository.edit = jest
      .fn()
      .mockImplementation((entity: User, uid: string) => {
        repositoryTemp = repositoryTemp.map((item) => {
          if (item.uid === uid) {
            item = Object.assign(item, { ...entity, uid });
          }
          return item;
        });
        const data = repositoryTemp.find((item) => item.uid === uid);
        return data;
      });
  });

  afterEach(async () => {
    // 각각의 테스트마다 mock 함수를 초기화 합니다.
    jest.clearAllMocks();
  });

  describe('사용자 등록', () => {
    it('등록 테스트', async () => {
      const dto = new CreateUserDto();
      dto.uid = 'kakao:123456789';
      dto.nickName = '테스트';
      dto.password = '123445a!';
      dto.email = 'mion@sgma.io';

      const spyDto = jest.spyOn(dto, 'validate');

      await userService.create(dto);
      const toBe = await userRepository.findOneByUid(dto.uid);

      const compareData = new UserModel();
      Object.assign(compareData, toBe);

      compareData.uid = dto.uid;
      compareData.nickName = dto.nickName;
      compareData.email = dto.email;

      expect(spyDto).toBeCalledWith(createUserValidator);
      expect(userRepository.create).toBeCalled();
      expect(compareData).toEqual(toBe);
      expect(
        BcryptHelper.compare(dto.password, toBe.password),
      ).resolves.toEqual(true);
    });

    it('수정 테스트', async () => {
      const dto = new EditUserDto();
      dto.uid = 'kakao:123456789';
      dto.nickName = '테스트';
      dto.password = '123445a!';
      dto.email = 'mion@sgma.i!!!o';

      const spyDto = jest.spyOn(dto, 'validate');

      const asIs = await userRepository.findOneByUid(dto.uid);
      await userService.edit(dto);
      const toBe = await userRepository.findOneByUid(dto.uid);

      const compareData = new UserModel();
      Object.assign(compareData, asIs);

      compareData.uid = dto.uid;
      compareData.nickName = dto.nickName;
      compareData.email = dto.email;

      expect(spyDto).toBeCalledWith(editUserValidator);
      expect(userRepository.edit).toBeCalled();
      expect(compareData).toEqual(toBe);
      expect(
        BcryptHelper.compare(dto.password, toBe.password),
      ).resolves.toEqual(true);
    });
  });
});
