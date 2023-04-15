import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModel } from '../../../../libs/database/src';
import { CreateUserDto } from '../dto/create.user.dto';
import { ServiceUserRepository } from '../repository/service-user.repository';
import { CommonUserValidator } from './common.user.validator';
import { CreateUserValidator } from './create.user.validator';

jest.setTimeout(20 * 60 * 1000);
describe('CreateUserValidator', () => {
  let createUserValidator: CreateUserValidator;
  let repository: ServiceUserRepository;
  const repositoryTemp: Partial<UserModel>[] = [
    {
      uid: 'uid',
      nickName: 'nickName',
      email: 'email',
    },
  ];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CreateUserValidator, CommonUserValidator],
    })
      .useMocker(createMock)
      .compile();

    createUserValidator = app.get<CreateUserValidator>(CreateUserValidator);
    repository = app.get<ServiceUserRepository>(ServiceUserRepository);

    repository.findOneByUid = jest.fn().mockImplementation((uid: string) => {
      return repositoryTemp.find((item) => item.uid === uid);
    });

    repository.findOneByEmail = jest
      .fn()
      .mockImplementation((email: string) => {
        return repositoryTemp.find((item) => item.email === email);
      });

    repository.findOneByNickName = jest
      .fn()
      .mockImplementation((nickName: string) => {
        return repositoryTemp.find((item) => item.nickName === nickName);
      });
  });

  afterEach(async () => {
    // 각각의 테스트마다 mock 함수를 초기화 합니다.
    jest.restoreAllMocks();
  });

  describe('사용자 등록', () => {
    it('uid 중복 검사', async () => {
      const dto = new CreateUserDto();
      dto.uid = 'uid';
      dto.nickName = 'test';
      dto.password = 'test';

      const result = async () => {
        await createUserValidator.validate(dto);
      };

      await expect(result).rejects.toThrowError(
        `uid: ${dto.uid} is already exist`,
      );
    });

    it('닉네임 중복 검사', async () => {
      const dto = new CreateUserDto();
      dto.uid = 'test';
      dto.nickName = 'nickName';
      dto.password = 'test';

      const result = async () => {
        await createUserValidator.validate(dto);
      };

      await expect(result).rejects.toThrowError(
        `nickName: ${dto.nickName} is already exist`,
      );
    });

    it('이메일 중복 검사', async () => {
      const dto = new CreateUserDto();
      dto.uid = 'test';
      dto.nickName = 'test';
      dto.email = 'email';

      const result = async () => {
        await createUserValidator.validate(dto);
      };

      await expect(result).rejects.toThrowError(
        `email: ${dto.email} is already exist`,
      );
    });
  });
});
