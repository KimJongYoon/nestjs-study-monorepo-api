import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptHelper } from '../../../libs/core/src';
import {
  AdminAccount,
  Prisma,
} from '../../../libs/database/src/usin/generated/client';
import { CreateAdminAccountDto } from './dto/create.admin-account.dto';
import { EditAdminAccountDto } from './dto/edit.admin-account.dto';
import { FindOneAdminAccountDto } from './dto/find-one.admin-account.dto';
import { ServiceAdminAccountRepository } from './repository/service-admin-account.repository';
import { ServiceAdminAccountService } from './service-admin-account.service';

jest.setTimeout(20 * 60 * 1000);
describe('ServiceAdminAccountService', () => {
  let adminAccountService: ServiceAdminAccountService;
  let serviceAdminAccountRepository: ServiceAdminAccountRepository;

  let repositoryTemp: Partial<AdminAccount>[] = [];

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

    serviceAdminAccountRepository.create = jest
      .fn()
      .mockImplementation((entity: Prisma.AdminAccountCreateInput) => {
        repositoryTemp.push(entity as AdminAccount);
        return entity;
      });

    serviceAdminAccountRepository.edit = jest
      .fn()
      .mockImplementation(
        (entity: Prisma.AdminAccountUpdateInput, email: string) => {
          repositoryTemp = repositoryTemp.map((item) => {
            if (item.email === email) {
              item = { ...entity, email } as AdminAccount;
            }
            return item as AdminAccount;
          });
          return { ...entity, email };
        },
      );
  });

  describe('사용자 상세 조회', () => {
    it('상세 조회 테스트', async () => {
      const dto = new FindOneAdminAccountDto();
      dto.email = 'mion@gmail.com';

      const data = await adminAccountService.findOne(dto);

      expect(data).toEqual(repositoryTemp[0]);
    });
  });
  describe('등록', () => {
    it('등록 테스트', async () => {
      const dto = new CreateAdminAccountDto();
      dto.email = 'mion2@gmail.com';
      dto.nickName = 'create-mion';
      dto.password = 'password';

      const data = await adminAccountService.create(dto);

      expect(data).toEqual(repositoryTemp[repositoryTemp.length - 1]);
      expect(
        BcryptHelper.compare(dto.password, data.password),
      ).resolves.toEqual(true);
    });
  });

  describe('수정', () => {
    it('수정 테스트', async () => {
      const dto = new EditAdminAccountDto();
      dto.email = 'mion2@gmail.com';
      dto.nickName = 'edit-mion';
      dto.password = 'password';

      const data = await adminAccountService.edit(dto);

      expect(data).toEqual(repositoryTemp[repositoryTemp.length - 1]);
      expect(
        BcryptHelper.compare(dto.password, data.password),
      ).resolves.toEqual(true);
    });
  });
});
