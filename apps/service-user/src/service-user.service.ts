import { Injectable } from '@nestjs/common';
import {
  User,
  ViewUsinUser,
} from '../../../libs/database/src/usin/generated/client';
import { CreateUserDto } from './dto/create.user.dto';
import { UserServiceException } from './exception/user.service-exception';
import { ServiceUserRepository } from './service-user.repository';
import { CreateUserValidator } from './validator/create.user.validator';

@Injectable()
export class ServiceUserService {
  constructor(
    private readonly serviceUserRepository: ServiceUserRepository,
    private readonly createUserValidator: CreateUserValidator,
  ) {}

  /**
   * 사용자 정보 상세 조회
   * @param uid
   * @returns
   */
  async findOne(uid: string): Promise<Partial<ViewUsinUser>> {
    try {
      const data = await this.serviceUserRepository.findOneByUid(uid);
      return data;
    } catch (error) {
      UserServiceException.findOne(error);
    }
  }

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
