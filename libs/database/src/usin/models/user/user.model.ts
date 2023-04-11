import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';
import { CommonEntity } from '../../../../../core/src';
import { User } from '../../generated/client';

export class UserModel extends CommonEntity implements User {
  @ApiProperty({
    example: 'kakao:123456',
    description: '사용자 아이디',
  })
  @IsString()
  uid: string;

  @ApiProperty({
    example: 'mion@google.com',
    description: '이메일',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'abc123456!',
    description: '비밀번호',
  })
  @Matches(/^(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, {
    message:
      '비밀번호는 최소 8자리 이상 숫자, 특수문자가 각각 1개 이상 조합으로 입력하여 주십시요.',
  })
  password: string;

  @ApiProperty({
    example: '미온',
    description: '닉네임',
  })
  @IsString()
  nickName: string;
}
