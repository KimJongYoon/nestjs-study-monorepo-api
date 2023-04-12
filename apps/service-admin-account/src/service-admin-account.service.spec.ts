import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminAccount } from '../../../libs/database/src/usin/generated/client';
import { FindOneAdminAccountDto } from './dto/find-one.admin-account.dto';
import { ServiceAdminAccountRepository } from './repository/service-admin-account.repository';
import { ServiceAdminAccountService } from './service-admin-account.service';

jest.setTimeout(20 * 60 * 1000);
describe('ServiceAdminAccountService', () => {
  let adminAccountService: ServiceAdminAccountService;
  let serviceAdminAccountRepository: ServiceAdminAccountRepository;

  const repositoryTemp: Partial<AdminAccount>[] = [];

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ServiceAdminAccountService],
    })
      .useMocker(createMock)
      .compile();

    adminAccountService = app.get<ServiceAdminAccountService>(
      ServiceAdminAccountService,
    );

    serviceAdminAccountRepository = app.get<ServiceAdminAccountRepository>(
      ServiceAdminAccountRepository,
    );

    repositoryTemp.push({
      email: 'mion@gmail.com',
      nickName: 'mion',
      remark: 'remark',
    });

    serviceAdminAccountRepository.findOneByEmail = jest
      .fn()
      .mockImplementation((email: string) => {
        return repositoryTemp.find((item) => item.email === email);
      });
  });

  describe('사용자 상세 조회', () => {
    it('상세 조회 테스트', async () => {
      const dto = new FindOneAdminAccountDto();
      dto.email = 'mion@gmail.com';

      const data = await adminAccountService.findOne(dto);

      expect(data).toEqual(repositoryTemp[0]);
    });
  });
});
