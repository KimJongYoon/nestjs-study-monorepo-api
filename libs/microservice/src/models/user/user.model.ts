import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { CommonEntity } from '../../../../core/src';
import { User } from '../../../../database/src';

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
  @IsString()
  password: string;

  @ApiProperty({
    example: '미온',
    description: '닉네임',
  })
  @IsString()
  nickName: string;
}
