import { Injectable } from '@nestjs/common';
import { CreateAdminAccountDto } from './dto/create.admin-account.dto';
import { EditAdminAccountDto } from './dto/edit.admin-account.dto';
import { FindOneAdminAccountDto } from './dto/find-one.admin-account.dto';
import { AdminAccountServiceException } from './exception/admin-account.service-exception';
import { ServiceAdminAccountRepository } from './repository/service-admin-account.repository';
import { CreateAdminAccountValidator } from './validator/create.admin-account.validator';
import { EditAdminAccountValidator } from './validator/edit.admin-account.validator';

@Injectable()
export class ServiceAdminAccountService {
  constructor(
    // repository
    private readonly serviceAdminAccountRepository: ServiceAdminAccountRepository,

    // validator
    private readonly createAdminAccountValidator: CreateAdminAccountValidator,
    private readonly editAdminAccountValidator: EditAdminAccountValidator,
  ) {}

  /**
   * 관리자 계정 정보 상세 조회
   * @param dto
   */
  async findOne(dto: FindOneAdminAccountDto) {
    try {
      const data = await this.serviceAdminAccountRepository.findOneByEmail(
        dto.email,
      );

      return data;
    } catch (error) {
      AdminAccountServiceException.findOne(error);
    }
  }

  /**
   * 관리자 계정 정보 등록
   * @param dto
   */
  async create(dto: CreateAdminAccountDto) {
    try {
      await dto.validate(this.createAdminAccountValidator);

      const entity = await dto.build();

      const savedData = await this.serviceAdminAccountRepository.create(entity);

      return savedData;
    } catch (error) {
      AdminAccountServiceException.create(error);
    }
  }

  /**
   * 관리자 계정 정보 수정
   * @param dto
   */
  async edit(dto: EditAdminAccountDto) {
    try {
      await dto.validate(this.editAdminAccountValidator);

      const entity = await dto.build();

      const savedData = await this.serviceAdminAccountRepository.edit(
        entity,
        dto.email,
      );

      return savedData;
    } catch (error) {
      AdminAccountServiceException.edit(error);
    }
  }
}
