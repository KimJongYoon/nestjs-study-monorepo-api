import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { UserModel } from '../../../../libs/database/src';
import { EditUserDto } from '../dto/edit.user.dto';
import { ServiceUserRepository } from '../repository/service-user.repository';
import { CommonUserValidator } from './common.user.validator';
import { EditUserValidator } from './edit.user.validator';

jest.setTimeout(20 * 60 * 1000);
describe('EditUserValidator', () => {
  let editUserValidator: EditUserValidator;
  let repository: ServiceUserRepository;
  const repositoryTemp: Partial<UserModel>[] = [
    {
      uid: 'uid',
      nickName: 'nickName',
      email: 'email',
    },
  ];

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [EditUserValidator, CommonUserValidator],
    })
      .useMocker(createMock)
      .compile();

    editUserValidator = app.get<EditUserValidator>(EditUserValidator);

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
    // jest.restoreAllMocks();
  });

  describe('사용자 수정', () => {
    it('닉네임 중복 검사', async () => {
      const dto = new EditUserDto();
      dto.uid = 'test';
      dto.nickName = 'nickName';
      dto.password = 'test';

      const result = async () => {
        await editUserValidator.validate(dto);
      };

      await expect(result).rejects.toThrowError(
        `nickName: ${dto.nickName} is already exist`,
      );
    });

    it('닉네임 중복 검사(자기 자신의 닉네임과 같은 경우)', async () => {
      const dto = new EditUserDto();
      dto.uid = 'uid';
      dto.nickName = 'nickName';
      dto.password = 'test';

      const result = async () => {
        await editUserValidator.validate(dto);
      };

      await expect(result()).resolves.toBeUndefined();
    });

    it('이메일 중복 검사', async () => {
      const dto = new EditUserDto();
      dto.uid = 'test';
      dto.nickName = 'test';
      dto.email = 'email';

      const result = async () => {
        await editUserValidator.validate(dto);
      };

      await expect(result).rejects.toThrowError(
        `email: ${dto.email} is already exist`,
      );
    });

    it('이메일 중복 검사(자기 자신의 이메일과 같은 경우)', async () => {
      const dto = new EditUserDto();
      dto.uid = 'uid';
      dto.nickName = 'test';
      dto.email = 'email';

      const result = async () => {
        await editUserValidator.validate(dto);
      };

      await expect(result()).resolves.toBeUndefined();
    });
  });
});
