import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CommonEntity } from '../../../../../core/src';
import { ViewAdminAccount } from '../../generated/client';

export class ViewAdminAccountModel
  extends PickType(CommonEntity, ['createdAt', 'createdBy', 'remark'])
  implements ViewAdminAccount
{
  @ApiProperty({
    example: 'mion@gmail.com',
    description: '관리자 이메일',
  })
  @IsString()
  email: string;

  @ApiProperty({
    example: '관리자-미온',
    description: '닉네임',
  })
  @IsString()
  nickName: string;
}
