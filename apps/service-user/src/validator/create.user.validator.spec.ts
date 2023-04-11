import { createMock } from '@golevelup/ts-jest';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsinDatabaseService } from '../../../../libs/database/src';
import { CreateUserDto } from '../dto/create.user.dto';
import { CommonUserValidator } from './common.user.validator';
import { CreateUserValidator } from './create.user.validator';

jest.setTimeout(20 * 60 * 1000);
describe('CreateUserValidator', () => {
  let createUserValidator: CreateUserValidator;
  let commonUserValidator: CommonUserValidator;
  let usinDatabaseService: UsinDatabaseService;
  const repositoryTemp = [
    {
      uid: 'duplication',
      nickName: 'duplication',
    },
  ];

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [CreateUserValidator],
    })
      .useMocker(createMock)
      .compile();

    createUserValidator = app.get<CreateUserValidator>(CreateUserValidator);
  });

  afterEach(async () => {
    // 각각의 테스트마다 mock 함수를 초기화 합니다.
    jest.restoreAllMocks();
  });

  describe('사용자 등록', () => {
    it('uid 중복 검사', async () => {
      const dto = new CreateUserDto();
      dto.uid = 'test';
      dto.nickName = 'test';
      dto.password = 'test';

      jest
        .spyOn((createUserValidator as any).commonUserValidator, 'validateUid')
        .mockRejectedValueOnce(
          new BadRequestException(`uid: ${dto.uid} is already exist`),
        );

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
      dto.nickName = 'test';
      dto.password = 'test';

      jest
        .spyOn(
          (createUserValidator as any).commonUserValidator,
          'validateNickName',
        )
        .mockRejectedValueOnce(
          new BadRequestException(`nickName: ${dto.nickName} is already exist`),
        );

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
      dto.password = 'test';
      dto.email = 'test';
      jest
        .spyOn(
          (createUserValidator as any).commonUserValidator,
          'validateEmail',
        )
        .mockRejectedValueOnce(
          new BadRequestException(`email: ${dto.email} is already exist`),
        );

      const result = async () => {
        await createUserValidator.validate(dto);
      };

      await expect(result).rejects.toThrowError(
        `email: ${dto.email} is already exist`,
      );
    });
  });
});
