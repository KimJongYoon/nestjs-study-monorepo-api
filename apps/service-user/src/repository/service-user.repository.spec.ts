import { createMock } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { UsinDatabaseService } from '../../../../libs/database/src';
import { ServiceUserRepository } from './service-user.repository';

describe('ServiceUserRepository', () => {
  let serviceUserRepository: ServiceUserRepository;
  let mockedUsinDatabaseService: UsinDatabaseService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [ServiceUserRepository],
    })
      .useMocker(createMock)
      .compile();
    serviceUserRepository = moduleRef.get<ServiceUserRepository>(
      ServiceUserRepository,
    );
    mockedUsinDatabaseService =
      moduleRef.get<UsinDatabaseService>(UsinDatabaseService);
  });

  describe('findAllUsin', () => {
    it('should return array of users and count of users', async () => {
      // Arrange
      const expectedData = [
        { id: 1, name: 'user1' },
        { id: 2, name: 'user2' },
      ];

      const expectedCount = 2;
      mockedUsinDatabaseService.viewUsinUser.findMany = jest
        .fn()
        .mockResolvedValueOnce(expectedData);
      mockedUsinDatabaseService.viewUsinUser.count = jest
        .fn()
        .mockResolvedValueOnce(expectedCount);

      // Act
      const result = await serviceUserRepository.findAllUsin();

      // Assert
      expect(
        mockedUsinDatabaseService.viewUsinUser.findMany,
      ).toHaveBeenCalled();
      expect(mockedUsinDatabaseService.viewUsinUser.count).toHaveBeenCalled();
      expect(result).toEqual([expectedData, expectedCount]);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      // Arrange
      const expectedData = {
        uid: 'kakao:12345',
        nickName: 'newUser',
        email: 'kakao123',
        password: '12345!a',
        createdBy: 'kakao:12345',
        updatedBy: 'kakao:12345',
      };
      mockedUsinDatabaseService.user.create = jest
        .fn()
        .mockResolvedValueOnce(expectedData);

      // Act
      const result = await serviceUserRepository.create(expectedData);

      // Assert
      expect(mockedUsinDatabaseService.user.create).toHaveBeenCalled();
      expect(result).toEqual(expectedData);
    });
  });
});
