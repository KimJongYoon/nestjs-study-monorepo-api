import { Injectable } from '@nestjs/common';
import { EntityValidator } from '../../../../libs/core/src';
import { UsinDatabaseService } from '../../../../libs/database/src';
import { CreateUserDto } from '../dto/create.user.dto';
import { UserValidatorException } from '../exceptions/user.validator-exception';

@Injectable()
export class CreateUserValidator implements EntityValidator<CreateUserDto> {
  constructor(private readonly usinDatabaseService: UsinDatabaseService) {}

  async validate(dto: CreateUserDto, optional?: object): Promise<void> {
    // uid 중복 검사
    await this.validateUid(dto);

    // nickName 중복 검사
    await this.validateNickName(dto);
  }

  /**
   * uid 중복 검사
   * @param dto
   */
  private async validateUid(dto: CreateUserDto) {
    const savedUserByUid = await this.usinDatabaseService.user.findFirst({
      where: { uid: dto.uid, deletedAt: null },
    });

    if (savedUserByUid) {
      UserValidatorException.validateUid(dto.uid);
    }
  }

  /**
   * 닉네임 중복 검사
   * @param dto
   */
  private async validateNickName(dto: CreateUserDto) {
    const savedUserByNickName = await this.usinDatabaseService.user.findFirst({
      where: { nickName: dto.nickName, deletedAt: null },
    });

    if (savedUserByNickName) {
      UserValidatorException.validateNickName(dto.nickName);
    }
  }
}
