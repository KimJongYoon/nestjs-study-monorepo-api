import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { UsinDatabaseService } from '../../../../libs/database/src';
import { CreateUserDto } from '../../../../libs/microservice/src/dto/create.user.dto';
import { CreateUserValidator } from './create.user.validator';

jest.setTimeout(20 * 60 * 1000);
describe('CreateUserValidator', () => {
  let createUserValidator: CreateUserValidator;
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
    usinDatabaseService = app.get<UsinDatabaseService>(UsinDatabaseService);
  });

  afterEach(async () => {
    // 각각의 테스트마다 mock 함수를 초기화 합니다.
    jest.restoreAllMocks();
  });

  describe('사용자 등록', () => {
    it('uid 중복 검사', async () => {
      usinDatabaseService.user.findFirst = jest
        .fn()
        .mockResolvedValue(repositoryTemp[0]);

      const dto = new CreateUserDto();
      dto.uid = 'test';
      dto.nickName = 'test';
      dto.password = 'test';

      const result = async () => {
        await createUserValidator.validate(dto);
      };

      await expect(result).rejects.toThrowError(
        `uid: ${dto.uid} is already exist`,
      );

      expect(usinDatabaseService.user.findFirst).toHaveBeenCalledWith({
        where: { uid: dto.uid, deletedAt: null },
      });
      expect(usinDatabaseService.user.findFirst).toHaveBeenCalled();
      expect(usinDatabaseService.user.findFirst()).resolves.toBe(
        repositoryTemp[0],
      );
    });

    it('닉네임 중복 검사', async () => {
      usinDatabaseService.user.findFirst = jest
        .fn()
        .mockResolvedValueOnce(undefined)
        .mockResolvedValue(repositoryTemp[0]);

      const dto = new CreateUserDto();
      dto.uid = 'test';
      dto.nickName = 'test';
      dto.password = 'test';

      const result = async () => {
        await createUserValidator.validate(dto);
      };

      await expect(result).rejects.toThrowError(
        `nickName: ${dto.nickName} is already exist`,
      );

      expect(usinDatabaseService.user.findFirst).toHaveBeenCalledWith({
        where: { uid: dto.uid, deletedAt: null },
      });
      expect(usinDatabaseService.user.findFirst).toHaveBeenCalledTimes(2);
      expect(usinDatabaseService.user.findFirst()).resolves.toBe(
        repositoryTemp[0],
      );
    });
  });
});
