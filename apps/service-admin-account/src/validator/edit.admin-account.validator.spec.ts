import { createMock } from '@golevelup/ts-jest';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminAccount } from '../../../../libs/database/src/usin/generated/client';
import { EditAdminAccountDto } from '../dto/edit.admin-account.dto';
import { ServiceAdminAccountRepository } from '../repository/service-admin-account.repository';
import { CommonAdminAccountValidator } from './common.admin-account.validator';
import { EditAdminAccountValidator } from './edit.admin-account.validator';

describe('EditAdminAccountValidator', () => {
  let editAdminAccountValidator: EditAdminAccountValidator;
  let repository: ServiceAdminAccountRepository;
  const repositoryTemp: Partial<AdminAccount>[] = [];

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [EditAdminAccountValidator, CommonAdminAccountValidator],
    })
      .useMocker(createMock)
      .compile();

    repository = app.get<ServiceAdminAccountRepository>(
      ServiceAdminAccountRepository,
    );

    editAdminAccountValidator = app.get<EditAdminAccountValidator>(
      EditAdminAccountValidator,
    );

    repositoryTemp.push({
      email: 'email',
      nickName: 'nickName',
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

  describe('관리자 계정 등록', () => {
    it('닉네임 중복 검사', async () => {
      const dto = new EditAdminAccountDto();
      dto.nickName = 'nickName';

      const result = async () => {
        await editAdminAccountValidator.validate(dto);
      };

      await expect(result).rejects.toThrowError(
        new BadRequestException(`nickName: ${dto.nickName} is already exist`),
      );
      expect(repository.findOneByNickName).toBeCalledWith(dto.nickName);
    });

    it('닉네임 중복 검사(자기 자신의 닉네임과 같은 경우)', async () => {
      const dto = new EditAdminAccountDto();
      dto.email = 'email';
      dto.nickName = 'nickName';

      const result = async () => {
        await editAdminAccountValidator.validate(dto);
      };

      await expect(result()).resolves.toBeUndefined();
      expect(repository.findOneByNickName).toBeCalledWith(dto.nickName);
    });
  });
});
