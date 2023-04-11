import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  BcryptHelper,
  EntityBuilder,
  EntityValidator,
} from '../../../../libs/core/src';
import { Prisma } from '../../../../libs/database/src/usin/generated/client';
import { UserModel } from '../../../../libs/database/src/usin/models/user/user.model';

export class EditUserDto
  extends PickType(PartialType(UserModel), ['nickName', 'password', 'email'])
  implements EntityBuilder<Prisma.UserUpdateInput>
{
  @ApiProperty({
    example: 'kakao:123456',
    description: '사용자 아이디',
  })
  @IsString()
  uid: string;

  async build(): Promise<Prisma.UserUpdateInput> {
    const response: Prisma.UserUpdateInput = { ...this, updatedBy: this.uid };

    if (this.password) {
      response.password = await BcryptHelper.hash(this.password);
    }

    return response;
  }
  async validate(validator: EntityValidator<any>): Promise<this> {
    await validator.validate(this);
    return this;
  }
}
