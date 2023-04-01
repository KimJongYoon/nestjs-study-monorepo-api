import { Injectable } from '@nestjs/common';
import { User } from '../../../libs/database/src';
import { CreateUserDto } from './dto/create.user.dto';
import { UserServiceException } from './exceptions/user.service-exception';
import { ServiceUserRepository } from './service-user.repository';
import { CreateUserValidator } from './validators/create.user.validator';

@Injectable()
export class ServiceUserService {
  constructor(
    private readonly serviceUserRepository: ServiceUserRepository,
    private readonly createUserValidator: CreateUserValidator,
  ) {}

  /**
   * 사용자 등록
   * @param dto
   * @returns
   */
  async create(dto: CreateUserDto): Promise<User> {
    try {
      // 유효성 검증
      await dto.validate(this.createUserValidator);

      // 빌드
      const entity = await dto.build();

      // 저장
      const savedData = await this.serviceUserRepository.create(entity);

      return savedData;
    } catch (error) {
      UserServiceException.create(error);
    }
  }
}
