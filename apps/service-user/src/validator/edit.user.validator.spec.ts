import { createMock } from '@golevelup/ts-jest';
import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UsinDatabaseService } from '../../../../libs/database/src';
import { EditUserDto } from '../dto/edit.user.dto';
import { CommonUserValidator } from './common.user.validator';
import { EditUserValidator } from './edit.user.validator';

jest.setTimeout(20 * 60 * 1000);
describe('EditUserValidator', () => {
  let editUserValidator: EditUserValidator;
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
      providers: [EditUserValidator],
    })
      .useMocker(createMock)
      .compile();

    editUserValidator = app.get<EditUserValidator>(EditUserValidator);
  });

  afterEach(async () => {
    // 각각의 테스트마다 mock 함수를 초기화 합니다.
    jest.restoreAllMocks();
  });

  describe('사용자 수정', () => {
    it('닉네임 중복 검사', async () => {
      const dto = new EditUserDto();
      dto.uid = 'test';
      dto.nickName = 'test';
      dto.password = 'test';

      jest
        .spyOn(
          (editUserValidator as any).commonUserValidator,
          'validateNickName',
        )
        .mockRejectedValueOnce(
          new BadRequestException(`nickName: ${dto.nickName} is already exist`),
        );

      const result = async () => {
        await editUserValidator.validate(dto);
      };

      await expect(result).rejects.toThrowError(
        `nickName: ${dto.nickName} is already exist`,
      );
    });

    it('이메일 중복 검사', async () => {
      const dto = new EditUserDto();
      dto.uid = 'test';
      dto.nickName = 'test';
      dto.password = 'test';
      dto.email = 'test';
      jest
        .spyOn((editUserValidator as any).commonUserValidator, 'validateEmail')
        .mockRejectedValueOnce(
          new BadRequestException(`email: ${dto.email} is already exist`),
        );

      const result = async () => {
        await editUserValidator.validate(dto);
      };

      await expect(result).rejects.toThrowError(
        `email: ${dto.email} is already exist`,
      );
    });
  });
});
