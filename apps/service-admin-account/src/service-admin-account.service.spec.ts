import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { BcryptHelper } from '../../../libs/core/src';
import { AdminAccountModel } from '../../../libs/database/src';
import {
  AdminAccount,
  Prisma,
} from '../../../libs/database/src/usin/generated/client';
import { CreateAdminAccountDto } from './dto/create.admin-account.dto';
import { EditAdminAccountDto } from './dto/edit.admin-account.dto';
import { FindOneAdminAccountDto } from './dto/find-one.admin-account.dto';
import { ServiceAdminAccountRepository } from './repository/service-admin-account.repository';
import { ServiceAdminAccountService } from './service-admin-account.service';
import { CreateAdminAccountValidator } from './validator/create.admin-account.validator';
import { EditAdminAccountValidator } from './validator/edit.admin-account.validator';

jest.setTimeout(20 * 60 * 1000);
describe('ServiceAdminAccountService', () => {
  let adminAccountService: ServiceAdminAccountService;
  let adminAccountRepository: ServiceAdminAccountRepository;

  let createAdminAccountValidator: CreateAdminAccountValidator;
  let editAdminAccountValidator: EditAdminAccountValidator;

  const repositoryTemp: Partial<AdminAccount>[] = [];

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ServiceAdminAccountService, ServiceAdminAccountRepository],
    })
      .useMocker(createMock)
      .compile();

    adminAccountService = app.get<ServiceAdminAccountService>(
      ServiceAdminAccountService,
    );

    adminAccountRepository = app.get<ServiceAdminAccountRepository>(
      ServiceAdminAccountRepository,
    );

    createAdminAccountValidator = app.get<CreateAdminAccountValidator>(
      CreateAdminAccountValidator,
    );

    editAdminAccountValidator = app.get<EditAdminAccountValidator>(
      EditAdminAccountValidator,
    );

    repositoryTemp.push({
      email: 'mion@gmail.com',
      nickName: 'mion',
      remark: 'remark',
    });

    adminAccountRepository.findOneByEmail = jest
      .fn()
      .mockImplementation((email: string) => {
        return repositoryTemp.find((item) => item.email === email);
      });

    adminAccountRepository.create = jest
      .fn()
      .mockImplementation((entity: Prisma.AdminAccountCreateInput) => {
        delete (entity as any).validate;
        entity.createdAt = new Date();
        entity.createdBy = entity.email;
        repositoryTemp.push(entity as AdminAccount);
        return entity;
      });

    adminAccountRepository.edit = jest
      .fn()
      .mockImplementation(
        (entity: Prisma.AdminAccountUncheckedUpdateInput, email: string) => {
          delete (entity as any).validate;

          const index = repositoryTemp.findIndex(
            (item) => item.email === email,
          );

          repositoryTemp[index] = {
            ...repositoryTemp[index],
            ...entity,
          } as any;

          return repositoryTemp[index];
        },
      );
  });

  afterEach(() => {
    jest.restoreAllMocks();
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

      const spyDto = jest.spyOn(dto, 'validate');

      await adminAccountService.create(dto);
      const toBe = await adminAccountRepository.findOneByEmail(dto.email);

      const compareData = new AdminAccountModel();
      Object.assign(compareData, toBe);

      compareData.email = dto.email;
      compareData.nickName = dto.nickName;

      expect(spyDto).toBeCalledWith(createAdminAccountValidator);
      expect(adminAccountRepository.create).toBeCalled();
      expect(compareData).toEqual(toBe);
      expect(
        BcryptHelper.compare(dto.password, toBe.password),
      ).resolves.toEqual(true);
    });
  });

  describe('수정', () => {
    it('수정 테스트', async () => {
      const dto = new EditAdminAccountDto();
      dto.email = 'mion2@gmail.com';
      dto.nickName = 'edit-mion';
      dto.password = 'password';

      const spyDto = jest.spyOn(dto, 'validate');

      const asIs = await adminAccountRepository.findOneByEmail(dto.email);
      await adminAccountService.edit(dto);
      const toBe = await adminAccountRepository.findOneByEmail(dto.email);

      const compareData = new AdminAccountModel();
      Object.assign(compareData, asIs);

      compareData.email = dto.email;
      compareData.nickName = dto.nickName;
      compareData.password = toBe.password;

      expect(spyDto).toBeCalledWith(editAdminAccountValidator);
      expect(adminAccountRepository.edit).toBeCalled();
      expect(compareData).toEqual(toBe);
      expect(
        BcryptHelper.compare(dto.password, toBe.password),
      ).resolves.toEqual(true);
    });
  });
});
