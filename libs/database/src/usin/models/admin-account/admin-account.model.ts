import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';
import { CommonEntity } from '../../../../../core/src';
import { AdminAccount } from '../../generated/client';

export class AdminAccountModel extends CommonEntity implements AdminAccount {
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

  @ApiProperty({
    example: 'abc123456!',
    description: '비밀번호',
  })
  @Matches(/^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
    message:
      '비밀번호는 최소 8자리 이상 숫자, 특수문자가 각각 1개 이상 조합으로 입력하여 주십시요.',
  })
  password: string;
}
