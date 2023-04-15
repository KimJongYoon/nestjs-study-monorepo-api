import { createMock } from '@golevelup/ts-jest';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminAccount } from '../../../../libs/database/src/usin/generated/client';
import { CreateAdminAccountDto } from '../dto/create.admin-account.dto';
import { ServiceAdminAccountRepository } from '../repository/service-admin-account.repository';
import { CommonAdminAccountValidator } from './common.admin-account.validator';
import { CreateAdminAccountValidator } from './create.admin-account.validator';

describe('CreateAdminAccountValidator', () => {
  let createAdminAccountValidator: CreateAdminAccountValidator;
  let repository: ServiceAdminAccountRepository;
  const repositoryTemp: Partial<AdminAccount>[] = [];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CreateAdminAccountValidator, CommonAdminAccountValidator],
    })
      .useMocker(createMock)
      .compile();

    repository = app.get<ServiceAdminAccountRepository>(
      ServiceAdminAccountRepository,
    );

    createAdminAccountValidator = app.get<CreateAdminAccountValidator>(
      CreateAdminAccountValidator,
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('관리자 계정 등록', () => {
    it('이메일 중복 검사', async () => {
      const dto = new CreateAdminAccountDto();
      dto.email = 'email';

      const result = async () => {
        await createAdminAccountValidator.validate(dto);
      };

      await expect(result).rejects.toThrowError(
        new BadRequestException(`email: ${dto.email} is already exist`),
      );
      expect(repository.findOneByEmail).toBeCalledWith(dto.email);
    });
    it('닉네임 중복 검사', async () => {
      const dto = new CreateAdminAccountDto();
      dto.nickName = 'nickName';

      const result = async () => {
        await createAdminAccountValidator.validate(dto);
      };

      await expect(result).rejects.toThrowError(
        new BadRequestException(`nickName: ${dto.nickName} is already exist`),
      );
      expect(repository.findOneByNickName).toBeCalledWith(dto.nickName);
    });
  });
});
